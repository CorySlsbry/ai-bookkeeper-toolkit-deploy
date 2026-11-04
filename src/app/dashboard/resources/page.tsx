'use client';

import { FileText, Download, Star, BookOpen, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'template' | 'guide' | 'video' | 'checklist';
  icon: typeof FileText;
  color: string;
}

const RESOURCES: Resource[] = [
  {
    id: 'r-1',
    title: 'Client Wow Report Template',
    description:
      'A beautifully formatted financial summary template that makes your clients feel like they have a real CFO. Fill in the numbers, run the AI prompt, and send a report your clients will actually read.',
    type: 'template',
    icon: Star,
    color: '#f59e0b',
  },
  {
    id: 'r-2',
    title: 'New Client Onboarding SOP',
    description:
      'Step-by-step standard operating procedure for onboarding new bookkeeping clients. Covers discovery call, QBO setup, bank connections, first month workflow, and client handoff.',
    type: 'checklist',
    icon: BookOpen,
    color: '#6366f1',
  },
  {
    id: 'r-3',
    title: 'Month-End Close SOP',
    description:
      'Complete month-end close checklist that works for any QBO client. Pre-close tasks, adjusting entries, balance sheet review, P&L analysis, and client deliverables.',
    type: 'checklist',
    icon: FileText,
    color: '#22c55e',
  },
  {
    id: 'r-4',
    title: 'Pricing Your Bookkeeping Services',
    description:
      'Guide to pricing your services using value-based pricing instead of hourly rates. Includes pricing calculator and scripts for presenting prices to clients.',
    type: 'guide',
    icon: FileText,
    color: '#a5b4fc',
  },
  {
    id: 'r-5',
    title: 'AI Prompt Engineering for Bookkeepers',
    description:
      'Learn how to write your own AI prompts for any bookkeeping task. Covers prompt structure, variables, context setting, and output formatting.',
    type: 'guide',
    icon: BookOpen,
    color: '#6366f1',
  },
  {
    id: 'r-6',
    title: 'Video: Getting Started with the Toolkit',
    description:
      'Complete walkthrough of the AI Bookkeeper Toolkit. How to use prompts, set up workflows, and implement the Client Wow Report with your first client.',
    type: 'video',
    icon: Play,
    color: '#ef4444',
  },
  {
    id: 'r-7',
    title: 'Video: Bank Reconciliation with AI',
    description:
      'Step-by-step video showing how to use the bank reconciliation prompts to categorize a full month of transactions in under 15 minutes.',
    type: 'video',
    icon: Play,
    color: '#ef4444',
  },
  {
    id: 'r-8',
    title: 'Video: Setting Up n8n Workflows',
    description:
      'How to install n8n, import the workflow JSON files, connect your QBO and AI accounts, and run your first automated workflow.',
    type: 'video',
    icon: Play,
    color: '#ef4444',
  },
];

const typeColors = {
  template: { bg: 'bg-[#f59e0b]/10', text: 'text-[#f59e0b]' },
  guide: { bg: 'bg-[#6366f1]/10', text: 'text-[#6366f1]' },
  video: { bg: 'bg-[#ef4444]/10', text: 'text-[#ef4444]' },
  checklist: { bg: 'bg-[#22c55e]/10', text: 'text-[#22c55e]' },
};

export default function ResourcesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold mb-1">Resources & Templates</h2>
        <p className="text-sm text-[#8888a0]">
          Templates, SOPs, guides, and video walkthroughs to help you get the most out of the toolkit.
        </p>
      </div>

      {/* Filter by type */}
      <div className="flex flex-wrap gap-2">
        {['all', 'template', 'checklist', 'guide', 'video'].map((type) => (
          <button
            key={type}
            className="px-3 py-1.5 rounded-full text-xs font-medium bg-[#2a2a3d] text-[#8888a0] hover:text-[#e8e8f0] transition capitalize"
          >
            {type === 'all' ? 'All Resources' : `${type}s`}
          </button>
        ))}
      </div>

      {/* Resource Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {RESOURCES.map((resource) => {
          const colors = typeColors[resource.type];
          return (
            <div
              key={resource.id}
              className="p-5 rounded-xl bg-[#12121a] border border-[#2a2a3d] hover:border-[#6366f1]/20 transition-colors"
            >
              <div className="flex items-start gap-3 mb-3">
                <div
                  className={`w-10 h-10 rounded-lg ${colors.bg} flex items-center justify-center flex-shrink-0`}
                >
                  <resource.icon size={20} className={colors.text} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase ${colors.bg} ${colors.text}`}>
                      {resource.type}
                    </span>
                  </div>
                  <h3 className="font-semibold text-sm sm:text-base">{resource.title}</h3>
                </div>
              </div>
              <p className="text-sm text-[#a0a0a8] mb-4">{resource.description}</p>
              <Button variant="secondary" size="sm" className="gap-2">
                {resource.type === 'video' ? (
                  <>
                    <Play size={14} /> Watch Video
                  </>
                ) : (
                  <>
                    <Download size={14} /> Download
                  </>
                )}
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
