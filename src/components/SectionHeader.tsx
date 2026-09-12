import React from 'react';
import { ArrowLeft, Sparkles, Shield, ChevronRight } from 'lucide-react';
import { AppSection } from '../types';

interface SectionHeaderProps {
  currentSection: AppSection;
  title: string;
  subtitle: string;
  category: string;
  badge?: string;
  badgeColor?: 'cyan' | 'amber' | 'emerald' | 'purple' | 'slate';
  onNavigate: (section: AppSection) => void;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  currentSection,
  title,
  subtitle,
  category,
  badge,
  badgeColor = 'cyan',
  onNavigate,
}) => {
  const badgeClasses = {
    cyan: 'bg-cyan-950/80 text-cyan-300 border-cyan-700/80',
    amber: 'bg-amber-950/80 text-amber-300 border-amber-700/80',
    emerald: 'bg-emerald-950/80 text-emerald-300 border-emerald-700/80',
    purple: 'bg-purple-950/80 text-purple-300 border-purple-700/80',
    slate: 'bg-slate-900/80 text-slate-300 border-slate-700/80',
  }[badgeColor];

  const quickSections: { id: AppSection; label: string }[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'cloud-ops', label: 'Cloud & SRE' },
    { id: 'risk-tool', label: 'AI Risk Tool' },
    { id: 'services', label: 'Services' },
    { id: 'compliance', label: 'Compliance' },
    { id: 'company', label: 'Leadership' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <div className="pt-24 sm:pt-28 pb-8 sm:pb-12 bg-gradient-to-b from-[#0b0e17] via-[#07090e] to-[#07090e] border-b border-slate-800/80 relative overflow-hidden">
      {/* Subtle radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-48 bg-cyan-500/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
        {/* Breadcrumb Bar and Back Link */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-2 text-slate-400">
            <button
              type="button"
              onClick={() => onNavigate('overview')}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/80 transition-all cursor-pointer group"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-cyan-400 group-hover:-translate-x-0.5 transition-transform" />
              <span>Overview</span>
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-slate-300 font-medium">{category}</span>
          </div>

          {/* Quick jump pill bar */}
          <div className="hidden lg:flex items-center gap-1.5 p-1 rounded-xl bg-slate-950/80 border border-slate-800 text-[11px]">
            <span className="px-2 text-slate-500 font-mono text-[10px] uppercase">Jump:</span>
            {quickSections.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => onNavigate(s.id)}
                className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer font-sans ${
                  currentSection === s.id
                    ? 'bg-cyan-950 text-cyan-300 font-semibold border border-cyan-700/60 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Title and Summary */}
        <div className="max-w-3xl space-y-2">
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-cyan-400">
              {category}
            </span>
            {badge && (
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase font-semibold border ${badgeClasses}`}>
                {badge}
              </span>
            )}
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            {title}
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl font-normal">
            {subtitle}
          </p>
        </div>
      </div>
    </div>
  );
};
