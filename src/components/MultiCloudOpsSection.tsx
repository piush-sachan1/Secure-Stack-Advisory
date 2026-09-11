import React, { useState } from 'react';
import { CLOUD_PLATFORMS_DATA } from '../data/contentData';
import {
  Cloud,
  Server,
  ShieldCheck,
  Clock,
  Zap,
  Activity,
  CheckCircle2,
  Cpu,
  Layers,
  TrendingDown,
  AlertOctagon,
  ArrowRight,
  Terminal,
  ExternalLink
} from 'lucide-react';

interface MultiCloudOpsSectionProps {
  onSelectPractice?: (practiceId: string) => void;
  onOpenConsultation?: (defaultTopic?: string) => void;
}

export const MultiCloudOpsSection: React.FC<MultiCloudOpsSectionProps> = ({
  onSelectPractice,
  onOpenConsultation,
}) => {
  const [selectedCloud, setSelectedCloud] = useState<'aws' | 'gcp' | 'azure'>('aws');

  const currentPlatform = CLOUD_PLATFORMS_DATA.find((p) => p.id === selectedCloud) || CLOUD_PLATFORMS_DATA[0];

  return (
    <section id="multi-cloud-ops" className="py-24 bg-[#07090e] text-slate-200 relative border-t border-slate-800/80">
      {/* Ambient background glow */}
      <div className="absolute inset-0 bg-cyber-grid opacity-30 pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-900/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-1/4 w-96 h-96 bg-amber-900/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-medium tracking-wide mb-4">
            <Cloud className="w-3.5 h-3.5 text-cyan-400" />
            <span>HYPERSCALER PLATFORM ENGINEERING</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Multi-Cloud Infrastructure & 24/7 Managed SRE Operations
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
            Eliminate operational drift across <strong className="text-white">AWS</strong>, <strong className="text-white">GCP</strong>, and <strong className="text-white">Azure</strong>. We design resilient landing zones, orchestrate keyless zero-trust IAM fabrics, and provide round-the-clock 24/7 SRE monitoring with guaranteed 15-minute Sev-1 escalation SLAs.
          </p>
        </div>

        {/* Global 24/7 SRE Command Banner */}
        <div className="mb-10 p-6 rounded-2xl bg-gradient-to-r from-slate-900/90 via-[#0e131f] to-slate-900/90 border border-cyan-500/30 shadow-xl shadow-cyan-950/20 grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
          <div className="flex items-center gap-3">
            <div className="relative flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500" />
            </div>
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold">
                Active 24/7/365 SRE NOC
              </div>
              <div className="text-sm font-semibold text-white">Global Follow-The-Sun</div>
            </div>
          </div>

          <div className="flex items-center gap-3 border-t md:border-t-0 md:border-l border-slate-800 pt-4 md:pt-0 md:pl-6">
            <Clock className="w-5 h-5 text-cyan-400 shrink-0" />
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-slate-400">Response SLA</div>
              <div className="text-sm font-bold text-white">&lt; 15 Mins (Sev-1)</div>
            </div>
          </div>

          <div className="flex items-center gap-3 border-t md:border-t-0 md:border-l border-slate-800 pt-4 md:pt-0 md:pl-6">
            <Activity className="w-5 h-5 text-amber-400 shrink-0" />
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-slate-400">Synthetic Probing</div>
              <div className="text-sm font-bold text-white">Every 60 Seconds</div>
            </div>
          </div>

          <div className="flex justify-start md:justify-end border-t md:border-t-0 md:border-l border-slate-800 pt-4 md:pt-0 md:pl-6">
            <button
              onClick={() => onOpenConsultation?.('Multi-Cloud 24/7 Managed Operations')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono text-xs font-bold transition-colors cursor-pointer shadow-lg shadow-cyan-500/20"
            >
              <span>Scope 24/7 Operations</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Cloud Platform Switcher Tabs */}
        <div className="flex flex-wrap gap-2 p-1.5 rounded-xl bg-slate-900/80 border border-slate-800/80 mb-8 max-w-fit">
          <button
            onClick={() => setSelectedCloud('aws')}
            className={`flex items-center gap-2.5 px-5 py-2.5 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer ${
              selectedCloud === 'aws'
                ? 'bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-400 border border-amber-500/40 shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF9900]" />
            <span>AWS Infrastructure</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">Control Tower</span>
          </button>

          <button
            onClick={() => setSelectedCloud('gcp')}
            className={`flex items-center gap-2.5 px-5 py-2.5 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer ${
              selectedCloud === 'gcp'
                ? 'bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#4285F4]" />
            <span>Google Cloud (GCP)</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">Workload Identity</span>
          </button>

          <button
            onClick={() => setSelectedCloud('azure')}
            className={`flex items-center gap-2.5 px-5 py-2.5 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer ${
              selectedCloud === 'azure'
                ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400 border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#0078D4]" />
            <span>Microsoft Azure</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">Entra PIM & CAF</span>
          </button>
        </div>

        {/* Selected Cloud Detail Card */}
        <div className="rounded-2xl bg-gradient-to-b from-[#0b0f19] to-[#07090e] border border-slate-800/90 p-6 sm:p-8 space-y-8">
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800/80">
            <div>
              <div className="flex items-center gap-3">
                <h3 className="text-2xl font-bold text-white">{currentPlatform.name}</h3>
                <span className="text-xs font-mono font-medium px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-800/60 text-cyan-300">
                  {currentPlatform.badge}
                </span>
              </div>
              <p className="mt-1 text-sm text-slate-300">{currentPlatform.tagline}</p>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-slate-400">Terraform / OpenTofu native</span>
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400" />
            </div>
          </div>

          {/* Architecture Highlights Grid */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              <span>Production Architecture & Sovereign Environment Controls</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentPlatform.architectureHighlights.map((arch, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-cyan-500/40 transition-colors"
                >
                  <h5 className="text-base font-semibold text-white mb-2">{arch.title}</h5>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">{arch.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {arch.services.map((svc, sIdx) => (
                      <span
                        key={sIdx}
                        className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700/60"
                      >
                        {svc}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 24/7 Operations & FinOps Dual Column */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-4 border-t border-slate-800/80">
            {/* 24/7 Support Column */}
            <div className="p-5 rounded-xl bg-[#090d16] border border-slate-800">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold mb-3">
                <Activity className="w-4 h-4" />
                <span>24/7 Dedicated SRE Support & Escalation</span>
              </div>
              <div className="space-y-3">
                {currentPlatform.support247Capabilities.map((cap, cIdx) => (
                  <div key={cIdx} className="p-3 rounded-lg bg-slate-900/60 border border-slate-800/70">
                    <div className="flex items-center justify-between text-xs font-medium text-white mb-1">
                      <span>{cap.title}</span>
                      <span className="font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-900/60 text-[10px]">
                        {cap.sla}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300">{cap.details}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* FinOps Controls Column */}
            <div className="p-5 rounded-xl bg-[#090d16] border border-slate-800">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold mb-3">
                <TrendingDown className="w-4 h-4" />
                <span>Platform FinOps & Automated Cost Optimization</span>
              </div>
              <div className="space-y-3">
                {currentPlatform.finOpsControls.map((fin, fIdx) => (
                  <div key={fIdx} className="p-3 rounded-lg bg-slate-900/60 border border-slate-800/70">
                    <div className="flex items-center justify-between text-xs font-medium text-white mb-1">
                      <span>{fin.mechanism}</span>
                      <span className="font-mono text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-900/60 text-[10px]">
                        {fin.savingsPotential}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300">{fin.automation}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Action strip */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-slate-800 text-xs">
            <div className="text-slate-400">
              Need a multi-cloud hybrid architecture spanning AWS + GCP or Azure? We architect unified Workload Identity trust boundaries.
            </div>
            <button
              onClick={() => onOpenConsultation?.(`Multi-Cloud ${currentPlatform.name} Architecture Review`)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-mono transition-colors cursor-pointer shrink-0 border border-slate-700"
            >
              <span>Schedule {currentPlatform.name} Architecture Review</span>
              <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
