# AI Bookkeeper Toolkit - Setup & Deploy Guide

## Quick Start

```bash
cd ai-bookkeeper-toolkit
npm install
cp .env.local.example .env.local
# Fill in your env vars (see below)
npm run dev
```

## 1. Supabase Setup

1. Create a new Supabase project at https://supabase.com
2. Go to **SQL Editor** and run the migration file:
   - `supabase/migrations/001_toolkit_users.sql`
3. Get your keys from **Settings > API**:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
4. In **Authentication > URL Configuration**, add:
   - Site URL: `https://toolkit.salisburybookkeeping.com`
   - Redirect URLs: `https://toolkit.salisburybookkeeping.com/auth/callback`

## 2. Stripe Setup

1. Go to https://dashboard.stripe.com/products
2. Create a product: **AI Bookkeeper Toolkit - Lifetime Access**
   - Add a **one-time** price: $297.00
   - Copy the price ID → `STRIPE_PRICE_ID_LIFETIME`
3. Create a product: **AI Bookkeeper Toolkit - Monthly Updates**
   - Add a **recurring** price: $47.00/month
   - Copy the price ID → `STRIPE_PRICE_ID_MONTHLY`
4. Get your API keys from **Developers > API keys**:
   - `STRIPE_SECRET_KEY` (sk_live_xxx or sk_test_xxx)
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` (pk_live_xxx or pk_test_xxx)
5. Set up webhook:
   - URL: `https://toolkit.salisburybookkeeping.com/api/stripe/webhook`
   - Events: `checkout.session.completed`, `customer.subscription.deleted`
   - Copy webhook secret → `STRIPE_WEBHOOK_SECRET`
6. Configure **Customer Portal** in Stripe settings

## 3. Environment Variables

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

# Stripe
STRIPE_SECRET_KEY=sk_live_xxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx
STRIPE_PRICE_ID_LIFETIME=price_xxx
STRIPE_PRICE_ID_MONTHLY=price_xxx

# App
NEXT_PUBLIC_APP_URL=https://toolkit.salisburybookkeeping.com
```

## 4. Deploy to Vercel

1. Push to GitHub: `CorySlsbry/ai-bookkeeper-toolkit` (new repo)
2. Import in Vercel: https://vercel.com/import
3. Add all environment variables above
4. Set custom domain: `toolkit.salisburybookkeeping.com`
5. Deploy!

## 5. Domain Setup

1. In Vercel → Settings → Domains → Add `toolkit.salisburybookkeeping.com`
2. In your DNS provider, add the CNAME record Vercel gives you
3. Wait for DNS propagation (usually 5-30 minutes)

## Project Structure

```
src/
├── app/
│   ├── page.tsx              # Landing page (GEO-optimized)
│   ├── layout.tsx            # Root layout with JSON-LD schema
│   ├── login/page.tsx        # Login page
│   ├── signup/page.tsx       # Signup with Stripe checkout
│   ├── offline/page.tsx      # PWA offline fallback
│   ├── auth/callback/        # Supabase auth callback
│   ├── api/stripe/           # Stripe API routes
│   │   ├── checkout/         # Create checkout session
│   │   ├── webhook/          # Handle Stripe events
│   │   └── portal/           # Billing portal redirect
│   └── dashboard/
│       ├── page.tsx           # Dashboard home
│       ├── prompts/page.tsx   # Prompt library (52 prompts)
│       ├── workflows/page.tsx # n8n workflows
│       ├── resources/page.tsx # Templates & guides
│       └── settings/page.tsx  # Account & billing
├── components/
│   ├── ui/button.tsx          # Button component
│   └── pwa-register.tsx       # Service worker registration
├── lib/
│   ├── prompts-data.ts        # All 52 prompts data
│   ├── stripe.ts              # Stripe client
│   ├── supabase-browser.ts    # Browser Supabase client
│   ├── supabase-server.ts     # Server Supabase client
│   └── utils.ts               # Utility functions
public/
├── manifest.json              # PWA manifest
├── sw.js                      # Service worker
└── icons/                     # App icons (192, 512)
```

## Tech Stack

- **Next.js 14** (App Router, TypeScript)
- **Tailwind CSS** (dark theme matching BuilderCFO)
- **Supabase** (Auth + PostgreSQL)
- **Stripe** ($297 one-time + $47/mo subscription)
- **PWA** (installable, offline support)
- **Vercel** (deployment)
