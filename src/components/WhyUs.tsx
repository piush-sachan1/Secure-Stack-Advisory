import React from 'react';
import { DIFFERENTIATORS } from '../data/contentData';
import { Code2, Target, Cpu, Scale } from 'lucide-react';

export const WhyUs: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Code2':
        return <Code2 className="w-5 h-5 text-blue-400" />;
      case 'Target':
        return <Target className="w-5 h-5 text-emerald-400" />;
      case 'Cpu':
        return <Cpu className="w-5 h-5 text-sky-400" />;
      case 'Scale':
        return <Scale className="w-5 h-5 text-amber-400" />;
      default:
        return <Code2 className="w-5 h-5 text-blue-400" />;
    }
  };

  return (
    <section className="py-16 sm:py-24 bg-slate-950 text-slate-100 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-8 sm:mb-14">
          <div className="text-xs font-mono uppercase tracking-widest text-blue-400 font-semibold mb-2">
            Principled Differentiation
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white mb-2 sm:mb-3">
            Why Technical Teams Trust Vectorbound
          </h2>
          <p className="text-slate-400 text-xs sm:text-base leading-relaxed">
            We built this advisory because traditional cybersecurity consultancies deliver generic compliance reports while missing the critical exploit paths in modern cloud and AI stacks.
          </p>
        </div>

        {/* 4-column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {DIFFERENTIATORS.map((item, idx) => (
            <div
              key={idx}
              className="p-5 sm:p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center mb-4">
                  {getIcon(item.icon)}
                </div>

                <span className="text-[10px] font-mono uppercase text-blue-400 font-semibold tracking-wider block mb-1">
                  {item.highlight}
                </span>

                <h3 className="text-base font-bold text-white mb-2 leading-snug">
                  {item.title}
                </h3>

                <p className="text-xs text-slate-400 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 mt-6 border-t border-slate-800/80 text-[11px] font-mono text-slate-500">
                Advisory Principle #{idx + 1}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
