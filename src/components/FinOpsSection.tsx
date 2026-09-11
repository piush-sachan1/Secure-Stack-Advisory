import React, { useState, useMemo } from 'react';
import { FINOPS_DATA } from '../data/contentData';
import {
  TrendingDown,
  DollarSign,
  PieChart,
  CheckCircle2,
  Layers,
  ArrowRight,
  ShieldAlert,
  Sliders,
  Sparkles,
  Calculator,
  RefreshCw
} from 'lucide-react';

interface FinOpsSectionProps {
  onOpenConsultation?: (topic?: string) => void;
}

export const FinOpsSection: React.FC<FinOpsSectionProps> = ({ onOpenConsultation }) => {
  // Simulator State
  const [monthlySpend, setMonthlySpend] = useState<number>(45000); // $45k default
  const [providers, setProviders] = useState<{ [key: string]: boolean }>({
    aws: true,
    gcp: false,
    azure: false,
  });
  const [hasKubernetes, setHasKubernetes] = useState<boolean>(true);
  const [currentCommitmentCoverage, setCurrentCommitmentCoverage] = useState<number>(30); // 30%

  // ROI Calculations based on FinOps benchmarks
  const calculations = useMemo(() => {
    const annualSpend = monthlySpend * 12;
    
    // Low commitment coverage = higher savings potential on commitments
    const commitmentSavingsRate = Math.max(0.12, (100 - currentCommitmentCoverage) * 0.0035);
    
    // Kubernetes rightsizing savings
    const k8sSavingsRate = hasKubernetes ? 0.14 : 0.04;
    
    // Idle waste reclamation (unattached volumes, idle EIPs, zombie test DBs)
    const idleWasteRate = 0.08;

    // Total realistic savings percentage: 22% - 38%
    const totalSavingsPercent = Math.min(0.42, commitmentSavingsRate + k8sSavingsRate + idleWasteRate);
    const estimatedAnnualSavings = Math.round(annualSpend * totalSavingsPercent);
    const estimatedMonthlySavings = Math.round(estimatedAnnualSavings / 12);
    const typicalPaybackWeeks = Math.max(2, Math.round(18000 / (estimatedMonthlySavings / 4)));

    return {
      annualSpend,
      estimatedAnnualSavings,
      estimatedMonthlySavings,
      totalSavingsPercent: Math.round(totalSavingsPercent * 100),
      commitmentSavings: Math.round(annualSpend * commitmentSavingsRate),
      k8sSavings: Math.round(annualSpend * k8sSavingsRate),
      idleSavings: Math.round(annualSpend * idleWasteRate),
      typicalPaybackWeeks,
    };
  }, [monthlySpend, currentCommitmentCoverage, hasKubernetes]);

  const toggleProvider = (key: string) => {
    setProviders((prev) => {
      const updated = { ...prev, [key]: !prev[key] };
      // Ensure at least one provider stays active
      if (!Object.values(updated).some(Boolean)) {
        return prev;
      }
      return updated;
    });
  };

  return (
    <section id="finops-optimization" className="py-24 bg-[#07090e] text-slate-200 relative border-t border-slate-800/80">
      {/* Subtle amber & cyan ambient glows */}
      <div className="absolute top-1/4 right-10 w-96 h-96 bg-amber-950/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-cyan-950/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/60 border border-amber-500/40 text-amber-400 text-xs font-mono font-medium tracking-wide mb-4">
            <TrendingDown className="w-3.5 h-3.5 text-amber-400" />
            <span>ENTERPRISE FINOPS & UNIT ECONOMICS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Stop Cloud Waste Across AWS, GCP & Azure
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
            Engineering teams move fast, but cloud bills quietly compound into your second-highest operational expense. We deploy automated waste-reclamation scrapers, orchestrate multi-year commitment arbitrage, and embed FinOps guardrails into GitOps pipelines to reduce cloud spend by <strong className="text-amber-400">25% to 40%</strong> without degrading system reliability.
          </p>
        </div>

        {/* Interactive FinOps ROI Calculator Sandbox */}
        <div className="mb-16 p-6 sm:p-10 rounded-2xl bg-gradient-to-br from-[#0c101a] to-[#070a10] border border-amber-500/30 shadow-2xl shadow-amber-950/20">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400 font-semibold mb-1">
                <Calculator className="w-4 h-4" />
                <span>Multi-Cloud Savings Simulator</span>
              </div>
              <h3 className="text-2xl font-bold text-white">Estimate Your Cloud Waste Reclamation</h3>
            </div>
            <div className="text-xs font-mono text-slate-400 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
              Calibrated on 240+ enterprise infrastructure audits
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pt-8">
            {/* Inputs Column (Left 6) */}
            <div className="lg:col-span-6 space-y-6">
              {/* Monthly Spend Slider */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor="finops-spend-slider" className="text-xs font-mono uppercase text-slate-300">Monthly Cloud Spend</label>
                  <span className="text-lg font-mono font-bold text-amber-400">
                    ${monthlySpend.toLocaleString()} / mo
                  </span>
                </div>
                <input
                  id="finops-spend-slider"
                  type="range"
                  min="5000"
                  max="300000"
                  step="5000"
                  value={monthlySpend}
                  onChange={(e) => setMonthlySpend(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
                />
                <div className="flex justify-between text-[11px] font-mono text-slate-500 mt-1">
                  <span>$5k/mo</span>
                  <span>$100k/mo</span>
                  <span>$300k+/mo</span>
                </div>
              </div>

              {/* Cloud Providers Selection */}
              <div>
                <label className="block text-xs font-mono uppercase text-slate-300 mb-2">
                  Target Cloud Environments
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { key: 'aws', label: 'AWS', color: '#FF9900' },
                    { key: 'gcp', label: 'Google Cloud', color: '#4285F4' },
                    { key: 'azure', label: 'Azure', color: '#0078D4' },
                  ].map((prov) => (
                    <button
                      key={prov.key}
                      onClick={() => toggleProvider(prov.key)}
                      className={`p-2.5 rounded-lg text-xs font-mono font-semibold transition-all border text-center cursor-pointer ${
                        providers[prov.key]
                          ? 'bg-slate-800 border-amber-500/50 text-white shadow-sm'
                          : 'bg-slate-900/50 border-slate-800 text-slate-500'
                      }`}
                    >
                      <span className="inline-block w-2 h-2 rounded-full mr-1.5" style={{ backgroundColor: prov.color }} />
                      {prov.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Commitment Coverage */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor="finops-commitment-slider" className="text-xs font-mono uppercase text-slate-300">
                    Current Savings Plans / RI / CUD Coverage
                  </label>
                  <span className="text-sm font-mono text-cyan-400 font-semibold">
                    {currentCommitmentCoverage}% Covered
                  </span>
                </div>
                <input
                  id="finops-commitment-slider"
                  type="range"
                  min="0"
                  max="90"
                  step="5"
                  value={currentCommitmentCoverage}
                  onChange={(e) => setCurrentCommitmentCoverage(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
                <p className="text-[11px] text-slate-400 mt-1">
                  Lower commitment coverage means higher immediate arbitrage savings from blended 1-yr / 3-yr portfolios.
                </p>
              </div>

              {/* Kubernetes Toggle */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/70 border border-slate-800">
                <div>
                  <div className="text-xs font-semibold text-white">Production Kubernetes Clusters</div>
                  <div className="text-[11px] text-slate-400">EKS, GKE, or AKS node pools with CPU/RAM allocation</div>
                </div>
                <button
                  type="button"
                  onClick={() => setHasKubernetes(!hasKubernetes)}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                    hasKubernetes ? 'bg-amber-500' : 'bg-slate-700'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-slate-950 shadow-lg ring-0 transition duration-200 ease-in-out ${
                      hasKubernetes ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Calculations & Output Column (Right 6) */}
            <div className="lg:col-span-6 rounded-xl bg-[#090d16] border border-slate-800 p-6 flex flex-col justify-between space-y-6">
              <div>
                <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">
                  Projected Annual Reclaimed Capital
                </div>
                <div className="flex items-baseline gap-3">
                  <div className="text-4xl sm:text-5xl font-extrabold text-amber-400 font-mono tracking-tight">
                    ${calculations.estimatedAnnualSavings.toLocaleString()}
                  </div>
                  <span className="text-xs font-mono font-semibold px-2 py-1 rounded bg-amber-950/80 border border-amber-800 text-amber-300">
                    ~{calculations.totalSavingsPercent}% Spend Cut
                  </span>
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  Approx. <strong className="text-white">${calculations.estimatedMonthlySavings.toLocaleString()}</strong> in recurring monthly run-rate reduction.
                </div>
              </div>

              {/* Savings Breakdown by Levers */}
              <div className="space-y-3 pt-4 border-t border-slate-800/80">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-300 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-cyan-400" />
                    Commitment Portfolio Arbitrage (RIs / CUDs / SPs):
                  </span>
                  <span className="font-mono font-semibold text-white">
                    ${calculations.commitmentSavings.toLocaleString()} / yr
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-300 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                    Kubernetes Compute & Memory Rightsizing:
                  </span>
                  <span className="font-mono font-semibold text-white">
                    ${calculations.k8sSavings.toLocaleString()} / yr
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-300 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    Orphaned Disks, Idle NATs & Zombie DB Scrapers:
                  </span>
                  <span className="font-mono font-semibold text-white">
                    ${calculations.idleSavings.toLocaleString()} / yr
                  </span>
                </div>
              </div>

              {/* Payback timeline indicator */}
              <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800 flex items-center justify-between">
                <div className="text-xs text-slate-400">
                  Estimated FinOps Audit Payback Period:
                </div>
                <div className="text-xs font-mono font-bold text-emerald-400">
                  &lt; {calculations.typicalPaybackWeeks} Weeks
                </div>
              </div>

              <button
                onClick={() =>
                  onOpenConsultation?.(
                    `FinOps Cost Optimization Audit (Estimated Spend: $${monthlySpend.toLocaleString()}/mo)`
                  )
                }
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-mono text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-amber-500/20"
              >
                <span>Lock In FinOps Optimization Audit</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* FinOps Foundation Lifecycle (Inform, Optimize, Operate) */}
        <div>
          <h3 className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-6">
            The 3-Phase Enterprise FinOps Lifecycle:
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {FINOPS_DATA.framework.phases.map((phase, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-amber-500/40 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono font-bold text-amber-400">{phase.phase}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                      Step 0{idx + 1}
                    </span>
                  </div>
                  <h4 className="text-lg font-bold text-white mb-1">{phase.tagline}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">{phase.description}</p>
                  
                  <div className="space-y-2 pt-2 border-t border-slate-800/60">
                    {phase.keyActivities.map((act, aIdx) => (
                      <div key={aIdx} className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                        <span>{act}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
