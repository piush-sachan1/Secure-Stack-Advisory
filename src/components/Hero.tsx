import React from 'react';
import { ShieldCheck, ArrowRight, ChevronRight, Terminal, Lock, Check } from 'lucide-react';
import { TRUST_METRICS } from '../data/contentData';

interface HeroProps {
  onBookClick: () => void;
  onExploreServices: () => void;
  onLaunchAssessment: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onBookClick,
  onExploreServices,
  onLaunchAssessment,
}) => {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-[#07090e] text-slate-100 overflow-hidden border-b border-slate-800/80">
      {/* Subtle grid and radial gradient texture */}
      <div className="absolute inset-0 bg-cyber-radial pointer-events-none" />
      <div className="absolute inset-0 bg-cyber-grid opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Category Tagline Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-medium tracking-wider uppercase bg-cyan-950/70 border border-cyan-500/40 text-cyan-300 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>AWS · GCP · Azure · Agile DevOps · FinOps · AI Security</span>
          </div>

          {/* Confident Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white font-sans leading-[1.12]">
            We architect & defend the infrastructure you{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-teal-200 to-amber-300">
              actually shipped.
            </span>
          </h1>

          {/* One-Sentence Value Proposition */}
          <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-normal">
            Independent cloud, SRE & security advisory for engineering leaders. We streamline AWS, GCP & Azure environments, implement automated agile GitOps rollouts, cut cloud waste by 30%+ via FinOps, and threat-model modern AI systems.
          </p>

          {/* Dual CTAs + Assessment Teaser */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4">
            <button
              type="button"
              onClick={onBookClick}
              className="w-full sm:w-auto px-6 py-3.5 rounded-lg text-sm font-mono font-bold bg-gradient-to-r from-cyan-500 to-teal-400 hover:from-cyan-400 hover:to-teal-300 text-slate-950 shadow-lg shadow-cyan-500/25 border border-cyan-400 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <span>Book Architecture Review</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={onLaunchAssessment}
              className="w-full sm:w-auto px-6 py-3.5 rounded-lg text-sm font-mono font-semibold bg-slate-900/90 hover:bg-slate-800 text-slate-100 border border-slate-700 hover:border-cyan-500/50 flex items-center justify-center gap-2 transition-all cursor-pointer group"
            >
              <Terminal className="w-4 h-4 text-cyan-400 group-hover:text-cyan-300" />
              <span>Free AI Risk Snapshot</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>

            <button
              type="button"
              onClick={onExploreServices}
              className="w-full sm:w-auto px-5 py-3.5 rounded-lg text-sm font-medium text-slate-400 hover:text-white transition-colors cursor-pointer flex items-center justify-center"
            >
              Explore Hyperscaler Practices
            </button>
          </div>

          {/* Security Credentials Snippet */}
          <div className="flex items-center justify-center gap-6 pt-4 text-xs text-slate-400 font-mono">
            <span className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              Mutual NDA Enforced
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              24/7 Managed SRE
            </span>
            <span className="hidden sm:flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              Tri-Cloud Certified (AWS/GCP/Azure)
            </span>
          </div>
        </div>

        {/* 4-Stat Trust Bar */}
        <div className="mt-16 md:mt-20 pt-8 border-t border-slate-800/80">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {TRUST_METRICS.map((stat, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl bg-slate-900/40 border border-slate-800/90 hover:border-cyan-500/40 transition-all"
              >
                <div className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-xs font-semibold text-slate-200 uppercase font-sans tracking-wide">
                  {stat.label}
                </div>
                <div className="text-[11px] text-slate-400 mt-1 leading-snug">
                  {stat.detail}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
