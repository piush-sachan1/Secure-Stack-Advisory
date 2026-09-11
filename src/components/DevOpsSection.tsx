import React, { useState } from 'react';
import { DEVOPS_AGILE_DATA } from '../data/contentData';
import {
  Terminal,
  GitBranch,
  GitPullRequest,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Zap,
  ShieldCheck,
  Activity,
  ArrowRight,
  Sparkles,
  Layers,
  Gauge
} from 'lucide-react';

interface DevOpsSectionProps {
  onOpenConsultation?: (topic?: string) => void;
}

export const DevOpsSection: React.FC<DevOpsSectionProps> = ({ onOpenConsultation }) => {
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const activeStage = DEVOPS_AGILE_DATA[activeStageIndex];

  // Interactive Canary Simulation State
  const [trafficPercent, setTrafficPercent] = useState(10);
  const [isSimulatingRollout, setIsSimulatingRollout] = useState(false);
  const [simStatus, setSimStatus] = useState<'healthy' | 'warning' | 'rollback'>('healthy');

  const handleSimulateStep = (target: number) => {
    setIsSimulatingRollout(true);
    setTrafficPercent(target);
    if (target > 50) {
      setSimStatus('healthy');
    }
    setTimeout(() => {
      setIsSimulatingRollout(false);
    }, 400);
  };

  const handleTriggerMockAnomaly = () => {
    setSimStatus('warning');
    setTimeout(() => {
      setSimStatus('rollback');
      setTrafficPercent(0);
    }, 900);
  };

  return (
    <section id="devops-support" className="py-24 bg-[#090c14] text-slate-200 relative border-t border-slate-800/80">
      {/* Subtle ambient light */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-cyan-950/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-teal-950/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-medium tracking-wide mb-4">
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            <span>AGILE DEVOPS & CONTINUOUS DELIVERY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Deploy Daily with Zero-Downtime Progressive Delivery
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
            Replace painful weekend maintenance windows with automated, continuous releases. We engineer modern GitOps delivery pipelines enforcing trunk-based development, ephemeral PR preview environments, and automated canary rollbacks verified against real-time SLO metrics.
          </p>
        </div>

        {/* DORA Elite Benchmarks Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
            <div className="text-xs font-mono uppercase text-slate-400">Deployment Frequency</div>
            <div className="text-2xl font-bold text-cyan-400 mt-1">On-Demand</div>
            <div className="text-xs text-slate-400 mt-0.5">Multiple automated deploys / day</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
            <div className="text-xs font-mono uppercase text-slate-400">Lead Time for Changes</div>
            <div className="text-2xl font-bold text-emerald-400 mt-1">&lt; 30 Mins</div>
            <div className="text-xs text-slate-400 mt-0.5">From trunk commit to production</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
            <div className="text-xs font-mono uppercase text-slate-400">Change Failure Rate</div>
            <div className="text-2xl font-bold text-amber-400 mt-1">&lt; 0.5%</div>
            <div className="text-xs text-slate-400 mt-0.5">Caught prior to full promotion</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
            <div className="text-xs font-mono uppercase text-slate-400">Mean Time to Restore (MTTR)</div>
            <div className="text-2xl font-bold text-teal-400 mt-1">&lt; 15 Mins</div>
            <div className="text-xs text-slate-400 mt-0.5">Automated metric rollback</div>
          </div>
        </div>

        {/* Interactive Agile Pipeline Flow */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Stage Selector (Left 5 Cols) */}
          <div className="lg:col-span-5 space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
              Agile Deployment Architecture Stages:
            </h3>
            {DEVOPS_AGILE_DATA.map((stage, idx) => {
              const isActive = activeStageIndex === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveStageIndex(idx)}
                  className={`w-full text-left p-4 rounded-xl transition-all border cursor-pointer ${
                    isActive
                      ? 'bg-slate-900 border-cyan-500/50 shadow-lg shadow-cyan-950/30'
                      : 'bg-[#070a10] border-slate-800/80 hover:border-slate-700 text-slate-400'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-mono font-semibold text-cyan-400">{stage.stage}</span>
                    {isActive && <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />}
                  </div>
                  <div className={`text-sm font-bold ${isActive ? 'text-white' : 'text-slate-300'}`}>
                    {stage.title}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Stage Deep-Dive + Simulator (Right 7 Cols) */}
          <div className="lg:col-span-7 rounded-2xl bg-gradient-to-b from-slate-900 to-[#070a10] border border-slate-800 p-6 sm:p-8 space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest mb-1">
                <span>Selected Architecture Pattern</span>
              </div>
              <h4 className="text-xl font-bold text-white">{activeStage.title}</h4>
              <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                {activeStage.agilePattern}
              </p>
            </div>

            {/* Tooling Tags */}
            <div>
              <div className="text-xs font-mono uppercase text-slate-400 mb-2">Production Tooling Fabric:</div>
              <div className="flex flex-wrap gap-2">
                {activeStage.tooling.map((tool, tIdx) => (
                  <span
                    key={tIdx}
                    className="text-xs font-mono font-medium px-3 py-1 rounded-lg bg-cyan-950/40 border border-cyan-800/50 text-cyan-300"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* Business Outcome vs Failure Guardrail */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-[#090e17] border border-slate-800/90">
                <div className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold mb-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Agile Business Outcome</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{activeStage.businessOutcome}</p>
              </div>

              <div className="p-4 rounded-xl bg-[#090e17] border border-slate-800/90">
                <div className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold mb-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Failure Guardrail</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{activeStage.failureGuardrail}</p>
              </div>
            </div>

            {/* Interactive Live Progressive Delivery Simulator */}
            <div className="p-5 rounded-xl bg-[#080d16] border border-cyan-500/20 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs font-mono font-bold uppercase text-white tracking-wide">
                    Live Canary Traffic Routing Sandbox
                  </span>
                </div>
                <span
                  className={`text-xs font-mono px-2 py-0.5 rounded border ${
                    simStatus === 'healthy'
                      ? 'bg-emerald-950/60 border-emerald-800 text-emerald-300'
                      : simStatus === 'warning'
                      ? 'bg-amber-950/60 border-amber-800 text-amber-300'
                      : 'bg-rose-950/60 border-rose-800 text-rose-300'
                  }`}
                >
                  {simStatus === 'healthy' ? 'SLO GREEN (0.01% ERR)' : simStatus === 'warning' ? 'HIGH LATENCY DETECTED' : 'AUTO-ROLLBACK TRIGGERED'}
                </span>
              </div>

              {/* Progress bar */}
              <div>
                <div className="flex justify-between text-xs font-mono text-slate-400 mb-1.5">
                  <span>Stable Baseline: {100 - trafficPercent}%</span>
                  <span className="text-cyan-400 font-bold">Canary Target: {trafficPercent}%</span>
                </div>
                <div className="w-full h-3 rounded-full bg-slate-800 overflow-hidden flex">
                  <div
                    className="h-full bg-slate-600 transition-all duration-500"
                    style={{ width: `${100 - trafficPercent}%` }}
                  />
                  <div
                    className={`h-full transition-all duration-500 ${
                      simStatus === 'rollback' ? 'bg-rose-500' : 'bg-cyan-400'
                    }`}
                    style={{ width: `${trafficPercent}%` }}
                  />
                </div>
              </div>

              {/* Action Buttons for Simulator */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <button
                  onClick={() => handleSimulateStep(10)}
                  disabled={isSimulatingRollout}
                  className="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-xs font-mono text-slate-300 transition-colors cursor-pointer"
                >
                  Canary 10%
                </button>
                <button
                  onClick={() => handleSimulateStep(30)}
                  disabled={isSimulatingRollout}
                  className="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-xs font-mono text-slate-300 transition-colors cursor-pointer"
                >
                  Canary 30%
                </button>
                <button
                  onClick={() => handleSimulateStep(100)}
                  disabled={isSimulatingRollout}
                  className="px-3 py-1.5 rounded bg-cyan-950 hover:bg-cyan-900 border border-cyan-800 text-xs font-mono text-cyan-300 transition-colors cursor-pointer"
                >
                  Full 100% Promotion
                </button>
                <button
                  onClick={handleTriggerMockAnomaly}
                  className="px-3 py-1.5 rounded bg-rose-950/60 hover:bg-rose-900/60 border border-rose-800/80 text-xs font-mono text-rose-300 ml-auto transition-colors cursor-pointer"
                  title="Simulate upstream error spike to watch instant automated rollback"
                >
                  Simulate Anomaly
                </button>
              </div>
            </div>

            {/* Bottom Consultation CTA */}
            <div className="pt-2 flex items-center justify-between">
              <span className="text-xs text-slate-400">
                Want to migrate your team to trunk-based GitOps with zero customer downtime?
              </span>
              <button
                onClick={() => onOpenConsultation?.('Agile DevOps & CI/CD Modernization')}
                className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer"
              >
                <span>Request DevOps Audit</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
