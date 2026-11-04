-- AI Bookkeeper Toolkit - Database Schema
-- Run this in your Supabase SQL editor

-- Toolkit users table (stores subscription info)
CREATE TABLE IF NOT EXISTS public.toolkit_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE NOT NULL,
  email TEXT NOT NULL,
  plan TEXT NOT NULL DEFAULT 'lifetime', -- 'lifetime' or 'lifetime_plus_monthly'
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  has_lifetime_access BOOLEAN DEFAULT false,
  has_monthly_updates BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Row Level Security
ALTER TABLE public.toolkit_users ENABLE ROW LEVEL SECURITY;

-- Users can read their own record
CREATE POLICY "Users can read own toolkit_users"
  ON public.toolkit_users
  FOR SELECT
  USING (auth.uid() = user_id);

-- Service role can do anything (for webhook updates)
CREATE POLICY "Service role full access"
  ON public.toolkit_users
  FOR ALL
  USING (auth.role() = 'service_role');

-- Index for fast lookups
CREATE INDEX IF NOT EXISTS idx_toolkit_users_user_id ON public.toolkit_users(user_id);
CREATE INDEX IF NOT EXISTS idx_toolkit_users_stripe_customer ON public.toolkit_users(stripe_customer_id);
CREATE INDEX IF NOT EXISTS idx_toolkit_users_stripe_subscription ON public.toolkit_users(stripe_subscription_id);

-- Updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER toolkit_users_updated_at
  BEFORE UPDATE ON public.toolkit_users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
