import React from 'react';
import { PROCESS_STAGES } from '../data/contentData';
import { CheckCircle2, Clock, FileCheck } from 'lucide-react';

export const ProcessTimeline: React.FC = () => {
  return (
    <section id="process" className="py-24 bg-slate-900 text-slate-100 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-14">
          <div className="text-xs font-mono uppercase tracking-widest text-blue-400 font-semibold mb-2">
            Standard Operating Model
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-3">
            Six-Stage Engagement Lifecycle
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
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
        <div className="lg:hidden space-y-6">
          {PROCESS_STAGES.map((stage) => (
            <div
              key={stage.stepNumber}
              className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-700 flex items-center justify-center font-mono font-bold text-xs text-blue-400">
                    0{stage.stepNumber}
                  </div>
                  <h3 className="text-sm font-bold text-white">
                    {stage.name}
                  </h3>
                </div>
                <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {stage.duration}
                </span>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed">
                {stage.description}
              </p>

              <div className="p-2.5 rounded bg-slate-900 border border-slate-800/80 text-xs text-slate-300 flex items-start gap-2">
                <FileCheck className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] font-mono uppercase text-slate-500 block">
                    Deliverable
                  </span>
                  <span>{stage.deliverable}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
