'use client';

import { useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { createClient } from '@/lib/supabase-browser';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Loader2, CheckCircle2 } from 'lucide-react';

export default function SignupPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0a0a0f]" />}>
      <SignupForm />
    </Suspense>
  );
}

function SignupForm() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const plan = searchParams.get('plan') || 'lifetime';
  const supabase = createClient();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // 1. Create user in Supabase
    const { error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
      },
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    // 2. Create Stripe checkout session
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan, email }),
      });

      const data = await res.json();

      if (data.success && data.data?.url) {
        window.location.href = data.data.url;
      } else {
        setError(data.error || 'Failed to create checkout session. Please sign in and try again.');
        setLoading(false);
      }
    } catch (_err) {
      setError('Network error. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0f] px-4 py-12">
      <div className="w-full max-w-md">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-[#8888a0] hover:text-[#e8e8f0] mb-8 transition">
          <ArrowLeft size={16} /> Back to home
        </Link>

        <div className="p-6 sm:p-8 rounded-2xl bg-[#12121a] border border-[#2a2a3d]">
          <div className="text-center mb-6">
            <div className="font-bold text-xl mb-1">
              <span className="text-[#6366f1]">AI Bookkeeper</span> Toolkit
            </div>
            <p className="text-sm text-[#8888a0]">
              {plan === 'lifetime_plus_monthly'
                ? 'Lifetime Access + Monthly Updates — $297 + $47/mo'
                : 'Lifetime Access — $297 one-time'}
            </p>
          </div>

          {/* What they get */}
          <div className="p-3 rounded-lg bg-[#6366f1]/5 border border-[#6366f1]/20 mb-6">
            <div className="text-xs font-semibold text-[#a5b4fc] mb-2">INCLUDED:</div>
            {['52 AI prompts for QBO', '5 n8n workflows', 'Client Wow Report', 'Video walkthroughs'].map((item) => (
              <div key={item} className="flex items-center gap-2 text-xs text-[#a0a0a8] mb-1">
                <CheckCircle2 size={12} className="text-[#22c55e]" />
                {item}
              </div>
            ))}
          </div>

          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#a0a0a8] mb-1.5">Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="w-full px-4 py-2.5 rounded-lg bg-[#0a0a0f] border border-[#2a2a3d] text-[#e8e8f0] text-sm focus:outline-none focus:ring-2 focus:ring-[#6366f1] focus:border-transparent"
                placeholder="Jane Smith"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#a0a0a8] mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2.5 rounded-lg bg-[#0a0a0f] border border-[#2a2a3d] text-[#e8e8f0] text-sm focus:outline-none focus:ring-2 focus:ring-[#6366f1] focus:border-transparent"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#a0a0a8] mb-1.5">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
                className="w-full px-4 py-2.5 rounded-lg bg-[#0a0a0f] border border-[#2a2a3d] text-[#e8e8f0] text-sm focus:outline-none focus:ring-2 focus:ring-[#6366f1] focus:border-transparent"
                placeholder="Minimum 8 characters"
              />
            </div>

            {error && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-sm text-red-400">
                {error}
              </div>
            )}

            <Button type="submit" className="w-full" size="lg" disabled={loading}>
              {loading ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                `Continue to Payment — $297`
              )}
            </Button>

            <p className="text-xs text-center text-[#8888a0]">
              30-day money-back guarantee. Secure checkout via Stripe.
            </p>
          </form>

          <p className="text-center text-sm text-[#8888a0] mt-4">
            Already have an account?{' '}
            <Link href="/login" className="text-[#6366f1] hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
