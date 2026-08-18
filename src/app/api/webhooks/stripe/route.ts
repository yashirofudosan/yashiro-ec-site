import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { client } from '@/lib/microcms';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
const stripe = stripeSecretKey
  ? new Stripe(stripeSecretKey, { apiVersion: '2026-03-25.dahlia' })
  : null;

// Verifies and records Stripe checkout completions so an order's existence
// no longer depends on a customer's browser reaching /checkout/success.
//
// Setup required (not done by this code — microCMS schemas and Stripe
// dashboard config can't be created from the repo):
//   1. In microCMS, add a content type with API ID "orders" containing:
//      stripeSessionId (text), email (text), amountTotal (number),
//      currency (text), paymentStatus (text), itemsJson (text area)
//   2. Set STRIPE_WEBHOOK_SECRET in the environment (from the Stripe
//      Dashboard webhook config, or `stripe listen --print-secret` locally)
//   3. Register this endpoint's URL (.../api/webhooks/stripe) as a webhook
//      in the Stripe Dashboard, subscribed to "checkout.session.completed"
export async function POST(req: Request) {
  if (!stripe || !webhookSecret) {
    console.error('Stripe webhook error: STRIPE_SECRET_KEY or STRIPE_WEBHOOK_SECRET is not configured');
    return NextResponse.json({ error: 'Webhook is not configured' }, { status: 500 });
  }

  const signature = req.headers.get('stripe-signature');
  if (!signature) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
  }

  const rawBody = await req.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (err: any) {
    console.error('Stripe webhook signature verification failed:', err.message);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  if (event.type !== 'checkout.session.completed') {
    return NextResponse.json({ received: true });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  try {
    // Idempotency guard: Stripe may deliver the same event more than once.
    const existing = await client.getList({
      endpoint: 'orders',
      queries: { filters: `stripeSessionId[equals]${session.id}`, limit: 1 },
    });

    if (existing.contents.length > 0) {
      return NextResponse.json({ received: true, skipped: 'already recorded' });
    }

    const lineItems = await stripe.checkout.sessions.listLineItems(session.id, { limit: 100 });

    await client.create({
      endpoint: 'orders',
      content: {
        stripeSessionId: session.id,
        email: session.customer_details?.email || '',
        amountTotal: session.amount_total ?? 0,
        currency: session.currency ?? 'jpy',
        paymentStatus: session.payment_status,
        itemsJson: JSON.stringify(
          lineItems.data.map((li) => ({
            name: li.description,
            quantity: li.quantity,
            amount: li.amount_total,
          }))
        ),
      },
    });
  } catch (err) {
    console.error('Failed to record order from Stripe webhook:', err);
    // 500 so Stripe retries delivery; the filter-based check above keeps
    // a later retry from creating a duplicate order.
    return NextResponse.json({ error: 'Failed to record order' }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
