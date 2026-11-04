'use client';

import { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  Search,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  BookOpen,
  X,
  Filter,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  PROMPTS,
  CATEGORIES,
  type Prompt,
  type PromptCategory,
} from '@/lib/prompts-data';

export default function PromptLibrary() {
  return (
    <Suspense fallback={<div />}>
      <PromptLibraryInner />
    </Suspense>
  );
}

function PromptLibraryInner() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') as PromptCategory | null;
  const initialPromptId = searchParams.get('prompt');

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<PromptCategory | null>(initialCategory);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);
  const [expandedPrompt, setExpandedPrompt] = useState<string | null>(initialPromptId);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const filteredPrompts = useMemo(() => {
    let results = PROMPTS;

    if (searchQuery) {
      const lower = searchQuery.toLowerCase();
      results = results.filter(
        (p) =>
          p.title.toLowerCase().includes(lower) ||
          p.description.toLowerCase().includes(lower) ||
          p.tags.some((t) => t.toLowerCase().includes(lower))
      );
    }

    if (selectedCategory) {
      results = results.filter((p) => p.category === selectedCategory);
    }

    if (selectedDifficulty) {
      results = results.filter((p) => p.difficulty === selectedDifficulty);
    }

    return results;
  }, [searchQuery, selectedCategory, selectedDifficulty]);

  const handleCopy = async (prompt: Prompt) => {
    await navigator.clipboard.writeText(prompt.prompt);
    setCopiedId(prompt.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory(null);
    setSelectedDifficulty(null);
  };

  const hasFilters = searchQuery || selectedCategory || selectedDifficulty;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold mb-1">Prompt Library</h2>
        <p className="text-sm text-[#8888a0]">
          {filteredPrompts.length} of {PROMPTS.length} prompts
          {hasFilters && (
            <button onClick={clearFilters} className="ml-2 text-[#6366f1] hover:underline">
              Clear filters
            </button>
          )}
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="space-y-3">
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8888a0]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search prompts by title, description, or tag..."
              className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-[#12121a] border border-[#2a2a3d] text-[#e8e8f0] text-sm focus:outline-none focus:ring-2 focus:ring-[#6366f1] focus:border-transparent"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8888a0] hover:text-[#e8e8f0]"
              >
                <X size={16} />
              </button>
            )}
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`px-3 py-2.5 rounded-lg border text-sm font-medium transition-colors flex items-center gap-2 ${
              showFilters || selectedCategory || selectedDifficulty
                ? 'bg-[#6366f1]/10 border-[#6366f1]/30 text-[#a5b4fc]'
                : 'bg-[#12121a] border-[#2a2a3d] text-[#8888a0] hover:text-[#e8e8f0]'
            }`}
          >
            <Filter size={16} />
            <span className="hidden sm:inline">Filters</span>
          </button>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="p-4 rounded-xl bg-[#12121a] border border-[#2a2a3d] space-y-4">
            <div>
              <div className="text-xs font-semibold text-[#8888a0] uppercase mb-2">Category</div>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.value}
                    onClick={() =>
                      setSelectedCategory(selectedCategory === cat.value ? null : cat.value)
                    }
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                      selectedCategory === cat.value
                        ? 'bg-[#6366f1] text-white'
                        : 'bg-[#2a2a3d] text-[#8888a0] hover:text-[#e8e8f0]'
                    }`}
                  >
                    {cat.icon} {cat.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <div className="text-xs font-semibold text-[#8888a0] uppercase mb-2">Difficulty</div>
              <div className="flex gap-2">
                {['beginner', 'intermediate', 'advanced'].map((diff) => (
                  <button
                    key={diff}
                    onClick={() =>
                      setSelectedDifficulty(selectedDifficulty === diff ? null : diff)
                    }
                    className={`px-3 py-1.5 rounded-full text-xs font-medium capitalize transition-colors ${
                      selectedDifficulty === diff
                        ? diff === 'beginner'
                          ? 'bg-[#22c55e] text-white'
                          : diff === 'intermediate'
                          ? 'bg-[#f59e0b] text-white'
                          : 'bg-[#ef4444] text-white'
                        : 'bg-[#2a2a3d] text-[#8888a0] hover:text-[#e8e8f0]'
                    }`}
                  >
                    {diff}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Prompt List */}
      <div className="space-y-3">
        {filteredPrompts.length === 0 ? (
          <div className="text-center py-12">
            <BookOpen size={48} className="text-[#2a2a3d] mx-auto mb-4" />
            <p className="text-[#8888a0]">No prompts found matching your filters.</p>
            <button onClick={clearFilters} className="text-sm text-[#6366f1] hover:underline mt-2">
              Clear all filters
            </button>
          </div>
        ) : (
          filteredPrompts.map((prompt) => {
            const isExpanded = expandedPrompt === prompt.id;
            const isCopied = copiedId === prompt.id;
            const categoryInfo = CATEGORIES.find((c) => c.value === prompt.category);

            return (
              <div
                key={prompt.id}
                className={`rounded-xl border transition-all ${
                  isExpanded
                    ? 'bg-[#12121a] border-[#6366f1]/30'
                    : 'bg-[#12121a] border-[#2a2a3d] hover:border-[#6366f1]/20'
                }`}
              >
                {/* Header (always visible) */}
                <button
                  onClick={() => setExpandedPrompt(isExpanded ? null : prompt.id)}
                  className="w-full p-4 sm:p-5 flex items-start gap-3 text-left"
                >
                  <div className="text-xl flex-shrink-0 mt-0.5">{categoryInfo?.icon}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-semibold text-[#6366f1] uppercase">
                        {categoryInfo?.label}
                      </span>
                      {prompt.isFree && (
                        <span className="px-1.5 py-0.5 rounded-full bg-[#22c55e]/10 text-[#22c55e] text-[10px] font-semibold">
                          FREE
                        </span>
                      )}
                    </div>
                    <h3 className="font-semibold text-sm sm:text-base">{prompt.title}</h3>
                    <p className="text-xs sm:text-sm text-[#8888a0] mt-0.5 line-clamp-2">
                      {prompt.description}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                          prompt.difficulty === 'beginner'
                            ? 'bg-[#22c55e]/10 text-[#22c55e]'
                            : prompt.difficulty === 'intermediate'
                            ? 'bg-[#f59e0b]/10 text-[#f59e0b]'
                            : 'bg-[#ef4444]/10 text-[#ef4444]'
                        }`}
                      >
                        {prompt.difficulty}
                      </span>
                      {prompt.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded-full bg-[#2a2a3d] text-[#8888a0] text-[10px] hidden sm:inline"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex-shrink-0 text-[#8888a0]">
                    {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </div>
                </button>

                {/* Expanded Content */}
                {isExpanded && (
                  <div className="px-4 sm:px-5 pb-4 sm:pb-5 border-t border-[#2a2a3d] pt-4">
                    {/* The Prompt */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold text-[#8888a0] uppercase">
                          The Prompt
                        </span>
                        <Button
                          size="sm"
                          variant={isCopied ? 'secondary' : 'default'}
                          className="gap-1.5"
                          onClick={() => handleCopy(prompt)}
                        >
                          {isCopied ? (
                            <>
                              <Check size={14} /> Copied!
                            </>
                          ) : (
                            <>
                              <Copy size={14} /> Copy Prompt
                            </>
                          )}
                        </Button>
                      </div>
                      <div className="p-4 rounded-lg bg-[#0a0a0f] border border-[#2a2a3d] text-sm text-[#a0a0a8] whitespace-pre-wrap font-mono text-xs leading-relaxed max-h-96 overflow-y-auto">
                        {prompt.prompt}
                      </div>
                    </div>

                    {/* Expected Output */}
                    <div>
                      <span className="text-xs font-semibold text-[#8888a0] uppercase block mb-2">
                        Expected Output
                      </span>
                      <p className="text-sm text-[#a0a0a8]">{prompt.expectedOutput}</p>
                    </div>

                    {/* Tags */}
                    <div className="mt-4 flex flex-wrap gap-2">
                      {prompt.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 rounded-full bg-[#2a2a3d] text-[#8888a0] text-xs cursor-pointer hover:bg-[#6366f1]/10 hover:text-[#a5b4fc] transition"
                          onClick={() => {
                            setSearchQuery(tag);
                            setExpandedPrompt(null);
                          }}
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
