'use client';

import { useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase-browser';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Loader2 } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      window.location.href = '/dashboard';
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0f] px-4">
      <div className="w-full max-w-md">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-[#8888a0] hover:text-[#e8e8f0] mb-8 transition">
          <ArrowLeft size={16} /> Back to home
        </Link>

        <div className="p-6 sm:p-8 rounded-2xl bg-[#12121a] border border-[#2a2a3d]">
          <div className="text-center mb-6">
            <div className="font-bold text-xl mb-1">
              <span className="text-[#6366f1]">AI Bookkeeper</span> Toolkit
            </div>
            <p className="text-sm text-[#8888a0]">Sign in to access your prompts</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
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
                className="w-full px-4 py-2.5 rounded-lg bg-[#0a0a0f] border border-[#2a2a3d] text-[#e8e8f0] text-sm focus:outline-none focus:ring-2 focus:ring-[#6366f1] focus:border-transparent"
                placeholder="Your password"
              />
            </div>

            {error && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-sm text-red-400">
                {error}
              </div>
            )}

            <Button type="submit" className="w-full" size="lg" disabled={loading}>
              {loading ? <Loader2 size={18} className="animate-spin" /> : 'Sign In'}
            </Button>
          </form>

          <p className="text-center text-sm text-[#8888a0] mt-4">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="text-[#6366f1] hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
