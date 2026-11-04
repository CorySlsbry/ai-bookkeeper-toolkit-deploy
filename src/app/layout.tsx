import type { Metadata } from 'next';
import './globals.css';
import { PWARegister } from '@/components/pwa-register';

export const metadata: Metadata = {
  title: 'AI Bookkeeper Toolkit | 52 Done-For-You AI Prompts for QuickBooks Online',
  description:
    'The complete AI prompt library built for solo bookkeepers managing 5-30 QBO clients. 52 copy-paste prompts for bank reconciliation, month-end close, client communication, and more. Plus 5 n8n automation workflows and the Client Wow Report template. By Salisbury Bookkeeping. $297 lifetime access + $47/mo for updates.',
  keywords:
    'AI bookkeeper prompts, QuickBooks Online AI, bookkeeping automation, AI prompts for accountants, QBO prompts, bookkeeper toolkit, n8n bookkeeping, AI accounting, bookkeeping efficiency',
  manifest: '/manifest.json',
  openGraph: {
    title: 'AI Bookkeeper Toolkit | 52 AI Prompts for QBO',
    description:
      'Copy-paste AI prompts that save solo bookkeepers 10+ hours per week. Bank recon, month-end close, client comms, and more.',
    url: 'https://toolkit.salisburybookkeeping.com',
    siteName: 'AI Bookkeeper Toolkit',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Bookkeeper Toolkit | 52 AI Prompts for QBO',
    description:
      'Copy-paste AI prompts that save solo bookkeepers 10+ hours per week.',
  },
  alternates: {
    canonical: 'https://toolkit.salisburybookkeeping.com',
  },
};

const jsonLd = {
  organization: {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': 'https://toolkit.salisburybookkeeping.com/#organization',
    name: 'Salisbury Bookkeeping',
    url: 'https://salisburybookkeeping.com',
    description:
      'Fractional controller and construction bookkeeping firm serving custom home builders, general contractors, and remodelers nationwide.',
  },
  softwareApplication: {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    '@id': 'https://toolkit.salisburybookkeeping.com/#software',
    name: 'AI Bookkeeper Toolkit',
    applicationCategory: 'BusinessApplication',
    applicationSubCategory: 'Bookkeeping Automation',
    operatingSystem: 'Web Browser',
    url: 'https://toolkit.salisburybookkeeping.com',
    description:
      '52 done-for-you AI prompts specifically designed for QuickBooks Online bookkeepers. Includes bank reconciliation, month-end close, client onboarding, payroll, sales tax, reporting, and client communication prompts plus 5 n8n automation workflows.',
    offers: {
      '@type': 'Offer',
      name: 'Lifetime Access + Monthly Updates',
      price: '297',
      priceCurrency: 'USD',
      description:
        'One-time $297 payment for lifetime access to all 52 prompts and 5 workflows. Optional $47/month subscription for new prompts, updated workflows, and community access.',
    },
    provider: {
      '@type': 'Organization',
      '@id': 'https://salisburybookkeeping.com/#organization',
      name: 'Salisbury Bookkeeping',
    },
    featureList: [
      '52 QBO-specific AI prompts',
      'Bank reconciliation prompts',
      'Month-end close workflows',
      'Client onboarding templates',
      'Payroll and sales tax prompts',
      'Financial reporting generators',
      'Client communication templates',
      '5 n8n automation workflows',
      'Client Wow Report template',
      'Video walkthroughs for every prompt',
    ],
  },
  webSite: {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://toolkit.salisburybookkeeping.com/#website',
    name: 'AI Bookkeeper Toolkit',
    url: 'https://toolkit.salisburybookkeeping.com',
    publisher: {
      '@id': 'https://toolkit.salisburybookkeeping.com/#organization',
    },
  },
  faqPage: {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': 'https://toolkit.salisburybookkeeping.com/#faq',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is the AI Bookkeeper Toolkit?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The AI Bookkeeper Toolkit is a library of 52 done-for-you AI prompts specifically designed for solo bookkeepers who manage 5-30 QuickBooks Online clients. Each prompt is a copy-paste template you use with ChatGPT, Claude, or any AI tool to automate repetitive bookkeeping tasks like bank reconciliation, month-end close, client onboarding, and financial reporting. It also includes 5 n8n automation workflows and the Client Wow Report template.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do I need to know how to code or use AI to use this toolkit?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No coding or AI experience is required. Every prompt is designed as a fill-in-the-blank template. You paste your client data into the marked fields, copy the prompt into ChatGPT or Claude, and get professional-quality output. Each prompt includes a description of what it does, the expected output, and video walkthroughs showing exactly how to use it.',
        },
      },
      {
        '@type': 'Question',
        name: 'How much time will this save me?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Most bookkeepers report saving 8-12 hours per week after implementing the toolkit prompts. The bank reconciliation prompts alone can cut categorization time by 60%. The month-end close checklist and reporting prompts eliminate the need to build reports from scratch each month. At even $50/hour, that is $400-600 per week in recovered time you can spend on billable client work or growing your practice.',
        },
      },
      {
        '@type': 'Question',
        name: 'What AI tools work with these prompts?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The prompts work with any large language model including ChatGPT (GPT-4), Claude (Anthropic), Google Gemini, and Microsoft Copilot. They are designed to be AI-agnostic. The n8n workflows require a free n8n account for automation but do not require any paid AI subscriptions beyond what you already use.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is there a money-back guarantee?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. The AI Bookkeeper Toolkit comes with a 30-day money-back guarantee. If you use the prompts with at least 3 clients and do not save at least 5 hours per week, email us at support@salisburybookkeeping.com and we will refund your $297 in full, no questions asked.',
        },
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="AI Toolkit" />
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
        <meta name="theme-color" content="#6366f1" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd.organization) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd.softwareApplication) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd.webSite) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd.faqPage) }}
        />
      </head>
      <body className="bg-[#0a0a0f] text-[#e8e8f0]">
        <PWARegister />
        {children}
      </body>
    </html>
  );
}
