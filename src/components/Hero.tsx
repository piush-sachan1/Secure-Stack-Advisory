import React from 'react';
import { ShieldCheck, ArrowRight, ChevronRight, Terminal, Lock, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';

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
  const { t } = useApp();

  const metrics = [
    {
      value: "14+",
      label: t.hero.metric1Label,
      detail: t.hero.metric1Detail,
    },
    {
      value: "240+",
      label: t.hero.metric2Label,
      detail: t.hero.metric2Detail,
    },
    {
      value: "100%",
      label: t.hero.metric3Label,
      detail: t.hero.metric3Detail,
    },
    {
      value: "AWS · GCP · Azure",
      label: t.hero.metric4Label,
      detail: t.hero.metric4Detail,
    },
  ];

  return (
    <section className="relative pt-24 pb-14 sm:pt-32 sm:pb-20 md:pt-40 md:pb-28 bg-[#07090e] text-slate-100 overflow-hidden border-b border-slate-800/80">
      {/* Subtle grid and radial gradient texture */}
      <div className="absolute inset-0 bg-cyber-radial pointer-events-none" />
      <div className="absolute inset-0 bg-cyber-grid opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8">
          {/* Category Tagline Pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-mono font-medium tracking-wider uppercase bg-cyan-950/70 border border-cyan-500/40 text-cyan-300 shadow-sm max-w-[95vw]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            <span className="hidden sm:inline">{t.hero.categoryPillDesktop}</span>
            <span className="sm:hidden truncate">{t.hero.categoryPillMobile}</span>
          </div>

          {/* Confident Headline */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white font-sans leading-[1.18] sm:leading-[1.12]">
            {t.hero.headlinePart1}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-teal-200 to-amber-300">
              {t.hero.headlineHighlight}
            </span>
          </h1>

          {/* One-Sentence Value Proposition */}
          <p className="text-sm sm:text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-normal">
            {t.hero.subtitle}
          </p>

          {/* Dual CTAs + Assessment Teaser */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full max-w-md sm:max-w-none mx-auto">
            <button
              type="button"
              onClick={onBookClick}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl text-xs sm:text-sm font-mono font-bold bg-gradient-to-r from-cyan-500 to-teal-400 hover:from-cyan-400 hover:to-teal-300 text-slate-950 shadow-lg shadow-cyan-500/25 border border-cyan-400 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <span>{t.hero.bookCta}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={onLaunchAssessment}
              className="w-full sm:w-auto px-5 sm:px-6 py-3.5 rounded-xl text-xs sm:text-sm font-mono font-semibold bg-slate-900/90 hover:bg-slate-800 text-slate-100 border border-slate-700 hover:border-cyan-500/50 flex items-center justify-center gap-2 transition-all cursor-pointer group"
            >
              <Terminal className="w-4 h-4 text-cyan-400 group-hover:text-cyan-300" />
              <span>{t.hero.riskCta}</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>

            <button
              type="button"
              onClick={onExploreServices}
              className="w-full sm:w-auto py-2.5 sm:py-3.5 px-4 text-xs sm:text-sm font-medium text-slate-400 hover:text-white transition-colors cursor-pointer flex items-center justify-center"
            >
              {t.hero.exploreCta}
            </button>
          </div>

          {/* Security Credentials Snippet */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 pt-2 text-[11px] sm:text-xs text-slate-400 font-mono">
            <span className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              {t.hero.badgeNda}
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              {t.hero.badgeSre}
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              {t.hero.badgeCert}
            </span>
          </div>
        </div>

        {/* 4-Stat Trust Bar */}
        <div className="mt-12 sm:mt-16 md:mt-20 pt-6 sm:pt-8 border-t border-slate-800/80">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {metrics.map((stat, idx) => (
              <div
                key={idx}
                className="p-3.5 sm:p-5 rounded-xl bg-slate-900/40 border border-slate-800/90 hover:border-cyan-500/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="text-xl sm:text-2xl md:text-3xl font-bold font-mono tracking-tight text-white mb-0.5 sm:mb-1">
                    {stat.value}
                  </div>
                  <div className="text-[11px] sm:text-xs font-semibold text-slate-200 uppercase font-sans tracking-wide">
                    {stat.label}
                  </div>
                </div>
                <div className="text-[10px] sm:text-[11px] text-slate-400 mt-1 sm:mt-1.5 leading-tight">
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
