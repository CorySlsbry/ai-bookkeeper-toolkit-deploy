'use client';

import Link from 'next/link';
import { BookOpen, Zap, FileText, ArrowRight, Sparkles, Clock, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CATEGORIES, PROMPTS } from '@/lib/prompts-data';

const quickActions = [
  {
    icon: BookOpen,
    title: 'Prompt Library',
    description: '52 AI prompts across 12 categories',
    href: '/dashboard/prompts',
    color: '#6366f1',
  },
  {
    icon: Zap,
    title: 'Automation Workflows',
    description: '5 n8n workflows for QBO automation',
    href: '/dashboard/workflows',
    color: '#22c55e',
  },
  {
    icon: FileText,
    title: 'Resources & Templates',
    description: 'Client Wow Report, SOPs, and more',
    href: '/dashboard/resources',
    color: '#f59e0b',
  },
];

const recentPrompts = PROMPTS.slice(0, 5);

export default function DashboardHome() {
  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Welcome */}
      <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-[#6366f1]/10 to-[#12121a] border border-[#6366f1]/20">
        <div className="flex items-start gap-3 mb-3">
          <Sparkles size={24} className="text-[#6366f1] mt-0.5" />
          <div>
            <h2 className="text-xl sm:text-2xl font-bold">Welcome to your AI Toolkit</h2>
            <p className="text-sm text-[#a0a0a8] mt-1">
              52 done-for-you prompts ready to transform your bookkeeping practice.
              Start with the Prompt Library or check out the workflows below.
            </p>
          </div>
        </div>
        <Link href="/dashboard/prompts">
          <Button size="sm" className="gap-2 mt-2">
            Browse Prompts <ArrowRight size={16} />
          </Button>
        </Link>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {quickActions.map((action) => (
          <Link key={action.href} href={action.href}>
            <div className="p-5 rounded-xl bg-[#12121a] border border-[#2a2a3d] hover:border-[#6366f1]/30 transition-all cursor-pointer h-full">
              <action.icon size={28} style={{ color: action.color }} className="mb-3" />
              <h3 className="font-semibold mb-1">{action.title}</h3>
              <p className="text-sm text-[#8888a0]">{action.description}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {[
          { label: 'Total Prompts', value: '52', icon: BookOpen, color: '#6366f1' },
          { label: 'Categories', value: '12', icon: Star, color: '#f59e0b' },
          { label: 'Workflows', value: '5', icon: Zap, color: '#22c55e' },
          { label: 'Avg Time Saved', value: '10h/wk', icon: Clock, color: '#a5b4fc' },
        ].map((stat) => (
          <div key={stat.label} className="p-4 rounded-xl bg-[#12121a] border border-[#2a2a3d]">
            <stat.icon size={18} style={{ color: stat.color }} className="mb-2" />
            <div className="text-2xl font-bold">{stat.value}</div>
            <div className="text-xs text-[#8888a0]">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Categories Overview */}
      <div>
        <h3 className="text-lg font-bold mb-4">Browse by Category</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {CATEGORIES.map((cat) => (
            <Link key={cat.value} href={`/dashboard/prompts?category=${cat.value}`}>
              <div className="p-4 rounded-xl bg-[#12121a] border border-[#2a2a3d] hover:border-[#6366f1]/30 transition-colors cursor-pointer">
                <div className="text-xl mb-1">{cat.icon}</div>
                <div className="font-medium text-sm">{cat.label}</div>
                <div className="text-xs text-[#8888a0]">{cat.count} prompts</div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Recently Added */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold">Featured Prompts</h3>
          <Link href="/dashboard/prompts" className="text-sm text-[#6366f1] hover:underline">
            View all
          </Link>
        </div>
        <div className="space-y-2">
          {recentPrompts.map((prompt) => (
            <Link key={prompt.id} href={`/dashboard/prompts?prompt=${prompt.id}`}>
              <div className="p-4 rounded-xl bg-[#12121a] border border-[#2a2a3d] hover:border-[#6366f1]/30 transition-colors cursor-pointer flex items-center gap-4">
                <div className="text-xl">
                  {CATEGORIES.find((c) => c.value === prompt.category)?.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm truncate">{prompt.title}</div>
                  <div className="text-xs text-[#8888a0] truncate">{prompt.description}</div>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium flex-shrink-0 ${
                  prompt.difficulty === 'beginner'
                    ? 'bg-[#22c55e]/10 text-[#22c55e]'
                    : prompt.difficulty === 'intermediate'
                    ? 'bg-[#f59e0b]/10 text-[#f59e0b]'
                    : 'bg-[#ef4444]/10 text-[#ef4444]'
                }`}>
                  {prompt.difficulty}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
