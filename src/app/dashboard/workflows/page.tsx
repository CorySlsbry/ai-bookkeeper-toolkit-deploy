'use client';

import { Zap, Download, ExternalLink, Clock, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Workflow {
  id: string;
  title: string;
  description: string;
  timesSaved: string;
  difficulty: 'easy' | 'medium' | 'advanced';
  steps: string[];
  tools: string[];
}

const WORKFLOWS: Workflow[] = [
  {
    id: 'wf-1',
    title: 'Auto Bank Transaction Categorizer',
    description:
      'Automatically categorize bank feed transactions using AI. Pulls uncategorized transactions from QBO, sends them to GPT for categorization, and updates QBO with the correct categories.',
    timesSaved: '3-5 hours/week',
    difficulty: 'easy',
    steps: [
      'Trigger: Runs daily at 6 AM',
      'Fetch uncategorized transactions from QBO API',
      'Send batch to GPT-4 with your category rules',
      'Map AI suggestions to QBO categories',
      'Update transactions in QBO via API',
      'Send Slack/email summary of categorized items',
    ],
    tools: ['n8n', 'QBO API', 'OpenAI API', 'Slack/Email'],
  },
  {
    id: 'wf-2',
    title: 'Invoice Reminder Automation',
    description:
      'Automatically send personalized payment reminders for overdue invoices. Checks QBO aging daily and sends escalating emails based on how overdue each invoice is.',
    timesSaved: '2-3 hours/week',
    difficulty: 'easy',
    steps: [
      'Trigger: Runs daily at 9 AM',
      'Pull A/R aging report from QBO',
      'Filter invoices by overdue buckets (7, 14, 30, 60+ days)',
      'Generate personalized email using AI (different tone per bucket)',
      'Send email via Gmail/Outlook',
      'Log activity in a tracking spreadsheet',
    ],
    tools: ['n8n', 'QBO API', 'OpenAI API', 'Gmail/Outlook'],
  },
  {
    id: 'wf-3',
    title: 'Monthly Client Report Generator',
    description:
      'Pull P&L and Balance Sheet data from QBO, feed it to AI for analysis, and generate a beautiful "Client Wow Report" PDF that gets emailed to the client automatically.',
    timesSaved: '4-6 hours/month per client',
    difficulty: 'medium',
    steps: [
      'Trigger: 5th of each month',
      'Pull P&L (current + prior month) from QBO',
      'Pull Balance Sheet from QBO',
      'Pull A/R and A/P aging summaries',
      'Send all data to GPT for variance analysis and recommendations',
      'Generate formatted report (HTML or PDF)',
      'Email report to client with personalized message',
    ],
    tools: ['n8n', 'QBO API', 'OpenAI API', 'HTML/PDF generator', 'Email'],
  },
  {
    id: 'wf-4',
    title: 'Receipt Capture & Entry',
    description:
      'Watch an email inbox or Google Drive folder for receipt images. Use AI to extract vendor, amount, date, and category, then create the expense entry in QBO automatically.',
    timesSaved: '2-4 hours/week',
    difficulty: 'medium',
    steps: [
      'Trigger: New email with attachment / new file in Google Drive',
      'Extract image/PDF from email or folder',
      'Send to GPT-4 Vision for data extraction',
      'Map extracted data to QBO fields (vendor, amount, category, date)',
      'Create expense entry in QBO via API',
      'Attach original receipt to QBO transaction',
      'Send confirmation to bookkeeper',
    ],
    tools: ['n8n', 'Gmail/Google Drive', 'OpenAI Vision API', 'QBO API'],
  },
  {
    id: 'wf-5',
    title: 'Reconciliation Discrepancy Alerter',
    description:
      'Monitors QBO bank balances vs bank feed balances and alerts you when discrepancies exceed your threshold. Catches issues before month-end close.',
    timesSaved: '1-2 hours/week',
    difficulty: 'easy',
    steps: [
      'Trigger: Runs every Monday and Thursday',
      'Fetch all bank account balances from QBO',
      'Compare QBO balance vs bank feed balance',
      'Calculate discrepancy for each account',
      'If discrepancy > threshold, generate investigation summary with AI',
      'Send alert via Slack/email with recommended next steps',
    ],
    tools: ['n8n', 'QBO API', 'OpenAI API', 'Slack/Email'],
  },
];

export default function WorkflowsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold mb-1">Automation Workflows</h2>
        <p className="text-sm text-[#8888a0]">
          5 pre-built n8n workflows that automate your most repetitive QBO tasks.
        </p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <div className="p-4 rounded-xl bg-[#12121a] border border-[#2a2a3d]">
          <Zap size={18} className="text-[#22c55e] mb-2" />
          <div className="text-2xl font-bold">5</div>
          <div className="text-xs text-[#8888a0]">Workflows</div>
        </div>
        <div className="p-4 rounded-xl bg-[#12121a] border border-[#2a2a3d]">
          <Clock size={18} className="text-[#6366f1] mb-2" />
          <div className="text-2xl font-bold">12-20h</div>
          <div className="text-xs text-[#8888a0]">Saved per week</div>
        </div>
        <div className="p-4 rounded-xl bg-[#12121a] border border-[#2a2a3d] col-span-2 sm:col-span-1">
          <CheckCircle2 size={18} className="text-[#f59e0b] mb-2" />
          <div className="text-2xl font-bold">Free</div>
          <div className="text-xs text-[#8888a0]">n8n account required</div>
        </div>
      </div>

      {/* Workflow Cards */}
      <div className="space-y-4">
        {WORKFLOWS.map((wf) => (
          <div key={wf.id} className="rounded-xl bg-[#12121a] border border-[#2a2a3d] overflow-hidden">
            <div className="p-5 sm:p-6">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#22c55e]/10 flex items-center justify-center flex-shrink-0">
                    <Zap size={20} className="text-[#22c55e]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-base sm:text-lg">{wf.title}</h3>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs text-[#22c55e] font-medium">
                        Saves {wf.timesSaved}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                          wf.difficulty === 'easy'
                            ? 'bg-[#22c55e]/10 text-[#22c55e]'
                            : wf.difficulty === 'medium'
                            ? 'bg-[#f59e0b]/10 text-[#f59e0b]'
                            : 'bg-[#ef4444]/10 text-[#ef4444]'
                        }`}
                      >
                        {wf.difficulty}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-sm text-[#a0a0a8] mb-4">{wf.description}</p>

              {/* Steps */}
              <div className="mb-4">
                <div className="text-xs font-semibold text-[#8888a0] uppercase mb-2">
                  How it works
                </div>
                <div className="space-y-1.5">
                  {wf.steps.map((step, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-[#a0a0a8]">
                      <span className="w-5 h-5 rounded-full bg-[#2a2a3d] flex items-center justify-center text-[10px] font-bold text-[#8888a0] flex-shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tools */}
              <div className="flex flex-wrap gap-2 mb-4">
                {wf.tools.map((tool) => (
                  <span key={tool} className="px-2 py-1 rounded-full bg-[#2a2a3d] text-xs text-[#8888a0]">
                    {tool}
                  </span>
                ))}
              </div>

              {/* Download button */}
              <Button variant="secondary" size="sm" className="gap-2">
                <Download size={14} />
                Download Workflow JSON
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Setup Guide */}
      <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-[#22c55e]/10 to-[#12121a] border border-[#22c55e]/20">
        <h3 className="font-bold text-lg mb-2">Getting Started with n8n</h3>
        <p className="text-sm text-[#a0a0a8] mb-3">
          n8n is a free, open-source workflow automation tool. You can self-host it or use
          their cloud version. Each workflow above exports as a JSON file you import directly.
        </p>
        <Button variant="outline" size="sm" className="gap-2">
          <ExternalLink size={14} />
          n8n Setup Guide
        </Button>
      </div>
    </div>
  );
}
