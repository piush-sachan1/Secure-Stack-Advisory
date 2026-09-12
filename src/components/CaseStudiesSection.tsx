import React, { useState } from 'react';
import { CASE_STUDIES } from '../data/contentData';
import { CaseStudy } from '../types';
import {
  TrendingUp,
  ShieldAlert,
  ArrowUpRight,
  Quote,
  Layers,
  Cpu,
  CheckCircle2,
  Lock,
  Building2,
  Target,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CaseStudiesSkeleton } from './ThemedSkeleton';

interface CaseStudiesSectionProps {
  onScheduleConsultation?: (topic: string) => void;
  isLoading?: boolean;
}

export const CaseStudiesSection: React.FC<CaseStudiesSectionProps> = ({
  onScheduleConsultation,
  isLoading = false,
}) => {
  const [selectedCaseStudyId, setSelectedCaseStudyId] = useState<string>(CASE_STUDIES[0].id);

  const activeStudy = CASE_STUDIES.find((c) => c.id === selectedCaseStudyId) || CASE_STUDIES[0];

  return (
    <section id="case-studies" className="py-16 sm:py-24 bg-[#07090e] text-slate-100 border-b border-slate-800 relative">
      {/* Background glow */}
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-cyan-500/5 blur-3xl pointer-events-none rounded-full" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-14 gap-4 sm:gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest text-cyan-400 bg-cyan-950/60 border border-cyan-800/80 mb-3 font-semibold">
              <TrendingUp className="w-3.5 h-3.5" />
              Verified Client Outcomes
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white">
              Enterprise Advisory Case Studies
            </h2>
            <p className="text-slate-400 text-xs sm:text-base mt-2 leading-relaxed">
              Measurable security improvements, unit-economics cost reclamations, and zero-downtime migrations delivered across high-scale software systems.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-slate-400">
              {CASE_STUDIES.length} Verified Engagements
            </span>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <CaseStudiesSkeleton />
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Tab Selector: Client Profiles */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 mb-8">
          {CASE_STUDIES.map((study) => {
            const isSelected = study.id === activeStudy.id;
            return (
              <button
                key={study.id}
                type="button"
                onClick={() => setSelectedCaseStudyId(study.id)}
                className={`p-4 sm:p-5 rounded-2xl text-left transition-all border cursor-pointer relative overflow-hidden flex flex-col justify-between ${
                  isSelected
                    ? 'bg-slate-900 border-cyan-500/60 shadow-lg shadow-cyan-950/30 ring-1 ring-cyan-500/30'
                    : 'bg-slate-950/60 hover:bg-slate-900/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                {isSelected && (
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
                )}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-slate-850 text-cyan-300 border border-slate-700 font-semibold">
                      {study.industry}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">
                      {study.clientTier}
                    </span>
                  </div>
                  <h3 className="text-xs sm:text-sm font-bold text-white line-clamp-2 leading-snug">
                    {study.headline}
                  </h3>
                </div>

                <div className="pt-3 mt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <span className="text-cyan-400 font-mono text-[11px] font-medium">
                    {study.outcomes[0].metric} {study.outcomes[0].label}
                  </span>
                  <ArrowUpRight
                    className={`w-3.5 h-3.5 transition-transform ${
                      isSelected ? 'text-cyan-400 translate-x-0.5 -translate-y-0.5' : 'text-slate-500'
                    }`}
                  />
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Case Study Detail Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStudy.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
            className="p-6 sm:p-10 rounded-3xl bg-slate-950/80 border border-slate-800/90 shadow-2xl relative overflow-hidden"
          >
            {/* Top Bar Info */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-6 sm:pb-8 border-b border-slate-800 gap-4">
              <div>
                <div className="flex items-center gap-2.5 flex-wrap mb-2">
                  <span className="px-2.5 py-1 rounded-md text-xs font-mono font-bold bg-cyan-950/90 text-cyan-300 border border-cyan-700/60">
                    {activeStudy.engagementScope}
                  </span>
                  <span className="text-xs text-slate-400 font-mono flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-slate-500" />
                    {activeStudy.clientTier} • {activeStudy.industry}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white tracking-tight leading-snug max-w-3xl">
                  {activeStudy.headline}
                </h3>
              </div>

              {onScheduleConsultation && (
                <button
                  type="button"
                  onClick={() => onScheduleConsultation(activeStudy.engagementScope)}
                  className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md shadow-cyan-500/20 shrink-0 cursor-pointer"
                >
                  <span>Replicate Architecture</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Core Metrics Bento Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 py-6 sm:py-8 border-b border-slate-800">
              {activeStudy.outcomes.map((metric, idx) => (
                <div
                  key={idx}
                  className="p-4 sm:p-6 rounded-2xl bg-slate-900/70 border border-slate-800 flex flex-col justify-between"
                >
                  <div>
                    <div className="text-2xl sm:text-4xl font-extrabold text-cyan-400 font-mono tracking-tight mb-1">
                      {metric.metric}
                    </div>
                    <div className="text-xs sm:text-sm font-semibold text-white">
                      {metric.label}
                    </div>
                  </div>
                  <p className="text-xs text-slate-400 mt-2.5 leading-relaxed">
                    {metric.detail}
                  </p>
                </div>
              ))}
            </div>

            {/* Problem & Solution Breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 pt-6 sm:pt-8 items-start">
              {/* Problem */}
              <div className="lg:col-span-6 space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold">
                  <ShieldAlert className="w-4 h-4" />
                  <span>The Critical Vulnerability & Threat Vector</span>
                </div>
                <div className="p-4 sm:p-5 rounded-2xl bg-amber-950/10 border border-amber-900/30 text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {activeStudy.problem}
                </div>
              </div>

              {/* Solution */}
              <div className="lg:col-span-6 space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>The Engineering Intervention & Verification</span>
                </div>
                <div className="p-4 sm:p-5 rounded-2xl bg-emerald-950/10 border border-emerald-900/30 text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {activeStudy.solution}
                </div>
              </div>
            </div>

            {/* Tech Stack Pills & Client Quote */}
            <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-slate-800 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div className="space-y-2">
                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                  Hardened Stack Components:
                </span>
                <div className="flex flex-wrap gap-2">
                  {activeStudy.techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-md text-xs font-mono bg-slate-900 text-slate-300 border border-slate-750"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {activeStudy.quote && (
                <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 max-w-xl flex items-start gap-3">
                  <Quote className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5 opacity-80" />
                  <div className="space-y-1">
                    <p className="text-xs text-slate-200 italic leading-relaxed">
                      "{activeStudy.quote.text}"
                    </p>
                    <div className="text-[11px] font-mono text-slate-400">
                      <strong className="text-white not-italic">{activeStudy.quote.author}</strong> — {activeStudy.quote.title}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
        </div>
      )}
    </section>
  );
};
