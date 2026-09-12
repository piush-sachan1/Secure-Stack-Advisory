import React from 'react';
import { PROCESS_STAGES } from '../data/contentData';
import { CheckCircle2, Clock, FileCheck } from 'lucide-react';

export const ProcessTimeline: React.FC = () => {
  return (
    <section id="process" className="py-16 sm:py-24 bg-slate-900 text-slate-100 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-8 sm:mb-14">
          <div className="text-xs font-mono uppercase tracking-widest text-blue-400 font-semibold mb-2">
            Standard Operating Model
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white mb-2 sm:mb-3">
            Six-Stage Engagement Lifecycle
          </h2>
          <p className="text-slate-400 text-xs sm:text-base leading-relaxed">
            Every technical engagement follows an audited, repeatable methodology designed to minimize production disruption while systematically mapping critical trust boundaries.
          </p>
        </div>

        {/* Desktop Horizontal Stepper */}
        <div className="hidden lg:grid grid-cols-6 gap-4 relative">
          {/* Connector line */}
          <div className="absolute top-7 left-6 right-6 h-0.5 bg-slate-800 -z-0" />

          {PROCESS_STAGES.map((stage) => (
            <div key={stage.stepNumber} className="relative z-10 flex flex-col justify-between">
              <div>
                {/* Number Badge */}
                <div className="w-12 h-12 rounded-xl bg-slate-950 border border-slate-700 flex items-center justify-center font-mono font-bold text-sm text-blue-400 mb-4 shadow-md">
                  0{stage.stepNumber}
                </div>

                <div className="text-[11px] font-mono text-emerald-400 flex items-center gap-1 mb-1">
                  <Clock className="w-3 h-3" />
                  {stage.duration}
                </div>

                <h3 className="text-sm font-bold text-white mb-2 leading-tight">
                  {stage.name}
                </h3>

                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  {stage.description}
                </p>
              </div>

              {/* Deliverable badge */}
              <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800 text-[11px] text-slate-300">
                <span className="font-mono text-[9px] uppercase text-slate-500 block mb-0.5">
                  Phase Output:
                </span>
                <span className="font-medium block leading-tight">
                  {stage.deliverable}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile / Tablet Vertical Stepper */}
        <div className="lg:hidden relative pl-6 border-l-2 border-slate-800 space-y-4 sm:space-y-6 ml-2 sm:ml-4">
          {PROCESS_STAGES.map((stage) => (
            <div
              key={stage.stepNumber}
              className="p-4 sm:p-5 rounded-xl bg-slate-950/80 border border-slate-800/90 space-y-2.5 sm:space-y-3 relative shadow-sm"
            >
              {/* Connector dot */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-5 w-3 h-3 rounded-full bg-blue-500 border-2 border-slate-900 ring-4 ring-slate-950" />

              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5 sm:gap-3">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-slate-900 border border-slate-700 flex items-center justify-center font-mono font-bold text-xs text-blue-400 shrink-0">
                    0{stage.stepNumber}
                  </div>
                  <h3 className="text-sm font-bold text-white leading-tight">
                    {stage.name}
                  </h3>
                </div>
                <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1 shrink-0">
                  <Clock className="w-3 h-3" />
                  {stage.duration}
                </span>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed">
                {stage.description}
              </p>

              <div className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 text-xs text-slate-300 flex items-start gap-2">
                <FileCheck className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                <div className="min-w-0">
                  <span className="text-[10px] font-mono uppercase text-slate-500 block">
                    Deliverable
                  </span>
                  <span className="break-words font-medium">{stage.deliverable}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
