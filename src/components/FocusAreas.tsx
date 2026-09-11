import React from 'react';
import { FOCUS_AREAS } from '../data/contentData';
import { Check, ShieldAlert, Cpu, Cloud, ArrowRight, Terminal } from 'lucide-react';

interface FocusAreasProps {
  onLearnMoreAI: () => void;
  onLearnMoreCloud: () => void;
}

export const FocusAreas: React.FC<FocusAreasProps> = ({ onLearnMoreAI, onLearnMoreCloud }) => {
  const { aiSecurity, cloudSecurity } = FOCUS_AREAS;

  return (
    <section id="focus-areas" className="py-24 bg-[#07090e] text-slate-100 border-b border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        {/* Section Intro */}
        <div className="max-w-2xl">
          <div className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold mb-2">
            Engineering Deep Dives
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Specialized Focus Areas
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2">
            Modern threat actors exploit the friction points between probabilistic AI interfaces and deterministic cloud IAM policies.
          </p>
        </div>

        {/* Feature Block 1: AI Security */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono text-cyan-400 bg-cyan-950/60 border border-cyan-800">
              <Cpu className="w-3.5 h-3.5" />
              {aiSecurity.badge}
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {aiSecurity.title}
            </h3>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-sm text-slate-300 leading-relaxed">
              <strong className="text-slate-100 block mb-1 font-mono text-xs uppercase text-amber-400">
                The Engineering Problem:
              </strong>
              {aiSecurity.problem}
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={onLearnMoreAI}
                className="inline-flex items-center gap-2 text-xs font-mono uppercase font-semibold text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer group"
              >
                <span>Inspect AI Threat Model Deliverables</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 sm:p-8 space-y-5 shadow-xl">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
                  Adversarial Capabilities Checklist
                </span>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-900">
                  Defensive Controls
                </span>
              </div>

              <div className="space-y-4">
                {aiSecurity.capabilities.map((cap, idx) => (
                  <div key={idx} className="flex items-start gap-3.5">
                    <div className="w-6 h-6 rounded-md bg-cyan-950/60 border border-cyan-800 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 text-cyan-400" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white">
                        {cap.title}
                      </h4>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                        {cap.detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Feature Block 2: Cloud Security */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center pt-8 border-t border-slate-800/80">
          <div className="lg:col-span-6 lg:order-2 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono text-teal-400 bg-teal-950/60 border border-teal-900">
              <Cloud className="w-3.5 h-3.5" />
              {cloudSecurity.badge}
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {cloudSecurity.title}
            </h3>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-sm text-slate-300 leading-relaxed">
              <strong className="text-slate-100 block mb-1 font-mono text-xs uppercase text-amber-400">
                The Engineering Problem:
              </strong>
              {cloudSecurity.problem}
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={onLearnMoreCloud}
                className="inline-flex items-center gap-2 text-xs font-mono uppercase font-semibold text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer group"
              >
                <span>Inspect Cloud Architecture Deliverables</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 lg:order-1">
            <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 sm:p-8 space-y-5 shadow-xl">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
                  Infrastructure Hardening Checklist
                </span>
                <span className="text-xs font-mono text-sky-400 bg-sky-950/50 px-2 py-0.5 rounded border border-sky-900">
                  AWS · GCP · K8s
                </span>
              </div>

              <div className="space-y-4">
                {cloudSecurity.capabilities.map((cap, idx) => (
                  <div key={idx} className="flex items-start gap-3.5">
                    <div className="w-6 h-6 rounded-md bg-sky-950/60 border border-sky-800 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 text-sky-400" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white">
                        {cap.title}
                      </h4>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                        {cap.detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
