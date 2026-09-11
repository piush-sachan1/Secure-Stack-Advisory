import React from 'react';
import { PRACTICES } from '../data/contentData';
import { Cpu, ShieldCheck, Cloud, Award, ArrowUpRight, CheckCircle2, Terminal, TrendingDown, Layers } from 'lucide-react';

interface PracticesOverviewProps {
  onSelectPractice: (practiceId: string) => void;
}

export const PracticesOverview: React.FC<PracticesOverviewProps> = ({ onSelectPractice }) => {
  const getPracticeIcon = (iconName: string) => {
    switch (iconName) {
      case 'Cpu':
        return <Cpu className="w-5 h-5 text-cyan-400" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-teal-400" />;
      case 'Cloud':
        return <Cloud className="w-5 h-5 text-sky-400" />;
      case 'Award':
        return <Award className="w-5 h-5 text-amber-400" />;
      case 'Terminal':
        return <Terminal className="w-5 h-5 text-emerald-400" />;
      case 'TrendingDown':
        return <TrendingDown className="w-5 h-5 text-amber-400" />;
      default:
        return <Layers className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <section id="practices" className="py-20 bg-[#07090e] text-slate-100 border-b border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold mb-2">
              Core Technical Disciplines
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Seven Specialized Advisory Practices
            </h2>
          </div>
          <p className="text-slate-400 text-sm max-w-md">
            We intentionally restrict our advisory scope to hyperscalers, agile delivery pipelines, FinOps unit economics, and AI architectures where our principals have shipped production systems.
          </p>
        </div>

        {/* Practice Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRACTICES.map((practice) => (
            <div
              key={practice.id}
              className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/80 hover:border-cyan-500/40 transition-all flex flex-col justify-between group hover:shadow-xl hover:shadow-cyan-950/20"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800/80 flex items-center justify-center group-hover:border-cyan-500/40 transition-colors">
                    {getPracticeIcon(practice.icon)}
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono text-cyan-300 bg-cyan-950/60 border border-cyan-800/50">
                    {practice.serviceCount} Services
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                  {practice.title}
                </h3>

                <p className="text-xs font-medium text-slate-300 mb-3 leading-relaxed">
                  {practice.tagline}
                </p>

                <p className="text-xs text-slate-400 mb-6 leading-relaxed line-clamp-3">
                  {practice.description}
                </p>

                {/* Highlighted capabilities */}
                <div className="space-y-2 mb-6 pt-4 border-t border-slate-800/80">
                  {practice.highlightCapabilities.map((cap, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span className="truncate">{cap}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={() => onSelectPractice(practice.id)}
                className="w-full py-2.5 px-3 rounded-lg text-xs font-mono font-semibold text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/40 flex items-center justify-between transition-all cursor-pointer"
              >
                <span>View Practice Capabilities</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

