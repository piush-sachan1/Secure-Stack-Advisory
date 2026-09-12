import React, { useState } from 'react';
import { 
  Cloud, 
  Terminal, 
  ShieldCheck, 
  Cpu, 
  Lock, 
  ArrowRight, 
  Activity, 
  TrendingDown, 
  Layers, 
  Users, 
  Sparkles, 
  CheckCircle2, 
  Server,
  Zap,
  BarChart3,
  ExternalLink,
  ChevronRight,
  ShieldAlert
} from 'lucide-react';
import { AppSection } from '../types';
import { useApp } from '../context/AppContext';
import { RiskGauge } from './RiskGauge';

interface ExecutiveGatewayProps {
  onNavigate: (section: AppSection) => void;
  onSelectPractice?: (practiceId: string) => void;
}

export const ExecutiveGateway: React.FC<ExecutiveGatewayProps> = ({ onNavigate, onSelectPractice }) => {
  const { t } = useApp();
  const [sampleScore, setSampleScore] = useState<number>(68);

  const portals = [
    {
      id: 'cloud-ops' as AppSection,
      category: 'Cloud Engineering',
      title: 'Multi-Cloud & 24/7 SRE Operations',
      tagline: 'AWS, GCP, Azure landing zones, hardened Kubernetes, and guaranteed 15-minute SLA managed NOC.',
      badge: 'Tier-3 24/7 SRE',
      badgeColor: 'cyan',
      stats: '99.99% Uptime SLA',
      icon: Cloud,
      gradient: 'from-cyan-500/20 via-slate-900 to-slate-950',
      borderHover: 'hover:border-cyan-500/60',
      actionText: 'Explore Cloud & SRE NOC',
    },
    {
      id: 'risk-tool' as AppSection,
      category: 'Interactive Intelligence',
      title: 'Free AI Security Risk Snapshot',
      tagline: 'Run live architecture threat modeling powered by Gemini 2.5 with dynamic D3 circular visualization.',
      badge: 'Gemini 2.5 Live',
      badgeColor: 'purple',
      stats: 'Instant 90s Assessment',
      icon: Terminal,
      gradient: 'from-purple-500/20 via-slate-900 to-slate-950',
      borderHover: 'hover:border-purple-500/60',
      actionText: 'Launch AI Risk Tool',
      highlight: true,
    },
    {
      id: 'services' as AppSection,
      category: 'Advisory Practices',
      title: '8 Specialized Practice Areas',
      tagline: 'Fixed-scope consulting spanning AI red teaming, cloud architecture, FinOps, and DevSecOps pipelines.',
      badge: 'Zero Vendor Kickbacks',
      badgeColor: 'amber',
      stats: '8 Scoped Offerings',
      icon: Layers,
      gradient: 'from-amber-500/20 via-slate-900 to-slate-950',
      borderHover: 'hover:border-amber-500/60',
      actionText: 'Browse Service Catalog',
    },
    {
      id: 'compliance' as AppSection,
      category: 'Trust & Governance',
      title: 'SOC 2 & ISO 27001 Readiness Matrix',
      tagline: 'Continuous automated evidence collection, control mapping, and auditor-ready policy generation.',
      badge: '100% Audit Pass',
      badgeColor: 'emerald',
      stats: 'SOC 2 · ISO · HIPAA',
      icon: ShieldCheck,
      gradient: 'from-emerald-500/20 via-slate-900 to-slate-950',
      borderHover: 'hover:border-emerald-500/60',
      actionText: 'View Compliance Tracker',
    },
    {
      id: 'cloud-ops' as AppSection,
      category: 'Financial Optimization',
      title: 'FinOps Multi-Cloud Cost Reclamation',
      tagline: 'Algorithmic waste reduction across compute, storage, and cross-AZ egress with interactive ROI modeling.',
      badge: 'Avg 28% Reclaimed',
      badgeColor: 'cyan',
      stats: '$2.4M+ Recovered',
      icon: TrendingDown,
      gradient: 'from-teal-500/20 via-slate-900 to-slate-950',
      borderHover: 'hover:border-teal-500/60',
      actionText: 'Open FinOps Sandbox',
    },
    {
      id: 'company' as AppSection,
      category: 'Advisory Leadership',
      title: 'Senior Principals & Operating Model',
      tagline: 'Former FAANG, hyperscaler, and defense engineers adhering to our 6-stage battle-tested methodology.',
      badge: 'Ex-FAANG Team',
      badgeColor: 'slate',
      stats: '14+ Yrs Experience',
      icon: Users,
      gradient: 'from-blue-500/20 via-slate-900 to-slate-950',
      borderHover: 'hover:border-blue-500/60',
      actionText: 'Meet Principal Consultants',
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#07090e] text-slate-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* World-Class Live Telemetry Bar */}
        <div className="p-3 sm:p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-950/80 text-emerald-400 border border-emerald-800/80">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>SYSTEMS NOMINAL</span>
            </span>
            <span className="text-slate-400 hidden sm:inline">|</span>
            <span className="text-slate-300">
              AWS: <span className="text-emerald-400">99.998%</span>
            </span>
            <span className="text-slate-300">
              GCP: <span className="text-emerald-400">100%</span>
            </span>
            <span className="text-slate-300">
              Azure: <span className="text-emerald-400">99.995%</span>
            </span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <span className="hidden md:inline">SRE NOC SLA: <strong className="text-white font-mono">&lt; 15 min</strong></span>
            <span className="hidden md:inline">Threat Feeds: <strong className="text-cyan-400 font-mono">LIVE MITRE v14</strong></span>
            <button
              type="button"
              onClick={() => onNavigate('contact')}
              className="text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1 cursor-pointer font-semibold"
            >
              <span>Emergency Wire</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4 border-b border-slate-800/80">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase bg-cyan-950 text-cyan-300 border border-cyan-800 font-semibold">
                Advisory Architecture
              </span>
              <span className="text-xs text-slate-400 font-mono">Curated Modular Sections</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Enterprise Practice Portals
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Explore our dedicated practice centers. Every module includes deep architectural specs, 
              interactive simulators, and verifiable deliverables.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-slate-400">Select an area to explore:</span>
          </div>
        </div>

        {/* 6-Card Bento Portal Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portals.map((portal, idx) => {
            const Icon = portal.icon;
            return (
              <div
                key={idx}
                onClick={() => onNavigate(portal.id)}
                className={`group p-6 sm:p-7 rounded-2xl bg-gradient-to-b ${portal.gradient} border border-slate-800 ${portal.borderHover} transition-all duration-300 flex flex-col justify-between space-y-6 cursor-pointer relative overflow-hidden shadow-xl hover:-translate-y-1`}
              >
                {portal.highlight && (
                  <div className="absolute top-0 right-0 px-3 py-1 bg-gradient-to-l from-purple-500 to-indigo-600 text-white text-[10px] font-mono font-bold uppercase rounded-bl-xl tracking-wider shadow-md">
                    Featured Tool
                  </div>
                )}

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-slate-900/90 border border-slate-700/80 flex items-center justify-center text-cyan-400 group-hover:scale-110 group-hover:text-white transition-all shadow-md">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-slate-900/80 text-slate-300 border border-slate-700">
                      {portal.stats}
                    </span>
                  </div>

                  <div>
                    <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold mb-1">
                      {portal.category}
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {portal.title}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {portal.tagline}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono font-semibold text-slate-300 group-hover:text-cyan-300">
                  <span>{portal.actionText}</span>
                  <ArrowRight className="w-4 h-4 text-cyan-400 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Feature Spotlight: D3 Risk Gauge Live Showcase */}
        <div className="p-6 sm:p-10 rounded-3xl bg-gradient-to-br from-[#0c1220] via-slate-950 to-[#070a12] border border-cyan-500/30 shadow-2xl relative overflow-hidden">
          <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left: Explanatory copy */}
            <div className="lg:col-span-7 space-y-5">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase bg-purple-950 text-purple-300 border border-purple-800 font-semibold">
                  Client Self-Service Intelligence
                </span>
                <span className="text-xs font-mono text-emerald-400">● Live AI Engine</span>
              </div>

              <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Benchmark Your Attack Surface in 90 Seconds
              </h3>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl font-normal">
                Our free diagnostic evaluates your LLM architectures, cloud IAM posture, and CI/CD pipelines 
                against the OWASP Top 10 for LLMs and NIST AI RMF. Visualized with a continuous D3.js risk index.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-sans">No Credentials Required</strong>
                    <span className="text-slate-400 text-[11px]">Strict NDA, zero production API keys ingested</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-sans">Executive Scoping Output</strong>
                    <span className="text-slate-400 text-[11px]">Ranked technical findings and compliance roadmap</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => onNavigate('risk-tool')}
                  className="px-6 py-3.5 rounded-xl text-xs sm:text-sm font-mono font-bold bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white shadow-lg shadow-purple-500/25 border border-purple-400 flex items-center gap-2 transition-all cursor-pointer"
                >
                  <Terminal className="w-4 h-4" />
                  <span>Launch Interactive AI Risk Tool</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => onNavigate('compliance')}
                  className="px-5 py-3.5 rounded-xl text-xs sm:text-sm font-mono text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-700 transition-all cursor-pointer"
                >
                  View SOC 2 Progress
                </button>
              </div>
            </div>

            {/* Right: Live Interactive D3 Gauge Demo Box */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 rounded-2xl bg-slate-950/80 border border-slate-800/90 shadow-xl space-y-4">
              <div className="w-full flex items-center justify-between text-xs font-mono border-b border-slate-800/80 pb-3">
                <span className="text-slate-400">D3.js Dynamic Risk Gauge</span>
                <span className="text-cyan-400">Score: {sampleScore}/100</span>
              </div>

              <RiskGauge 
                score={sampleScore} 
                tier={sampleScore >= 75 ? 'Critical' : sampleScore >= 50 ? 'High' : sampleScore >= 25 ? 'Moderate' : 'Low'} 
                size={240} 
              />

              {/* Interactive preview slider to show visual responsiveness */}
              <div className="w-full space-y-1.5 pt-2">
                <div className="flex justify-between text-[11px] font-mono text-slate-400">
                  <span>Simulate Score:</span>
                  <span className="text-white font-bold">{sampleScore}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sampleScore}
                  onChange={(e) => setSampleScore(Number(e.target.value))}
                  className="w-full accent-cyan-400 bg-slate-800 h-1.5 rounded-lg appearance-none cursor-pointer"
                />
                <div className="text-[10px] font-mono text-slate-500 text-center">
                  Drag slider to test live D3 SVG tweening and continuous Green-to-Red color interpolation
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Endorsements from Enterprise CISOs */}
        <div className="space-y-6 pt-4">
          <div className="text-center max-w-xl mx-auto space-y-1.5">
            <span className="text-xs font-mono uppercase text-cyan-400 tracking-wider font-semibold">
              Verified Executive Validation
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Trusted by Regulated Enterprises & High-Growth Scaleups
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-4">
              <p className="text-xs sm:text-sm text-slate-300 italic leading-relaxed">
                "SecureStack discovered critical IAM privilege escalation paths across our multi-account AWS Landing Zone 
                that three other automated scanners completely missed. Outstanding architectural rigor."
              </p>
              <div className="pt-3 border-t border-slate-800/80 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-cyan-950 border border-cyan-700 flex items-center justify-center font-mono text-xs font-bold text-cyan-300">
                  JL
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Jason Lin</div>
                  <div className="text-[11px] font-mono text-slate-400">CISO, Tier-1 FinTech API</div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-4">
              <p className="text-xs sm:text-sm text-slate-300 italic leading-relaxed">
                "Their FinOps team shaved $38,000 off our monthly Google Cloud and Snowflake bill without impacting 
                our 24/7 data pipelines. The engagement paid for itself in under 30 days."
              </p>
              <div className="pt-3 border-t border-slate-800/80 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-amber-950 border border-amber-700 flex items-center justify-center font-mono text-xs font-bold text-amber-300">
                  SR
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Sarah Reynolds</div>
                  <div className="text-[11px] font-mono text-slate-400">VP Engineering, HealthSaaS</div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-4">
              <p className="text-xs sm:text-sm text-slate-300 italic leading-relaxed">
                "SecureStack guided us through our first SOC 2 Type II audit in 7 weeks flat. Every control was backed 
                by automated Terraform and GitOps policies. Flawless execution."
              </p>
              <div className="pt-3 border-t border-slate-800/80 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-950 border border-emerald-700 flex items-center justify-center font-mono text-xs font-bold text-emerald-300">
                  MK
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Marcus Vance</div>
                  <div className="text-[11px] font-mono text-slate-400">Founder & CTO, CloudFlow B2B</div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
