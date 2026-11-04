'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  CheckCircle2,
  ArrowRight,
  BookOpen,
  Zap,
  FileText,
  MessageSquare,
  Clock,
  DollarSign,
  Users,
  ChevronDown,
  ChevronUp,
  Shield,
  Play,
  Menu,
  X,
  Star,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CATEGORIES, PROMPTS } from '@/lib/prompts-data';

const OFFER_STACK = [
  {
    icon: BookOpen,
    title: '52 Done-For-You AI Prompts',
    description: 'Copy-paste prompts for every QBO task: bank recon, month-end close, payroll, reporting, and more.',
    value: '$2,500',
  },
  {
    icon: Zap,
    title: '5 n8n Automation Workflows',
    description: 'Pre-built workflows that automate bank categorization, invoice reminders, and client reporting.',
    value: '$1,500',
  },
  {
    icon: FileText,
    title: 'Client Wow Report Template',
    description: 'A financial summary template that makes your clients feel like they have a real CFO.',
    value: '$500',
  },
  {
    icon: Play,
    title: 'Video Walkthroughs',
    description: 'Step-by-step videos showing exactly how to use each prompt with real client scenarios.',
    value: '$750',
  },
  {
    icon: Users,
    title: 'Bookkeeper Community Access',
    description: 'Private community of AI-powered bookkeepers sharing prompts, tips, and workflows.',
    value: '$500',
  },
];

const TESTIMONIALS = [
  {
    name: 'Sarah M.',
    role: 'Solo Bookkeeper, 18 clients',
    quote: 'I was spending 3 hours per client on month-end close. Now it takes me 45 minutes. These prompts literally changed my business.',
    rating: 5,
  },
  {
    name: 'David K.',
    role: 'Bookkeeping Firm Owner',
    quote: 'The Client Wow Report alone was worth the price. My clients think I hired a CFO. Three clients upgraded to premium packages after seeing it.',
    rating: 5,
  },
  {
    name: 'Jamiefer L.',
    role: 'Freelance Bookkeeper, 12 clients',
    quote: 'I was terrified of AI replacing me. Instead, it made me 3x faster. I took on 8 new clients without hiring anyone.',
    rating: 5,
  },
];

const FAQ_ITEMS = [
  {
    q: 'What is the AI Bookkeeper Toolkit?',
    a: 'It\'s a library of 52 done-for-you AI prompts specifically designed for solo bookkeepers who manage 5-30 QuickBooks Online clients. Each prompt is a copy-paste template you use with ChatGPT, Claude, or any AI tool to automate repetitive bookkeeping tasks. It also includes 5 n8n automation workflows and the Client Wow Report template.',
  },
  {
    q: 'Do I need to know how to code or use AI?',
    a: 'Not at all. Every prompt is a fill-in-the-blank template. You paste your client data into the marked fields, copy the prompt into ChatGPT or Claude, and get professional-quality output. Each prompt includes a description and video walkthrough.',
  },
  {
    q: 'How much time will this actually save me?',
    a: 'Most bookkeepers report saving 8-12 hours per week. The bank reconciliation prompts alone can cut categorization time by 60%. At $50/hour, that\'s $400-600 per week in recovered time.',
  },
  {
    q: 'What AI tools work with these prompts?',
    a: 'Any large language model: ChatGPT (GPT-4), Claude, Google Gemini, Microsoft Copilot. The prompts are AI-agnostic. The n8n workflows require a free n8n account.',
  },
  {
    q: 'What if it doesn\'t work for me?',
    a: 'You\'re covered by our 30-day money-back guarantee. Use the prompts with at least 3 clients. If you don\'t save at least 5 hours per week, we\'ll refund your $297 in full.',
  },
  {
    q: 'What\'s the $47/month for?',
    a: 'The $297 gives you lifetime access to all 52 current prompts and 5 workflows. The optional $47/month subscription gets you new prompts every month, updated workflows, community access, and priority support. You can cancel anytime.',
  },
  {
    q: 'Who built this?',
    a: 'Salisbury Bookkeeping, a fractional controller firm that works with construction contractors nationwide. These are the same prompts and workflows we use internally to manage our own clients.',
  },
];

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const totalValue = OFFER_STACK.reduce((sum, item) => {
    const num = parseInt(item.value.replace(/[$,]/g, ''));
    return sum + num;
  }, 0);

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0f]/90 backdrop-blur-md border-b border-[#2a2a3d]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-14 sm:h-16">
            <div className="font-bold text-base sm:text-lg tracking-tight">
              <span className="text-[#6366f1]">AI Bookkeeper</span>
              <span className="text-[#e8e8f0]"> Toolkit</span>
              <div className="text-[9px] sm:text-[10px] text-[#8888a0] font-normal hidden sm:block">
                by Salisbury Bookkeeping
              </div>
            </div>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-6">
              <a href="#prompts" className="text-sm text-[#8888a0] hover:text-[#e8e8f0] transition">
                Prompts
              </a>
              <a href="#offer" className="text-sm text-[#8888a0] hover:text-[#e8e8f0] transition">
                What You Get
              </a>
              <a href="#faq" className="text-sm text-[#8888a0] hover:text-[#e8e8f0] transition">
                FAQ
              </a>
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  Sign In
                </Button>
              </Link>
              <a href="#pricing">
                <Button size="sm">Get Instant Access</Button>
              </a>
            </div>

            {/* Mobile hamburger */}
            <div className="flex md:hidden items-center gap-2">
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  Sign In
                </Button>
              </Link>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-[#8888a0] hover:text-[#e8e8f0]"
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          {mobileMenuOpen && (
            <div className="md:hidden pb-4 border-t border-[#2a2a3d] pt-3 space-y-2">
              <a
                href="#prompts"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-sm text-[#8888a0] hover:text-[#e8e8f0]"
              >
                Prompts
              </a>
              <a
                href="#offer"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-sm text-[#8888a0] hover:text-[#e8e8f0]"
              >
                What You Get
              </a>
              <a
                href="#faq"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-sm text-[#8888a0] hover:text-[#e8e8f0]"
              >
                FAQ
              </a>
              <a href="#pricing" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full mt-2" size="sm">
                  Get Instant Access
                </Button>
              </a>
            </div>
          )}
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-24 pb-12 sm:pt-32 sm:pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#6366f1]/10 border border-[#6366f1]/20 text-sm text-[#a5b4fc] mb-6">
            <Sparkles size={16} />
            <span>Built by bookkeepers, for bookkeepers</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-6">
            Stop Doing Bookkeeping the Hard Way.{' '}
            <span className="gradient-text">Let AI Do the Heavy Lifting.</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-[#a0a0a8] max-w-2xl mx-auto mb-8">
            52 done-for-you AI prompts that turn ChatGPT into your bookkeeping
            assistant. Bank reconciliation, month-end close, client reports, and
            more — all designed specifically for QuickBooks Online.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-8">
            <a href="#pricing">
              <Button size="xl" className="w-full sm:w-auto gap-2">
                Get Instant Access — $297
                <ArrowRight size={18} />
              </Button>
            </a>
            <a href="#prompts">
              <Button variant="outline" size="xl" className="w-full sm:w-auto gap-2">
                <BookOpen size={18} />
                Preview Free Prompts
              </Button>
            </a>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-[#8888a0]">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 size={16} className="text-[#22c55e]" />
              52 QBO-specific prompts
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 size={16} className="text-[#22c55e]" />
              30-day money-back guarantee
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 size={16} className="text-[#22c55e]" />
              Works with any AI tool
            </span>
          </div>
        </div>
      </section>

      {/* Social Proof Bar */}
      <section className="py-8 border-y border-[#2a2a3d] bg-[#12121a]">
        <div className="max-w-4xl mx-auto px-4 flex flex-wrap items-center justify-center gap-8 sm:gap-12">
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-[#6366f1]">52</div>
            <div className="text-xs sm:text-sm text-[#8888a0]">AI Prompts</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-[#22c55e]">10+</div>
            <div className="text-xs sm:text-sm text-[#8888a0]">Hours Saved/Week</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-[#f59e0b]">12</div>
            <div className="text-xs sm:text-sm text-[#8888a0]">Categories</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-[#ef4444]">$0</div>
            <div className="text-xs sm:text-sm text-[#8888a0]">AI Experience Needed</div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-16 sm:py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4">
            You Know AI Could Transform Your Practice.
            <br />
            <span className="text-[#8888a0]">But You Don&apos;t Know Where to Start.</span>
          </h2>
          <p className="text-center text-[#a0a0a8] max-w-2xl mx-auto mb-12">
            You&apos;ve seen the headlines. AI is changing everything. But every time you open ChatGPT,
            you stare at the blank text box and think... &quot;What do I even type?&quot;
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {[
              {
                icon: Clock,
                title: 'Hours lost on manual categorization',
                description:
                  'You\'re still manually categorizing bank transactions one by one, spending 2-3 hours per client.',
              },
              {
                icon: FileText,
                title: 'Month-end close takes forever',
                description:
                  'Your close process is a mental checklist you rebuild from memory every single month.',
              },
              {
                icon: MessageSquare,
                title: 'Client reports feel basic',
                description:
                  'You send the same QBO default reports every month. Your clients don\'t read them.',
              },
              {
                icon: DollarSign,
                title: 'Can\'t raise prices without more value',
                description:
                  'You want to charge more but feel stuck competing on price with bookkeepers overseas.',
              },
            ].map((problem) => (
              <div
                key={problem.title}
                className="p-5 sm:p-6 rounded-xl bg-[#12121a] border border-[#2a2a3d] hover:border-[#6366f1]/30 transition-colors"
              >
                <problem.icon size={24} className="text-[#ef4444] mb-3" />
                <h3 className="font-semibold text-base sm:text-lg mb-2">{problem.title}</h3>
                <p className="text-sm text-[#a0a0a8]">{problem.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Prompt Categories Preview */}
      <section id="prompts" className="py-16 sm:py-20 px-4 bg-[#12121a]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              52 Prompts Across 12 Categories
            </h2>
            <p className="text-[#a0a0a8] max-w-xl mx-auto">
              Every prompt is battle-tested with real QBO clients. Copy, paste, customize, done.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 mb-12">
            {CATEGORIES.map((cat) => (
              <div
                key={cat.value}
                className="p-4 rounded-xl bg-[#0a0a0f] border border-[#2a2a3d] hover:border-[#6366f1]/30 transition-colors text-center"
              >
                <div className="text-2xl mb-2">{cat.icon}</div>
                <div className="font-medium text-sm mb-1">{cat.label}</div>
                <div className="text-xs text-[#8888a0]">{cat.count} prompts</div>
              </div>
            ))}
          </div>

          {/* Free Prompt Previews */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-center mb-6">
              Try These Free — No Account Needed
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {PROMPTS.filter((p) => p.isFree)
                .slice(0, 4)
                .map((prompt) => (
                  <div
                    key={prompt.id}
                    className="p-5 rounded-xl bg-[#0a0a0f] border border-[#22c55e]/30 relative overflow-hidden"
                  >
                    <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-[#22c55e]/10 text-[#22c55e] text-[10px] font-semibold uppercase">
                      Free
                    </div>
                    <div className="text-xs text-[#6366f1] font-medium mb-1 uppercase">
                      {CATEGORIES.find((c) => c.value === prompt.category)?.label}
                    </div>
                    <h4 className="font-semibold mb-2">{prompt.title}</h4>
                    <p className="text-sm text-[#a0a0a8] mb-3">{prompt.description}</p>
                    <div className="flex items-center gap-2 text-xs text-[#8888a0]">
                      <span className={`px-2 py-0.5 rounded-full ${
                        prompt.difficulty === 'beginner'
                          ? 'bg-[#22c55e]/10 text-[#22c55e]'
                          : prompt.difficulty === 'intermediate'
                          ? 'bg-[#f59e0b]/10 text-[#f59e0b]'
                          : 'bg-[#ef4444]/10 text-[#ef4444]'
                      }`}>
                        {prompt.difficulty}
                      </span>
                      {prompt.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="px-2 py-0.5 rounded-full bg-[#2a2a3d] text-[#8888a0]">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          </div>

          <div className="text-center">
            <a href="#pricing">
              <Button size="lg" className="gap-2">
                Unlock All 52 Prompts
                <ArrowRight size={18} />
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Grand Slam Offer Stack */}
      <section id="offer" className="py-16 sm:py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              Everything You Get Today
            </h2>
            <p className="text-[#a0a0a8]">
              Total value: <span className="line-through">${totalValue.toLocaleString()}</span> — Yours
              for just <span className="text-[#22c55e] font-bold">$297</span>
            </p>
          </div>

          <div className="space-y-4 mb-12">
            {OFFER_STACK.map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-4 p-5 sm:p-6 rounded-xl bg-[#12121a] border border-[#2a2a3d]"
              >
                <div className="w-12 h-12 rounded-lg bg-[#6366f1]/10 flex items-center justify-center flex-shrink-0">
                  <item.icon size={24} className="text-[#6366f1]" />
                </div>
                <div className="flex-1">
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="font-semibold text-base sm:text-lg">{item.title}</h3>
                    <span className="text-sm text-[#8888a0] line-through whitespace-nowrap">
                      {item.value} value
                    </span>
                  </div>
                  <p className="text-sm text-[#a0a0a8] mt-1">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 sm:py-20 px-4 bg-[#12121a]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12">
            Bookkeepers Are Already Saving 10+ Hours a Week
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {TESTIMONIALS.map((t, i) => (
              <div
                key={i}
                className="p-5 sm:p-6 rounded-xl bg-[#0a0a0f] border border-[#2a2a3d]"
              >
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} size={16} className="text-[#f59e0b] fill-[#f59e0b]" />
                  ))}
                </div>
                <p className="text-sm text-[#a0a0a8] mb-4 italic">&quot;{t.quote}&quot;</p>
                <div>
                  <div className="font-semibold text-sm">{t.name}</div>
                  <div className="text-xs text-[#8888a0]">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-16 sm:py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              One Price. Lifetime Access. No Tricks.
            </h2>
            <p className="text-[#a0a0a8]">
              Get everything today for a one-time payment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {/* Lifetime Access */}
            <div className="p-6 sm:p-8 rounded-2xl bg-[#12121a] border-2 border-[#6366f1] relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#6366f1] text-white text-xs font-semibold">
                MOST POPULAR
              </div>
              <h3 className="text-xl font-bold mb-2">Lifetime Access</h3>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-4xl font-bold">$297</span>
                <span className="text-[#8888a0] text-sm">one-time</span>
              </div>
              <ul className="space-y-3 mb-6">
                {[
                  'All 52 AI prompts',
                  '5 n8n automation workflows',
                  'Client Wow Report template',
                  'Video walkthroughs',
                  'Lifetime access to current library',
                  '30-day money-back guarantee',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 size={16} className="text-[#22c55e] mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/signup?plan=lifetime">
                <Button className="w-full" size="lg">
                  Get Instant Access
                </Button>
              </Link>
            </div>

            {/* Lifetime + Monthly Updates */}
            <div className="p-6 sm:p-8 rounded-2xl bg-[#12121a] border border-[#2a2a3d]">
              <h3 className="text-xl font-bold mb-2">Lifetime + Updates</h3>
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-4xl font-bold">$297</span>
                <span className="text-[#8888a0] text-sm">one-time</span>
              </div>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-lg font-semibold text-[#6366f1]">+ $47</span>
                <span className="text-[#8888a0] text-sm">/month</span>
              </div>
              <ul className="space-y-3 mb-6">
                {[
                  'Everything in Lifetime Access',
                  'New prompts every month',
                  'Updated workflows & templates',
                  'Priority support',
                  'Community access',
                  'Cancel monthly anytime',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 size={16} className="text-[#22c55e] mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/signup?plan=lifetime_plus_monthly">
                <Button variant="outline" className="w-full" size="lg">
                  Get Access + Updates
                </Button>
              </Link>
            </div>
          </div>

          {/* Guarantee */}
          <div className="mt-12 p-6 rounded-2xl bg-[#12121a] border border-[#22c55e]/30 max-w-2xl mx-auto text-center">
            <Shield size={32} className="text-[#22c55e] mx-auto mb-3" />
            <h3 className="font-bold text-lg mb-2">30-Day Money-Back Guarantee</h3>
            <p className="text-sm text-[#a0a0a8]">
              Use the prompts with at least 3 clients. If you don&apos;t save at least 5 hours per
              week, email us and we&apos;ll refund your $297 in full. No questions asked. We&apos;ve
              never had someone ask for a refund.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-16 sm:py-20 px-4 bg-[#12121a]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12">
            Frequently Asked Questions
          </h2>

          <div className="space-y-3">
            {FAQ_ITEMS.map((faq, i) => (
              <div
                key={i}
                className="rounded-xl bg-[#0a0a0f] border border-[#2a2a3d] overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-4 sm:p-5 text-left"
                >
                  <span className="font-medium text-sm sm:text-base pr-4">{faq.q}</span>
                  {openFaq === i ? (
                    <ChevronUp size={18} className="text-[#8888a0] flex-shrink-0" />
                  ) : (
                    <ChevronDown size={18} className="text-[#8888a0] flex-shrink-0" />
                  )}
                </button>
                {openFaq === i && (
                  <div className="px-4 sm:px-5 pb-4 sm:pb-5 text-sm text-[#a0a0a8]">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 sm:py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            Ready to Save 10+ Hours Every Week?
          </h2>
          <p className="text-[#a0a0a8] mb-8 max-w-xl mx-auto">
            Join bookkeepers who are using AI to work smarter, charge more, and
            actually enjoy their practice again.
          </p>
          <a href="#pricing">
            <Button size="xl" className="gap-2">
              Get Instant Access — $297
              <ArrowRight size={18} />
            </Button>
          </a>
          <p className="text-xs text-[#8888a0] mt-4">
            30-day money-back guarantee. No subscription required.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-[#2a2a3d]">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-[#8888a0]">
          <div>
            <span className="text-[#6366f1] font-semibold">AI Bookkeeper Toolkit</span>{' '}
            by Salisbury Bookkeeping
          </div>
          <div className="flex items-center gap-4">
            <a href="https://salisburybookkeeping.com" className="hover:text-[#e8e8f0] transition">
              Salisbury Bookkeeping
            </a>
            <a href="mailto:support@salisburybookkeeping.com" className="hover:text-[#e8e8f0] transition">
              Support
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
