import { NextRequest, NextResponse } from 'next/server';
import { getStripe } from '@/lib/stripe';
import { createClient } from '@supabase/supabase-js';

function getSupabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

export async function POST(request: NextRequest) {
  const body = await request.text();
  const sig = request.headers.get('stripe-signature')!;

  let event;
  try {
    event = getStripe().webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err) {
    console.error('Webhook signature verification failed:', (err as Error).message);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const session = event.data.object as any;
      const email = session.customer_email || session.metadata?.email;
      const plan = session.metadata?.plan || 'lifetime';

      if (email) {
        // Find user by email
        const { data: users } = await getSupabaseAdmin().auth.admin.listUsers();
        const user = users?.users?.find((u) => u.email === email);

        if (user) {
          // Update user profile with subscription info
          await getSupabaseAdmin().from('toolkit_users').upsert({
            user_id: user.id,
            email,
            plan,
            stripe_customer_id: session.customer,
            stripe_subscription_id: session.subscription || null,
            has_lifetime_access: true,
            has_monthly_updates: plan === 'lifetime_plus_monthly',
            created_at: new Date().toISOString(),
          }, { onConflict: 'user_id' });
        }
      }
      break;
    }

    case 'customer.subscription.deleted': {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const subscription = event.data.object as any;
      // Remove monthly update access but keep lifetime
      await getSupabaseAdmin()
        .from('toolkit_users')
        .update({ has_monthly_updates: false, plan: 'lifetime' })
        .eq('stripe_subscription_id', subscription.id);
      break;
    }
  }

  return NextResponse.json({ received: true });
}
