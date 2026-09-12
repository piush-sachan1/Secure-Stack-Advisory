import React, { useState, useMemo } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Clock,
  FileCheck2,
  Download,
  ArrowUpRight,
  Filter,
  Layers,
  Sparkles,
  Lock,
  Server,
  RefreshCw,
} from 'lucide-react';
import { ComplianceTrackerSkeleton } from './ThemedSkeleton';

interface ComplianceTrackerProps {
  onOpenConsultation?: (topic?: string) => void;
  isLoading?: boolean;
}

interface ControlItem {
  id: string;
  code: string;
  title: string;
  domain: string;
  framework: 'soc2' | 'iso27001' | 'both';
  status: 'passed' | 'in_progress' | 'gap';
  automatedCollector: string;
  evidenceSource: string;
  criticality: 'High' | 'Medium' | 'Critical';
}

interface DomainProgress {
  name: string;
  code: string;
  total: number;
  passed: number;
  inProgress: number;
  gap: number;
  color: string;
  description: string;
}

const INITIAL_CONTROLS: ControlItem[] = [
  // SOC 2 Trust Services Criteria
  {
    id: 'soc-cc61',
    code: 'CC6.1',
    title: 'Logical Access Controls & Multi-Factor Authentication',
    domain: 'Security & Access',
    framework: 'soc2',
    status: 'passed',
    automatedCollector: 'Okta / Entra ID API',
    evidenceSource: 'Hardware token enforcement logs (100% MFA)',
    criticality: 'Critical',
  },
  {
    id: 'soc-cc66',
    code: 'CC6.6',
    title: 'Boundary Protection, Firewalls & Network Isolation',
    domain: 'Security & Access',
    framework: 'soc2',
    status: 'passed',
    automatedCollector: 'AWS Network Firewall / GCP VPC',
    evidenceSource: 'Transit Gateway route tables & strict egress rules',
    criticality: 'High',
  },
  {
    id: 'soc-cc71',
    code: 'CC7.1',
    title: 'Vulnerability Detection & Container Image Scanning',
    domain: 'Operations & Monitoring',
    framework: 'soc2',
    status: 'passed',
    automatedCollector: 'Trivy / ECR Image Scanning',
    evidenceSource: 'Zero CVE-High in production registries within 14-day SLA',
    criticality: 'High',
  },
  {
    id: 'soc-cc72',
    code: 'CC7.2',
    title: 'Real-time Security Telemetry & Incident Response',
    domain: 'Operations & Monitoring',
    framework: 'soc2',
    status: 'in_progress',
    automatedCollector: 'Datadog SIEM / AWS CloudWatch',
    evidenceSource: 'P1 alarm routing and bi-weekly tabletop drill artifacts',
    criticality: 'Critical',
  },
  {
    id: 'soc-cc81',
    code: 'CC8.1',
    title: 'Change Management & CI/CD Branch Protection',
    domain: 'Change Management',
    framework: 'soc2',
    status: 'passed',
    automatedCollector: 'GitHub Enterprise Audit Log',
    evidenceSource: 'Mandatory 2-reviewer approvals on main branch',
    criticality: 'High',
  },
  {
    id: 'soc-a12',
    code: 'A1.2',
    title: 'Multi-AZ Redundancy & Automated Backup Verification',
    domain: 'Availability & BCP',
    framework: 'soc2',
    status: 'in_progress',
    automatedCollector: 'AWS Backup / GCP Snapshotter',
    evidenceSource: 'Daily immutable snapshots with monthly restore trials',
    criticality: 'High',
  },
  {
    id: 'soc-c11',
    code: 'C1.1',
    title: 'Data-at-Rest & In-Transit KMS Cryptographic Envelope',
    domain: 'Confidentiality',
    framework: 'soc2',
    status: 'passed',
    automatedCollector: 'AWS KMS / HashiCorp Vault',
    evidenceSource: 'AES-256-GCM customer-managed keys with annual rotation',
    criticality: 'Critical',
  },
  {
    id: 'soc-p11',
    code: 'P1.1',
    title: 'PII Scrubbing & Synthetic Data Generation in Staging',
    domain: 'Privacy & Data Governance',
    framework: 'soc2',
    status: 'gap',
    automatedCollector: 'Database Proxy Sanitizer',
    evidenceSource: 'Pending automated mask pipeline for developer test suites',
    criticality: 'Medium',
  },

  // ISO/IEC 27001:2022 Controls
  {
    id: 'iso-a515',
    code: 'A.5.15',
    title: 'Access Control Policy & Privileged Identity Management',
    domain: 'Organizational Controls',
    framework: 'iso27001',
    status: 'passed',
    automatedCollector: 'Azure Entra PIM / AWS IAM Identity Center',
    evidenceSource: 'Time-bound just-in-time privilege elevations',
    criticality: 'Critical',
  },
  {
    id: 'iso-a523',
    code: 'A.5.23',
    title: 'Information Security in Use of Cloud Services',
    domain: 'Organizational Controls',
    framework: 'iso27001',
    status: 'passed',
    automatedCollector: 'CloudTrail / Google Cloud Audit Logs',
    evidenceSource: 'Preventative SCPs blocking unauthorized regions & public buckets',
    criticality: 'High',
  },
  {
    id: 'iso-a88',
    code: 'A.8.8',
    title: 'Management of Technical Vulnerabilities',
    domain: 'Technological Controls',
    framework: 'iso27001',
    status: 'in_progress',
    automatedCollector: 'Wiz / Snyk / Dependabot',
    evidenceSource: 'Automated PR remediation for vulnerable dependencies',
    criticality: 'High',
  },
  {
    id: 'iso-a820',
    code: 'A.8.20',
    title: 'Network Security & Micro-segmentation Architecture',
    domain: 'Technological Controls',
    framework: 'iso27001',
    status: 'passed',
    automatedCollector: 'Calico / Cilium eBPF Network Policies',
    evidenceSource: 'Zero-trust pod-to-pod mutual TLS and egress whitelisting',
    criticality: 'Critical',
  },
  {
    id: 'iso-a824',
    code: 'A.8.24',
    title: 'Use of Cryptography & Key Management Lifecycle',
    domain: 'Technological Controls',
    framework: 'iso27001',
    status: 'passed',
    automatedCollector: 'Cloud KMS Key Audit',
    evidenceSource: 'FIPS 140-3 Level 3 Hardware Security Modules',
    criticality: 'High',
  },
  {
    id: 'iso-a68',
    code: 'A.6.8',
    title: 'Information Security Event Reporting & Incident Retrospectives',
    domain: 'People & Operations',
    framework: 'iso27001',
    status: 'in_progress',
    automatedCollector: 'Jira Service Management / PagerDuty',
    evidenceSource: 'Blameless post-mortem repository with tracked remediations',
    criticality: 'Medium',
  },
  {
    id: 'iso-a828',
    code: 'A.8.28',
    title: 'Secure Coding Principles & Static Analysis (SAST)',
    domain: 'Technological Controls',
    framework: 'iso27001',
    status: 'passed',
    automatedCollector: 'Semgrep / SonarQube CI Gate',
    evidenceSource: '100% build rejection for OWASP Top 10 rule matches',
    criticality: 'High',
  },
  {
    id: 'iso-a530',
    code: 'A.5.30',
    title: 'ICT Readiness for Business Continuity & RTO/RPO Drills',
    domain: 'Organizational Controls',
    framework: 'iso27001',
    status: 'gap',
    automatedCollector: 'Chaos Mesh / AWS Fault Injection',
    evidenceSource: 'Regional failover drill scheduled for Q3 audit cycle',
    criticality: 'High',
  },
];

export const ComplianceTracker: React.FC<ComplianceTrackerProps> = ({ onOpenConsultation, isLoading = false }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'soc2' | 'iso27001'>('all');
  const [controls, setControls] = useState<ControlItem[]>(INITIAL_CONTROLS);
  const [statusFilter, setStatusFilter] = useState<'all' | 'passed' | 'in_progress' | 'gap'>('all');
  const [selectedControl, setSelectedControl] = useState<ControlItem | null>(null);
  const [readinessStage, setReadinessStage] = useState<'current' | 'remediated' | 'pre_audit'>('current');

  // Toggle control status interactively to test what-if readiness scenarios
  const toggleControlStatus = (id: string) => {
    setControls((prev) =>
      prev.map((ctrl) => {
        if (ctrl.id !== id) return ctrl;
        const nextStatus =
          ctrl.status === 'passed' ? 'in_progress' : ctrl.status === 'in_progress' ? 'gap' : 'passed';
        return { ...ctrl, status: nextStatus };
      })
    );
  };

  // Reset to preset scenario
  const applyPresetScenario = (stage: 'current' | 'remediated' | 'pre_audit') => {
    setReadinessStage(stage);
    if (stage === 'current') {
      setControls(INITIAL_CONTROLS);
    } else if (stage === 'remediated') {
      setControls(
        INITIAL_CONTROLS.map((c) => ({
          ...c,
          status: c.status === 'gap' ? 'in_progress' : 'passed',
        }))
      );
    } else if (stage === 'pre_audit') {
      setControls(
        INITIAL_CONTROLS.map((c) => ({
          ...c,
          status: 'passed',
        }))
      );
    }
  };

  // Filtered controls list
  const filteredControls = useMemo(() => {
    return controls.filter((ctrl) => {
      const matchesTab = activeTab === 'all' || ctrl.framework === activeTab || ctrl.framework === 'both';
      const matchesStatus = statusFilter === 'all' || ctrl.status === statusFilter;
      return matchesTab && matchesStatus;
    });
  }, [controls, activeTab, statusFilter]);

  // Overall metrics calculation
  const metrics = useMemo(() => {
    const socControls = controls.filter((c) => c.framework === 'soc2' || c.framework === 'both');
    const isoControls = controls.filter((c) => c.framework === 'iso27001' || c.framework === 'both');

    const calcProgress = (items: ControlItem[]) => {
      if (items.length === 0) return 0;
      // Passed = 100%, In Progress = 50%, Gap = 0%
      const totalScore = items.reduce((acc, c) => {
        if (c.status === 'passed') return acc + 100;
        if (c.status === 'in_progress') return acc + 55;
        return acc;
      }, 0);
      return Math.round(totalScore / items.length);
    };

    const socProgress = calcProgress(socControls);
    const isoProgress = calcProgress(isoControls);
    const overallProgress = Math.round((socProgress + isoProgress) / 2);

    return {
      soc: {
        progress: socProgress,
        total: socControls.length,
        passed: socControls.filter((c) => c.status === 'passed').length,
        inProgress: socControls.filter((c) => c.status === 'in_progress').length,
        gap: socControls.filter((c) => c.status === 'gap').length,
      },
      iso: {
        progress: isoProgress,
        total: isoControls.length,
        passed: isoControls.filter((c) => c.status === 'passed').length,
        inProgress: isoControls.filter((c) => c.status === 'in_progress').length,
        gap: isoControls.filter((c) => c.status === 'gap').length,
      },
      overall: {
        progress: overallProgress,
        total: controls.length,
        passed: controls.filter((c) => c.status === 'passed').length,
        inProgress: controls.filter((c) => c.status === 'in_progress').length,
        gap: controls.filter((c) => c.status === 'gap').length,
      },
    };
  }, [controls]);

  // Domain breakdown
  const domainBreakdown: DomainProgress[] = useMemo(() => {
    const activeControls =
      activeTab === 'soc2'
        ? controls.filter((c) => c.framework === 'soc2')
        : activeTab === 'iso27001'
        ? controls.filter((c) => c.framework === 'iso27001')
        : controls;

    const domainsMap: Record<string, ControlItem[]> = {};
    activeControls.forEach((c) => {
      if (!domainsMap[c.domain]) domainsMap[c.domain] = [];
      domainsMap[c.domain].push(c);
    });

    const colors = ['#06b6d4', '#14b8a6', '#38bdf8', '#818cf8', '#f59e0b'];

    return Object.keys(domainsMap).map((domainName, idx) => {
      const items = domainsMap[domainName];
      const passed = items.filter((i) => i.status === 'passed').length;
      const inProgress = items.filter((i) => i.status === 'in_progress').length;
      const gap = items.filter((i) => i.status === 'gap').length;

      return {
        name: domainName,
        code: `DOM-0${idx + 1}`,
        total: items.length,
        passed,
        inProgress,
        gap,
        color: colors[idx % colors.length],
        description: `Covers ${items.length} critical engineering controls with automated evidence collection.`,
      };
    });
  }, [controls, activeTab]);

  // Progress Ring SVG Helper
  const renderProgressRing = (
    percentage: number,
    size = 140,
    strokeWidth = 10,
    color = '#06b6d4',
    secondaryColor = '#0f172a',
    glow = true
  ) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;

    return (
      <div className="relative inline-flex items-center justify-center">
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={secondaryColor}
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          {/* Animated progress ring */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            fill="transparent"
            className="transition-all duration-700 ease-out"
            style={{
              filter: glow ? `drop-shadow(0 0 8px ${color}80)` : undefined,
            }}
          />
        </svg>
        <div className="absolute flex flex-col items-center justify-center text-center">
          <span className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-white">
            {percentage}%
          </span>
          <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">
            Adherence
          </span>
        </div>
      </div>
    );
  };

  return (
    <section
      id="compliance-tracker"
      className="py-16 sm:py-24 bg-[#07090e] text-slate-100 border-b border-slate-800 relative overflow-hidden"
    >
      {/* Background cyber grid styling */}
      <div className="absolute inset-0 bg-cyber-grid pointer-events-none opacity-40" />
      <div className="absolute -top-40 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 sm:mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium tracking-wider uppercase bg-cyan-950/70 border border-cyan-500/40 text-cyan-300 mb-3 sm:mb-4">
              <FileCheck2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>Real-time Compliance & Audit Readiness</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white">
              SOC 2 Type II & ISO 27001 Compliance Tracker
            </h2>
            <p className="mt-2.5 sm:mt-3 text-slate-300 text-xs sm:text-sm lg:text-base leading-relaxed">
              Visualize security posture adherence through continuous automated telemetry across multi-cloud infrastructure.
              Simulate remediation milestones and inspect control evidence packages verified by our accredited lead auditors.
            </p>
          </div>

          {/* Quick Consultation CTA */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              id="btn-compliance-gap-consult"
              onClick={() => onOpenConsultation?.('SOC 2 & ISO 27001 Audit Readiness Sprint')}
              className="w-full sm:w-auto justify-center px-4 py-3 sm:py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 active:scale-98 text-slate-950 font-semibold text-xs sm:text-sm font-mono flex items-center gap-2 shadow-lg shadow-cyan-950/40 transition-all cursor-pointer"
            >
              <span>Book Pre-Audit Readiness Review</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {isLoading ? (
          <ComplianceTrackerSkeleton />
        ) : (
          <>
            {/* Primary Standards Rings Grid (SOC 2 vs ISO 27001 vs Combined) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-10">
          {/* Card 1: SOC 2 Type II */}
          <div
            id="card-soc2-progress"
            className={`p-5 sm:p-6 rounded-2xl border transition-all ${
              activeTab === 'soc2'
                ? 'bg-gradient-to-b from-cyan-950/40 to-[#0b0f19] border-cyan-500/50 shadow-xl shadow-cyan-950/30 ring-1 ring-cyan-500/30'
                : 'bg-[#0b0f19] border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-cyan-950/80 border border-cyan-800 flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">SOC 2 Type II</h3>
                  <span className="text-[11px] font-mono text-slate-400">AICPA Trust Services</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActiveTab('soc2')}
                className={`text-xs font-mono px-3 py-1 rounded-md transition-colors cursor-pointer ${
                  activeTab === 'soc2'
                    ? 'bg-cyan-500 text-slate-950 font-bold'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                Focus
              </button>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between py-2 sm:py-3 gap-4 sm:gap-2">
              <div className="shrink-0">
                {renderProgressRing(metrics.soc.progress, 115, 9, '#06b6d4', '#1e293b')}
              </div>
              <div className="space-y-1.5 sm:space-y-2 text-xs font-mono text-slate-300 w-full sm:w-auto sm:pl-4">
                <div className="flex items-center justify-between gap-4 py-1 sm:py-0 border-b border-slate-800/40 sm:border-0">
                  <span className="flex items-center gap-1.5 text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Passed:
                  </span>
                  <span className="font-bold text-white">{metrics.soc.passed} / {metrics.soc.total}</span>
                </div>
                <div className="flex items-center justify-between gap-4 py-1 sm:py-0 border-b border-slate-800/40 sm:border-0">
                  <span className="flex items-center gap-1.5 text-amber-400">
                    <Clock className="w-3.5 h-3.5" /> In Progress:
                  </span>
                  <span className="font-bold text-white">{metrics.soc.inProgress}</span>
                </div>
                <div className="flex items-center justify-between gap-4 py-1 sm:py-0">
                  <span className="flex items-center gap-1.5 text-rose-400">
                    <AlertCircle className="w-3.5 h-3.5" /> Remediation:
                  </span>
                  <span className="font-bold text-white">{metrics.soc.gap}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-800/80 text-[11px] text-slate-400 leading-relaxed">
              Audits continuous controls across AWS/GCP workloads with automated evidence ingestion for Big 4 CPA firms.
            </div>
          </div>

          {/* Card 2: ISO/IEC 27001:2022 */}
          <div
            id="card-iso-progress"
            className={`p-5 sm:p-6 rounded-2xl border transition-all ${
              activeTab === 'iso27001'
                ? 'bg-gradient-to-b from-teal-950/40 to-[#0b0f19] border-teal-500/50 shadow-xl shadow-teal-950/30 ring-1 ring-teal-500/30'
                : 'bg-[#0b0f19] border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-teal-950/80 border border-teal-800 flex items-center justify-center">
                  <Lock className="w-4 h-4 text-teal-400" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">ISO/IEC 27001</h3>
                  <span className="text-[11px] font-mono text-slate-400">2022 ISMS Annex A</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActiveTab('iso27001')}
                className={`text-xs font-mono px-3 py-1 rounded-md transition-colors cursor-pointer ${
                  activeTab === 'iso27001'
                    ? 'bg-teal-400 text-slate-950 font-bold'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                Focus
              </button>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between py-2 sm:py-3 gap-4 sm:gap-2">
              <div className="shrink-0">
                {renderProgressRing(metrics.iso.progress, 115, 9, '#14b8a6', '#1e293b')}
              </div>
              <div className="space-y-1.5 sm:space-y-2 text-xs font-mono text-slate-300 w-full sm:w-auto sm:pl-4">
                <div className="flex items-center justify-between gap-4 py-1 sm:py-0 border-b border-slate-800/40 sm:border-0">
                  <span className="flex items-center gap-1.5 text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Passed:
                  </span>
                  <span className="font-bold text-white">{metrics.iso.passed} / {metrics.iso.total}</span>
                </div>
                <div className="flex items-center justify-between gap-4 py-1 sm:py-0 border-b border-slate-800/40 sm:border-0">
                  <span className="flex items-center gap-1.5 text-amber-400">
                    <Clock className="w-3.5 h-3.5" /> In Progress:
                  </span>
                  <span className="font-bold text-white">{metrics.iso.inProgress}</span>
                </div>
                <div className="flex items-center justify-between gap-4 py-1 sm:py-0">
                  <span className="flex items-center gap-1.5 text-rose-400">
                    <AlertCircle className="w-3.5 h-3.5" /> Remediation:
                  </span>
                  <span className="font-bold text-white">{metrics.iso.gap}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-800/80 text-[11px] text-slate-400 leading-relaxed">
              Standardizes Information Security Management System (ISMS) across 93 organizational and technological controls.
            </div>
          </div>

          {/* Card 3: Unified Cross-Framework Compliance Score */}
          <div
            id="card-unified-progress"
            className={`p-5 sm:p-6 rounded-2xl border transition-all ${
              activeTab === 'all'
                ? 'bg-gradient-to-b from-cyan-950/30 via-teal-950/20 to-[#0b0f19] border-cyan-500/40 shadow-xl shadow-cyan-950/20 ring-1 ring-cyan-500/20'
                : 'bg-[#0b0f19] border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center text-slate-950 font-bold">
                  <Layers className="w-4 h-4 stroke-[2.5]" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Unified Audit Readiness</h3>
                  <span className="text-[11px] font-mono text-slate-400">De-duplicated Overlap</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActiveTab('all')}
                className={`text-xs font-mono px-3 py-1 rounded-md transition-colors cursor-pointer ${
                  activeTab === 'all'
                    ? 'bg-cyan-400 text-slate-950 font-bold'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                Combined
              </button>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between py-2 sm:py-3 gap-4 sm:gap-2">
              <div className="shrink-0">
                {renderProgressRing(metrics.overall.progress, 115, 9, '#38bdf8', '#1e293b')}
              </div>
              <div className="space-y-1.5 sm:space-y-2 text-xs font-mono text-slate-300 w-full sm:w-auto sm:pl-4">
                <div className="flex items-center justify-between gap-4 py-1 sm:py-0 border-b border-slate-800/40 sm:border-0">
                  <span className="text-slate-400">Total Controls:</span>
                  <span className="font-bold text-white">{metrics.overall.total}</span>
                </div>
                <div className="flex items-center justify-between gap-4 py-1 sm:py-0 border-b border-slate-800/40 sm:border-0">
                  <span className="text-emerald-400">Auditor Ready:</span>
                  <span className="font-bold text-white">{metrics.overall.passed}</span>
                </div>
                <div className="flex items-center justify-between gap-4 py-1 sm:py-0">
                  <span className="text-cyan-400">Audit Window:</span>
                  <span className="font-bold text-white">Q3 / Q4 Cycle</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-800/80 text-[11px] text-slate-400 leading-relaxed">
              Mapped to reduce duplicate evidence collection by 68% between SOC 2 Type II trust criteria and ISO Annex A.
            </div>
          </div>
        </div>

        {/* Interactive What-If Scenario Toolbar */}
        <div className="bg-[#0b0f19] rounded-2xl border border-slate-800 p-4 sm:p-6 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-5 sm:pb-6 border-b border-slate-800/80">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Interactive Audit Readiness Simulation</span>
              </div>
              <h4 className="text-base sm:text-lg font-bold text-white">
                Simulate Pre-Audit Milestones & Evidence Verification
              </h4>
              <p className="text-xs text-slate-400 mt-1">
                Tap controls to toggle status or select a readiness milestone to see real-time adherence progress rings.
              </p>
            </div>

            {/* Scenario Preset Buttons */}
            <div className="grid grid-cols-3 sm:flex gap-1.5 sm:gap-2 w-full sm:w-auto p-1 bg-slate-950 rounded-xl border border-slate-800 shrink-0">
              <button
                type="button"
                onClick={() => applyPresetScenario('current')}
                className={`px-2.5 sm:px-3 py-2 sm:py-1.5 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer text-center ${
                  readinessStage === 'current'
                    ? 'bg-slate-800 text-white border border-slate-600 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <span className="hidden sm:inline">1. Initial Gap Audit</span>
                <span className="sm:hidden">1. Gap Audit</span>
              </button>
              <button
                type="button"
                onClick={() => applyPresetScenario('remediated')}
                className={`px-2.5 sm:px-3 py-2 sm:py-1.5 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer text-center ${
                  readinessStage === 'remediated'
                    ? 'bg-cyan-950 text-cyan-300 border border-cyan-700 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <span className="hidden sm:inline">2. Post-Remediation</span>
                <span className="sm:hidden">2. Remediation</span>
              </button>
              <button
                type="button"
                onClick={() => applyPresetScenario('pre_audit')}
                className={`px-2.5 sm:px-3 py-2 sm:py-1.5 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer text-center ${
                  readinessStage === 'pre_audit'
                    ? 'bg-emerald-950 text-emerald-300 border border-emerald-700 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <span className="hidden sm:inline">3. Audit-Clean</span>
                <span className="sm:hidden">3. Audit-Clean</span>
              </button>
            </div>
          </div>

          {/* Domain Category Progress Bars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 pt-5 sm:pt-6">
            {domainBreakdown.map((dom) => {
              const domPercentage =
                dom.total > 0
                  ? Math.round(((dom.passed * 100 + dom.inProgress * 55) / (dom.total * 100)) * 100)
                  : 0;

              return (
                <div
                  key={dom.name}
                  className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] font-mono text-slate-400">{dom.code}</span>
                      <span className="text-xs font-mono font-bold text-white">{domPercentage}%</span>
                    </div>
                    <div className="text-xs font-semibold text-slate-200 truncate mb-2" title={dom.name}>
                      {dom.name}
                    </div>
                  </div>
                  <div>
                    <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${domPercentage}%`,
                          backgroundColor: dom.color,
                        }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mt-2">
                      <span>{dom.passed} Passed</span>
                      <span>{dom.inProgress + dom.gap} Open</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Filter Controls & Control Evidence Table */}
        <div className="bg-[#0b0f19] rounded-2xl border border-slate-800 overflow-hidden shadow-2xl">
          {/* Table Toolbar */}
          <div className="p-4 sm:p-6 border-b border-slate-800 bg-[#090d16] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono uppercase text-slate-400 mr-1 sm:mr-2 flex items-center gap-1.5">
                <Filter className="w-3.5 h-3.5 text-cyan-400" />
                <span>Scope:</span>
              </span>
              <button
                type="button"
                onClick={() => setActiveTab('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer ${
                  activeTab === 'all'
                    ? 'bg-cyan-500 text-slate-950'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                All ({controls.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('soc2')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer ${
                  activeTab === 'soc2'
                    ? 'bg-cyan-500 text-slate-950'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                SOC 2 ({controls.filter((c) => c.framework === 'soc2').length})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('iso27001')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer ${
                  activeTab === 'iso27001'
                    ? 'bg-cyan-500 text-slate-950'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                ISO 27001 ({controls.filter((c) => c.framework === 'iso27001').length})
              </button>
            </div>

            {/* Status Filter */}
            <div className="flex items-center justify-between sm:justify-end gap-2 w-full sm:w-auto">
              <span className="text-xs font-mono text-slate-400">Status:</span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="bg-slate-900 border border-slate-700 text-xs font-mono text-slate-200 rounded-lg px-2.5 py-1.5 focus:border-cyan-500 focus:outline-none"
              >
                <option value="all">All Statuses</option>
                <option value="passed">Passed</option>
                <option value="in_progress">In Progress</option>
                <option value="gap">Remediation Gap</option>
              </select>
            </div>
          </div>

          {/* Mobile Card Feed (Optimized for phones, avoiding horizontal table scroll) */}
          <div className="sm:hidden divide-y divide-slate-800/60 p-3 space-y-3">
            {filteredControls.map((ctrl) => (
              <div
                key={ctrl.id}
                className="p-3.5 rounded-xl bg-[#090d16] border border-slate-800/80 space-y-2.5"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-800/60 text-cyan-300 font-mono text-[11px] font-bold">
                      {ctrl.code}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono uppercase">
                      {ctrl.framework === 'soc2' ? 'SOC 2' : 'ISO 27001'}
                    </span>
                  </div>

                  {/* Touch-Friendly Status Pill */}
                  <button
                    type="button"
                    onClick={() => toggleControlStatus(ctrl.id)}
                    className="cursor-pointer active:scale-95 transition-transform"
                    title="Tap to cycle status"
                  >
                    {ctrl.status === 'passed' && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-mono font-medium bg-emerald-950/90 border border-emerald-700/80 text-emerald-300">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                        Passed
                      </span>
                    )}
                    {ctrl.status === 'in_progress' && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-mono font-medium bg-amber-950/90 border border-amber-700/80 text-amber-300">
                        <Clock className="w-3 h-3 text-amber-400" />
                        In Progress
                      </span>
                    )}
                    {ctrl.status === 'gap' && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-mono font-medium bg-rose-950/90 border border-rose-700/80 text-rose-300">
                        <AlertCircle className="w-3 h-3 text-rose-400" />
                        Gap Open
                      </span>
                    )}
                  </button>
                </div>

                <div>
                  <h4 className="font-semibold text-white text-xs leading-snug">
                    {ctrl.title}
                  </h4>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    Domain: <span className="text-slate-300 font-mono">{ctrl.domain}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[10px] font-mono pt-2 border-t border-slate-800/60">
                  <div className="flex items-center gap-1.5 text-slate-400 truncate max-w-[180px]">
                    <Server className="w-3 h-3 text-cyan-400 shrink-0" />
                    <span className="truncate">{ctrl.automatedCollector}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedControl(ctrl)}
                    className="text-cyan-400 hover:text-cyan-300 underline font-mono text-[11px] cursor-pointer"
                  >
                    Inspect Artifact →
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop/Tablet Table Content */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#05080e] text-[11px] font-mono text-slate-400 uppercase tracking-wider border-b border-slate-800">
                <tr>
                  <th className="py-3.5 px-4 sm:px-6">Control Code</th>
                  <th className="py-3.5 px-4">Requirement & Title</th>
                  <th className="py-3.5 px-4 hidden md:table-cell">Automated Collector</th>
                  <th className="py-3.5 px-4 hidden lg:table-cell">Auditor Evidence Artifact</th>
                  <th className="py-3.5 px-4">Status (Click to toggle)</th>
                  <th className="py-3.5 px-4 text-right">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-sans">
                {filteredControls.map((ctrl) => (
                  <tr
                    key={ctrl.id}
                    className="hover:bg-slate-900/40 transition-colors group"
                  >
                    <td className="py-4 px-4 sm:px-6 font-mono text-cyan-400 font-semibold whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-cyan-950/70 border border-cyan-800/60 text-[11px]">
                          {ctrl.code}
                        </span>
                        <span className="text-[10px] text-slate-500 uppercase">
                          {ctrl.framework === 'soc2' ? 'SOC 2' : 'ISO 27001'}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4 max-w-xs sm:max-w-sm">
                      <div className="font-medium text-white group-hover:text-cyan-300 transition-colors">
                        {ctrl.title}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        Domain: <span className="text-slate-300 font-mono">{ctrl.domain}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 hidden md:table-cell text-slate-300 font-mono text-[11px]">
                      <div className="flex items-center gap-1.5">
                        <Server className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <span>{ctrl.automatedCollector}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 hidden lg:table-cell text-slate-400 text-[11px] max-w-xs truncate">
                      {ctrl.evidenceSource}
                    </td>
                    <td className="py-4 px-4">
                      <button
                        type="button"
                        onClick={() => toggleControlStatus(ctrl.id)}
                        className="cursor-pointer group/btn"
                        title="Click to cycle status: Passed -> In Progress -> Gap"
                      >
                        {ctrl.status === 'passed' && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono font-medium bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 group-hover/btn:border-emerald-400 transition-all">
                            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                            Passed
                          </span>
                        )}
                        {ctrl.status === 'in_progress' && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono font-medium bg-amber-950/80 border border-amber-700/60 text-amber-300 group-hover/btn:border-amber-400 transition-all">
                            <Clock className="w-3 h-3 text-amber-400" />
                            In Progress
                          </span>
                        )}
                        {ctrl.status === 'gap' && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono font-medium bg-rose-950/80 border border-rose-700/60 text-rose-300 group-hover/btn:border-rose-400 transition-all">
                            <AlertCircle className="w-3 h-3 text-rose-400" />
                            Gap Open
                          </span>
                        )}
                      </button>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <button
                        type="button"
                        onClick={() => setSelectedControl(ctrl)}
                        className="text-xs font-mono text-cyan-400 hover:text-cyan-300 underline underline-offset-4 cursor-pointer"
                      >
                        Inspect
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Table Footer / Summary Bar */}
          <div className="p-4 bg-[#070a10] border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-3">
            <div className="flex items-center gap-2 text-center sm:text-left">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              <span>Continuous collector poll: Every 6 hours via OpenTofu state & CloudTrail API</span>
            </div>
            <div className="flex items-center gap-4 text-xs font-mono">
              <button
                type="button"
                onClick={() => applyPresetScenario('current')}
                className="hover:text-slate-200 flex items-center gap-1 transition-colors cursor-pointer"
              >
                <RefreshCw className="w-3 h-3 text-cyan-400" />
                Reset Controls
              </button>
              <button
                type="button"
                onClick={() => onOpenConsultation?.('Export Verified Compliance Matrix')}
                className="hover:text-cyan-300 text-cyan-400 flex items-center gap-1 transition-colors cursor-pointer"
              >
                <Download className="w-3 h-3" />
                Export Matrix
              </button>
            </div>
          </div>
        </div>

        {/* Modal: Single Control Technical Detail */}
        {selectedControl && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm"
            onClick={() => setSelectedControl(null)}
          >
            <div
              className="bg-[#0b0f19] border border-cyan-500/40 rounded-2xl max-w-lg w-full p-5 sm:p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className="px-2.5 py-0.5 rounded text-xs font-mono bg-cyan-950 border border-cyan-700 text-cyan-300">
                    {selectedControl.code} · {selectedControl.framework.toUpperCase()}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-white mt-2">{selectedControl.title}</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedControl(null)}
                  className="text-slate-400 hover:text-white p-1 rounded-md"
                  aria-label="Close modal"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-3 sm:space-y-4 text-xs text-slate-300">
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                  <div className="text-[11px] font-mono text-slate-400 uppercase mb-1">Evidence Collector</div>
                  <div className="text-white font-mono break-all sm:break-normal">{selectedControl.automatedCollector}</div>
                </div>

                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                  <div className="text-[11px] font-mono text-slate-400 uppercase mb-1">Auditor Evidence Verification</div>
                  <div className="text-slate-200">{selectedControl.evidenceSource}</div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                    <div className="text-[11px] font-mono text-slate-400 uppercase mb-1">Audit Criticality</div>
                    <div className="font-semibold text-rose-400">{selectedControl.criticality}</div>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                    <div className="text-[11px] font-mono text-slate-400 uppercase mb-1">Current Status</div>
                    <div className="font-semibold text-emerald-400 capitalize">{selectedControl.status.replace('_', ' ')}</div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row justify-end gap-2.5 sm:gap-3">
                <button
                  type="button"
                  onClick={() => {
                    toggleControlStatus(selectedControl.id);
                    setSelectedControl(null);
                  }}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-mono text-white cursor-pointer"
                >
                  Toggle Status
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedControl(null);
                    onOpenConsultation?.(`Audit Remediation for ${selectedControl.code}: ${selectedControl.title}`);
                  }}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs font-mono cursor-pointer"
                >
                  Request Remediation SLA
                </button>
              </div>
            </div>
          </div>
        )}
        </>
        )}
      </div>
    </section>
  );
};

export default ComplianceTracker;
