import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-03-25.dahlia',
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { product, items } = body;

    let line_items = [];

    // Support legacy single product payload for safety or direct purchase
    if (product) {
      line_items = [
        {
          price_data: {
            currency: 'jpy',
            product_data: { name: product.name, images: product.image ? [product.image.url] : [], description: product.desc || 'YASHIRO Five Elements Item' },
            unit_amount: product.price,
          },
          quantity: 1,
        },
      ];
    } else if (items && items.length > 0) {
      // Support new cart items array
      line_items = items.map((item: any) => ({
        price_data: {
          currency: 'jpy',
          product_data: { 
            name: item.product.name, 
            images: item.product.image ? [item.product.image.url] : [], 
            description: item.product.desc || 'YASHIRO Element' 
          },
          unit_amount: item.product.price,
        },
        quantity: item.quantity,
      }));
    } else {
      return NextResponse.json({ error: 'Items or Product are required' }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      allow_promotion_codes: true,
      success_url: `${req.headers.get('origin')}/checkout/success`,
      cancel_url: `${req.headers.get('origin')}/`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error('Stripe error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
