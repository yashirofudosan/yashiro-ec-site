import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getProductDetail } from '@/lib/microcms';
import { getProductPrice, getProductImage, VariantSize } from '@/lib/pricing';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripe = stripeSecretKey
  ? new Stripe(stripeSecretKey, { apiVersion: '2026-03-25.dahlia' })
  : null;

interface RequestedLine {
  productId: string;
  variant?: VariantSize;
  quantity: number;
}

export async function POST(req: Request) {
  if (!stripe) {
    console.error('Stripe checkout error: STRIPE_SECRET_KEY is not configured');
    return NextResponse.json({ error: 'Checkout is not available right now' }, { status: 500 });
  }

  try {
    const body = await req.json();
    const { product, items } = body;

    let lines: RequestedLine[] = [];

    // Support legacy single-product payload
    if (product?.id) {
      lines = [{ productId: product.id, quantity: 1 }];
    } else if (Array.isArray(items) && items.length > 0) {
      lines = items
        .map((item: any) => ({
          productId: item?.product?.id,
          variant: item?.variant,
          quantity: Number(item?.quantity) > 0 ? Math.floor(Number(item.quantity)) : 1,
        }))
        .filter((line: RequestedLine) => !!line.productId);
    }

    if (lines.length === 0) {
      return NextResponse.json({ error: 'Items or Product are required' }, { status: 400 });
    }

    // Re-fetch each product from microCMS so price is always the server's
    // authoritative value — never trust a price sent by the client.
    const line_items = await Promise.all(
      lines.map(async (line) => {
        const product = await getProductDetail(line.productId);
        const unitAmount = getProductPrice(product, line.variant);
        const image = getProductImage(product, line.variant);

        if (!unitAmount || unitAmount <= 0) {
          throw new Error(`Product ${line.productId} has no valid price`);
        }

        return {
          price_data: {
            currency: 'jpy',
            product_data: {
              name: line.variant ? `${product.name}（${line.variant}）` : product.name,
              images: image?.url ? [image.url] : [],
              description: (product.desc || 'YASHIRO Five Elements Item').slice(0, 300),
              metadata: { productId: product.id },
            },
            unit_amount: unitAmount,
          },
          quantity: line.quantity,
        };
      })
    );

    const origin = req.headers.get('origin');
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      allow_promotion_codes: true,
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error('Stripe checkout error:', error);
    return NextResponse.json({ error: 'Failed to start checkout' }, { status: 500 });
  }
}
