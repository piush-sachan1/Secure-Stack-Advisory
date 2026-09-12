import React, { useState } from 'react';
import { HelpCircle, ChevronDown, Sparkles, MessageSquare, Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export interface ServiceFAQItem {
  question: string;
  answer: string;
}

interface ServiceFAQProps {
  faqList: ServiceFAQItem[];
  serviceTitle?: string;
  onBookConsultation?: (topic?: string) => void;
}

export const ServiceFAQ: React.FC<ServiceFAQProps> = ({
  faqList,
  serviceTitle,
  onBookConsultation,
}) => {
  // Track open accordion indices. Default: first item open for immediate context
  const [openIndices, setOpenIndices] = useState<number[]>([0]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  if (!faqList || faqList.length === 0) return null;

  const filteredFaqs = faqList.filter((item) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      item.question.toLowerCase().includes(q) ||
      item.answer.toLowerCase().includes(q)
    );
  });

  const toggleFaq = (originalIndex: number) => {
    setOpenIndices((prev) =>
      prev.includes(originalIndex)
        ? prev.filter((i) => i !== originalIndex)
        : [...prev, originalIndex]
    );
  };

  const toggleAllFaqs = () => {
    if (openIndices.length === faqList.length) {
      setOpenIndices([]);
    } else {
      setOpenIndices(faqList.map((_, i) => i));
    }
  };

  return (
    <div className="space-y-4 rounded-2xl bg-slate-950/60 border border-slate-800/90 p-4 sm:p-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800/80">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-cyan-950/80 border border-cyan-800/70 flex items-center justify-center shrink-0">
            <HelpCircle className="w-4 h-4 text-cyan-400" />
          </div>
          <div>
            <h4 className="text-sm sm:text-base font-bold text-white tracking-tight flex items-center gap-2">
              <span>Frequently Asked Questions & Scoping Rules</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-cyan-950/70 text-cyan-300 border border-cyan-800/60">
                {faqList.length} Items
              </span>
            </h4>
            <p className="text-xs text-slate-400 mt-0.5">
              Key technical scoping parameters and engagement expectations
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={toggleAllFaqs}
            className="px-3 py-1.5 rounded-lg text-xs font-mono font-medium text-cyan-400 hover:text-cyan-300 bg-cyan-950/40 hover:bg-cyan-950/70 border border-cyan-800/50 transition-all cursor-pointer"
          >
            {openIndices.length === faqList.length ? 'Collapse All' : 'Expand All'}
          </button>
        </div>
      </div>

      {/* Optional Search filter if FAQ count > 2 */}
      {faqList.length > 2 && (
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search questions or keywords..."
            className="w-full pl-9 pr-8 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 font-mono transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 p-0.5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      )}

      {/* Accordion List */}
      <div className="space-y-2.5">
        {filteredFaqs.length === 0 ? (
          <div className="p-4 text-center rounded-xl bg-slate-900/40 border border-slate-800 text-xs text-slate-400 font-mono">
            No questions match "{searchQuery}". Try a different term.
          </div>
        ) : (
          filteredFaqs.map((item) => {
            const originalIndex = faqList.findIndex((f) => f.question === item.question);
            const isOpen = openIndices.includes(originalIndex);

            return (
              <div
                key={originalIndex}
                className={`rounded-xl border transition-all overflow-hidden ${
                  isOpen
                    ? 'bg-slate-900/90 border-cyan-500/40 shadow-md shadow-cyan-950/20'
                    : 'bg-slate-900/50 hover:bg-slate-900/80 border-slate-800/90'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(originalIndex)}
                  aria-expanded={isOpen}
                  className="w-full p-3.5 sm:p-4 text-left flex items-center justify-between gap-3 cursor-pointer group"
                >
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-md bg-slate-950 border border-slate-800 flex items-center justify-center font-mono text-[10px] font-bold text-cyan-400 shrink-0 mt-0.5">
                      Q{originalIndex + 1}
                    </span>
                    <h5 className="text-xs sm:text-sm font-semibold text-white group-hover:text-cyan-300 transition-colors leading-snug">
                      {item.question}
                    </h5>
                  </div>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="shrink-0 text-slate-400 group-hover:text-cyan-400"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2, ease: 'easeInOut' }}
                    >
                      <div className="px-4 pb-4 pt-1 text-xs text-slate-300 leading-relaxed border-t border-slate-800/70 pl-11">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })
        )}
      </div>

      {/* Helpful Footer CTA inside FAQ block */}
      {onBookConsultation && (
        <div className="p-3.5 rounded-xl bg-cyan-950/30 border border-cyan-900/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-300">
            <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>Have custom architectural or compliance constraints not listed above?</span>
          </div>
          <button
            type="button"
            onClick={() => onBookConsultation(serviceTitle ? `FAQ Consultation for ${serviceTitle}` : 'Custom Scoping Consultation')}
            className="px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold font-mono text-xs flex items-center gap-1.5 transition-all shrink-0 cursor-pointer shadow-sm"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Ask a Lead Architect</span>
          </button>
        </div>
      )}
    </div>
  );
};
