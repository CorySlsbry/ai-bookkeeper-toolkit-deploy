'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase-browser';
import { Button } from '@/components/ui/button';
import { CreditCard, ExternalLink, Loader2, Shield, User } from 'lucide-react';

export default function SettingsPage() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const supabase = createClient();

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setEmail(user.email || '');
        setFullName(user.user_metadata?.full_name || '');
      }
    };
    fetchUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleManageBilling = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/stripe/portal', { method: 'POST' });
      const data = await res.json();
      if (data.success && data.data?.url) {
        window.location.href = data.data.url;
      }
    } catch (error) {
      console.error('Failed to open billing portal:', error);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold mb-1">Settings</h2>
        <p className="text-sm text-[#8888a0]">Manage your account and billing.</p>
      </div>

      {/* Profile */}
      <div className="p-5 sm:p-6 rounded-xl bg-[#12121a] border border-[#2a2a3d]">
        <div className="flex items-center gap-3 mb-4">
          <User size={20} className="text-[#6366f1]" />
          <h3 className="font-semibold">Profile</h3>
        </div>
        <div className="space-y-3">
          <div>
            <label className="block text-xs text-[#8888a0] mb-1">Full Name</label>
            <div className="text-sm">{fullName || 'Not set'}</div>
          </div>
          <div>
            <label className="block text-xs text-[#8888a0] mb-1">Email</label>
            <div className="text-sm">{email}</div>
          </div>
        </div>
      </div>

      {/* Billing */}
      <div className="p-5 sm:p-6 rounded-xl bg-[#12121a] border border-[#2a2a3d]">
        <div className="flex items-center gap-3 mb-4">
          <CreditCard size={20} className="text-[#22c55e]" />
          <h3 className="font-semibold">Billing</h3>
        </div>
        <p className="text-sm text-[#a0a0a8] mb-4">
          Manage your subscription, update payment method, or view invoices through the Stripe billing portal.
        </p>
        <Button
          variant="secondary"
          size="sm"
          className="gap-2"
          onClick={handleManageBilling}
          disabled={loading}
        >
          {loading ? (
            <Loader2 size={14} className="animate-spin" />
          ) : (
            <>
              <ExternalLink size={14} />
              Manage Billing
            </>
          )}
        </Button>
      </div>

      {/* Security */}
      <div className="p-5 sm:p-6 rounded-xl bg-[#12121a] border border-[#2a2a3d]">
        <div className="flex items-center gap-3 mb-4">
          <Shield size={20} className="text-[#f59e0b]" />
          <h3 className="font-semibold">Security</h3>
        </div>
        <p className="text-sm text-[#a0a0a8] mb-4">
          Your data is encrypted and secure. We never store your QBO credentials.
        </p>
        <div className="space-y-2 text-sm text-[#8888a0]">
          <div>Encryption: AES-256 at rest, TLS 1.3 in transit</div>
          <div>Hosting: Vercel + Supabase (SOC 2 compliant)</div>
          <div>Payments: Stripe (PCI-DSS Level 1)</div>
        </div>
      </div>

      {/* Support */}
      <div className="p-5 sm:p-6 rounded-xl bg-[#12121a] border border-[#2a2a3d]">
        <h3 className="font-semibold mb-3">Need Help?</h3>
        <p className="text-sm text-[#a0a0a8] mb-3">
          Email us at{' '}
          <a href="mailto:support@salisburybookkeeping.com" className="text-[#6366f1] hover:underline">
            support@salisburybookkeeping.com
          </a>
        </p>
      </div>
    </div>
  );
}
