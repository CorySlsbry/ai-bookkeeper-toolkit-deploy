import { NextRequest, NextResponse } from 'next/server';
import { getStripe } from '@/lib/stripe';
import { createServerSupabase } from '@/lib/supabase-server';

export async function POST(_request: NextRequest) {
  try {
    const supabase = createServerSupabase();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ success: false, error: 'Not authenticated' }, { status: 401 });
    }

    const { data: toolkitUser } = await supabase
      .from('toolkit_users')
      .select('stripe_customer_id')
      .eq('user_id', user.id)
      .single();

    if (!toolkitUser?.stripe_customer_id) {
      return NextResponse.json({ success: false, error: 'No billing account found' }, { status: 404 });
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const session = await getStripe().billingPortal.sessions.create({
      customer: toolkitUser.stripe_customer_id,
      return_url: `${appUrl}/dashboard/settings`,
    });

    return NextResponse.json({ success: true, data: { url: session.url } });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}
