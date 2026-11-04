import { NextRequest, NextResponse } from 'next/server';
import { getStripe, PRICES } from '@/lib/stripe';

interface CheckoutRequest {
  plan: 'lifetime' | 'lifetime_plus_monthly';
  email: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: CheckoutRequest = await request.json();
    const { plan, email } = body;

    if (!email) {
      return NextResponse.json({ success: false, error: 'Email is required' }, { status: 400 });
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

    // Build line items based on plan
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const lineItems: any[] = [
      {
        price: PRICES.lifetime,
        quantity: 1,
      },
    ];

    // If they want monthly updates too, add the subscription
    if (plan === 'lifetime_plus_monthly') {
      lineItems.push({
        price: PRICES.monthly,
        quantity: 1,
      });
    }

    const session = await getStripe().checkout.sessions.create({
      customer_email: email,
      line_items: lineItems,
      mode: plan === 'lifetime_plus_monthly' ? 'subscription' : 'payment',
      success_url: `${appUrl}/dashboard?checkout=success`,
      cancel_url: `${appUrl}/signup?plan=${plan}&checkout=cancelled`,
      metadata: {
        plan,
        email,
      },
      allow_promotion_codes: true,
    });

    return NextResponse.json({
      success: true,
      data: { url: session.url },
    });
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { success: false, error: (error as Error)?.message || 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
