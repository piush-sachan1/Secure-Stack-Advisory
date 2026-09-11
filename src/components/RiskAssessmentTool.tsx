import React, { useState, useEffect } from 'react';
import { RiskAssessmentInput, AssessmentResult } from '../types';
import { RiskGauge } from './RiskGauge';
import confetti from 'canvas-confetti';
import {
  ShieldAlert,
  ChevronRight,
  ChevronLeft,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Cpu,
  Layers,
  FileText,
  Lock,
  Activity,
  Server,
  Users,
  ExternalLink,
  ChevronDown,
  Info,
  Sparkles
} from 'lucide-react';

interface RiskAssessmentToolProps {
  onSelectForConsultation: (assessment: {
    score: number;
    tier: string;
    recommendedPractice: string;
    keyFindingSummary: string;
  }) => void;
}

export const RiskAssessmentTool: React.FC<RiskAssessmentToolProps> = ({ onSelectForConsultation }) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [answers, setAnswers] = useState<RiskAssessmentInput>({
    aiFeatures: ['llm_chat'],
    cloudProviders: ['aws'],
    governancePolicy: 'ad_hoc',
    dataHandling: 'pii_confidential',
    incidentMaturity: 'basic',
    exposureSurface: 'b2b_authenticated',
    teamSize: '21-100',
    industrySector: 'Enterprise B2B SaaS',
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingPhase, setLoadingPhase] = useState<string>('Validating threat boundary inputs...');
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [expandedFinding, setExpandedFinding] = useState<string | null>(null);

  const totalSteps = 6;

  // Toggle multi-select options
  const toggleAiFeature = (feature: string) => {
    setAnswers((prev) => {
      if (feature === 'none') {
        return { ...prev, aiFeatures: ['none'] };
      }
      const filtered = prev.aiFeatures.filter((f) => f !== 'none');
      if (filtered.includes(feature)) {
        const next = filtered.filter((f) => f !== feature);
        return { ...prev, aiFeatures: next.length === 0 ? ['none'] : next };
      } else {
        return { ...prev, aiFeatures: [...filtered, feature] };
      }
    });
  };

  const toggleCloud = (cloud: string) => {
    setAnswers((prev) => {
      if (prev.cloudProviders.includes(cloud)) {
        if (prev.cloudProviders.length === 1) return prev; // keep at least one
        return { ...prev, cloudProviders: prev.cloudProviders.filter((c) => c !== cloud) };
      } else {
        return { ...prev, cloudProviders: [...prev.cloudProviders, cloud] };
      }
    });
  };

  // Submit assessment
  const handleRunAssessment = async () => {
    setIsLoading(true);
    setError(null);

    // Multi-stage realistic loading feedback
    const phases = [
      'Mapping prompt injection & RAG attack vectors...',
      'Evaluating cross-tenant data isolation & IAM roles...',
      'Synthesizing risk matrix and compliance baseline...',
    ];
    let phaseIndex = 0;
    setLoadingPhase(phases[0]);

    const intervalId = setInterval(() => {
      phaseIndex = (phaseIndex + 1) % phases.length;
      setLoadingPhase(phases[phaseIndex]);
    }, 1100);

    try {
      const response = await fetch('/api/assess-risk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(answers),
      });

      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }

      const data = await response.json();
      if (data.result) {
        setResult(data.result);
        if (data.result.findings && data.result.findings.length > 0) {
          setExpandedFinding(data.result.findings[0].id);
        }
      } else {
        throw new Error('Malformed assessment response');
      }
    } catch (err: any) {
      console.error('Assessment invocation failed:', err);
      setError('Unable to reach assessment server. Retrying with deterministic heuristic baseline.');
    } finally {
      clearInterval(intervalId);
      setIsLoading(false);
    }
  };

  const fireSuccessConfetti = () => {
    try {
      // Subtle left cannon with refined cybersecurity palette
      confetti({
        particleCount: 38,
        angle: 60,
        spread: 55,
        origin: { x: 0.15, y: 0.62 },
        colors: ['#3b82f6', '#10b981', '#38bdf8', '#fbbf24', '#818cf8'],
        ticks: 220,
        gravity: 1.1,
        scalar: 0.85,
        disableForReducedMotion: true,
      });

      // Subtle right cannon with slight stagger
      setTimeout(() => {
        confetti({
          particleCount: 38,
          angle: 120,
          spread: 55,
          origin: { x: 0.85, y: 0.62 },
          colors: ['#3b82f6', '#10b981', '#38bdf8', '#fbbf24', '#818cf8'],
          ticks: 220,
          gravity: 1.1,
          scalar: 0.85,
          disableForReducedMotion: true,
        });
      }, 140);
    } catch (e) {
      console.warn('Confetti animation error:', e);
    }
  };

  useEffect(() => {
    if (result) {
      fireSuccessConfetti();
    }
  }, [result]);

  const handleReset = () => {
    setResult(null);
    setCurrentStep(1);
    setError(null);
  };

  const handleConsultationHandoff = () => {
    if (!result) return;
    const topFinding = result.findings?.[0]?.title || 'AI Architecture Review';
    onSelectForConsultation({
      score: result.riskScore,
      tier: result.riskTier,
      recommendedPractice: result.recommendedPractice.title,
      keyFindingSummary: `${result.riskTier} Exposure (${result.riskScore}/100): ${topFinding}`,
    });

    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="risk-assessment" className="py-20 bg-[#07090e] text-slate-100 relative overflow-hidden border-y border-slate-800">
      {/* Background technical grid pattern */}
      <div className="absolute inset-0 bg-cyber-grid pointer-events-none opacity-40" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium tracking-wider uppercase bg-cyan-950/70 border border-cyan-500/40 text-cyan-300 mb-4">
            <ShieldAlert className="w-3.5 h-3.5 text-cyan-400" />
            <span>Interactive Architectural Diagnostic</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
            AI & Multi-Cloud Security Risk Snapshot
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Answer 6 architecture questions to receive an objective, directional threat evaluation powered by our offensive security and cloud hardening methodology.
          </p>
        </div>

        {/* Diagnostic Container Card */}
        <div className="bg-[#0b0f19] rounded-2xl border border-slate-800/90 shadow-2xl overflow-hidden backdrop-blur-sm">
          {!result ? (
            <div>
              {/* Progress Bar & Steps Indicator */}
              <div className="border-b border-slate-800 bg-[#090d16] px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-cyan-400 font-semibold uppercase tracking-wider">
                    Step {currentStep} of {totalSteps}
                  </span>
                  <span className="text-slate-500 text-xs">|</span>
                  <span className="text-xs font-medium text-slate-300">
                    {currentStep === 1 && 'Deployed AI Capabilities'}
                    {currentStep === 2 && 'Cloud & Compute Infrastructure'}
                    {currentStep === 3 && 'Data Ingestion & Model Egress'}
                    {currentStep === 4 && 'AI Governance & Policy Framework'}
                    {currentStep === 5 && 'Incident Telemetry & Logging'}
                    {currentStep === 6 && 'Exposure Surface & Org Scale'}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  {Array.from({ length: totalSteps }).map((_, idx) => (
                    <div
                      key={idx}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        idx + 1 === currentStep
                          ? 'w-7 bg-blue-500'
                          : idx + 1 < currentStep
                          ? 'w-3 bg-emerald-500'
                          : 'w-3 bg-slate-800'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Step Question Bodies */}
              <div className="p-6 sm:p-10 min-h-[360px] flex flex-col justify-between">
                {/* Step 1: AI Features */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2 flex items-center gap-2">
                        <Cpu className="w-5 h-5 text-blue-400" />
                        What AI capabilities have you shipped or deployed into staging?
                      </h3>
                      <p className="text-sm text-slate-400">
                        Select all production or pre-production AI architectures in your environment.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {[
                        {
                          id: 'llm_chat',
                          label: 'LLM Chat / Copilot Interfaces',
                          desc: 'User-facing conversational endpoints via OpenAI, Anthropic, or open weights.',
                        },
                        {
                          id: 'rag_retrieval',
                          label: 'RAG (Retrieval-Augmented Generation)',
                          desc: 'Vector databases (Pinecone, pgvector, Qdrant) indexing internal docs or customer data.',
                        },
                        {
                          id: 'autonomous_agents',
                          label: 'Agents with Function / Tool Calling',
                          desc: 'LLMs with programmatic authority to execute APIs, DB queries, or trigger webhooks.',
                        },
                        {
                          id: 'fine_tuned',
                          label: 'Self-Hosted / Fine-Tuned Weights',
                          desc: 'Custom open-source models deployed via vLLM, TGI, or cloud-hosted GPUs.',
                        },
                        {
                          id: 'none',
                          label: 'No Production AI Shipped Yet',
                          desc: 'Currently in planning, POC stage, or non-AI software only.',
                        },
                      ].map((item) => {
                        const isSelected = answers.aiFeatures.includes(item.id);
                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => toggleAiFeature(item.id)}
                            className={`p-4 rounded-xl text-left border transition-all ${
                              isSelected
                                ? 'bg-blue-950/50 border-blue-500/70 shadow-sm shadow-blue-500/10'
                                : 'bg-slate-900/40 border-slate-800 hover:border-slate-700'
                            }`}
                          >
                            <div className="flex items-start justify-between">
                              <span className="font-semibold text-sm text-slate-100">{item.label}</span>
                              <div
                                className={`w-4 h-4 rounded mt-0.5 flex items-center justify-center border transition-colors ${
                                  isSelected ? 'bg-blue-600 border-blue-500 text-white' : 'border-slate-700'
                                }`}
                              >
                                {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                              </div>
                            </div>
                            <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">{item.desc}</p>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Step 2: Cloud Providers */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2 flex items-center gap-2">
                        <Layers className="w-5 h-5 text-blue-400" />
                        Where is your primary application and AI compute hosted?
                      </h3>
                      <p className="text-sm text-slate-400">
                        Multi-cloud environments frequently feature unmonitored cross-account IAM trust relationships.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {[
                        { id: 'aws', label: 'Amazon Web Services (AWS)', desc: 'EKS, Bedrock, SageMaker, ECS, S3, IAM' },
                        { id: 'gcp', label: 'Google Cloud Platform (GCP)', desc: 'GKE, Vertex AI, BigQuery, VPC Service Controls' },
                        { id: 'azure', label: 'Microsoft Azure', desc: 'Azure OpenAI Service, AKS, Entra ID' },
                        { id: 'hybrid_onprem', label: 'Dedicated Bare Metal / Hybrid Cloud', desc: 'Equinix, CoreWeave, Lambda Labs, or On-Premises GPU clusters' },
                      ].map((item) => {
                        const isSelected = answers.cloudProviders.includes(item.id);
                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => toggleCloud(item.id)}
                            className={`p-4 rounded-xl text-left border transition-all ${
                              isSelected
                                ? 'bg-blue-950/50 border-blue-500/70 shadow-sm shadow-blue-500/10'
                                : 'bg-slate-900/40 border-slate-800 hover:border-slate-700'
                            }`}
                          >
                            <div className="flex items-start justify-between">
                              <span className="font-semibold text-sm text-slate-100">{item.label}</span>
                              <div
                                className={`w-4 h-4 rounded mt-0.5 flex items-center justify-center border transition-colors ${
                                  isSelected ? 'bg-blue-600 border-blue-500 text-white' : 'border-slate-700'
                                }`}
                              >
                                {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                              </div>
                            </div>
                            <p className="text-xs text-slate-400 mt-1.5">{item.desc}</p>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Step 3: Data Ingestion & Third-Party APIs */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2 flex items-center gap-2">
                        <Lock className="w-5 h-5 text-blue-400" />
                        How does your application handle sensitive or customer data with models?
                      </h3>
                      <p className="text-sm text-slate-400">
                        Inference calls transmitting customer PII without token anonymization represent significant regulatory exposure.
                      </p>
                    </div>

                    <div className="space-y-3">
                      {[
                        {
                          id: 'pii_confidential',
                          label: 'Third-party APIs process raw PII / customer confidential data',
                          desc: 'Prompts include customer names, financial records, medical info, or internal proprietary IP sent to OpenAI / Anthropic / Google.',
                        },
                        {
                          id: 'anonymized',
                          label: 'Sanitized or tokenized data only before egress',
                          desc: 'Automated PII scrubbing or regex masking gateway filters prompts before dispatching to external APIs.',
                        },
                        {
                          id: 'self_hosted',
                          label: 'Internal VPC-isolated models only (Zero external egress)',
                          desc: 'Models operate inside closed VPC perimeters with no outbound Internet communication.',
                        },
                        {
                          id: 'no_external',
                          label: 'Only public/synthetic non-confidential content evaluated',
                          desc: 'AI usage is limited to public documentation summaries or marketing copy.',
                        },
                      ].map((item) => {
                        const isSelected = answers.dataHandling === item.id;
                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => setAnswers({ ...answers, dataHandling: item.id })}
                            className={`w-full p-4 rounded-xl text-left border transition-all ${
                              isSelected
                                ? 'bg-blue-950/50 border-blue-500/70 shadow-sm shadow-blue-500/10'
                                : 'bg-slate-900/40 border-slate-800 hover:border-slate-700'
                            }`}
                          >
                            <div className="flex items-start justify-between">
                              <span className="font-semibold text-sm text-slate-100">{item.label}</span>
                              <div
                                className={`w-4 h-4 rounded-full mt-0.5 flex items-center justify-center border ${
                                  isSelected ? 'border-blue-400 bg-blue-500' : 'border-slate-700'
                                }`}
                              >
                                {isSelected && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                              </div>
                            </div>
                            <p className="text-xs text-slate-400 mt-1.5">{item.desc}</p>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Step 4: AI Governance Policy */}
                {currentStep === 4 && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2 flex items-center gap-2">
                        <FileText className="w-5 h-5 text-blue-400" />
                        What is the current state of your AI governance & acceptable use policy?
                      </h3>
                      <p className="text-sm text-slate-400">
                        Required under ISO/IEC 42001 and the EU AI Act for compliant enterprise operations.
                      </p>
                    </div>

                    <div className="space-y-3">
                      {[
                        {
                          id: 'documented',
                          label: 'Formally documented and mapped to NIST AI RMF / ISO 42001',
                          desc: 'Approved risk taxonomy, data provenance registers, and model evaluation protocols maintained in Git or GRC.',
                        },
                        {
                          id: 'ad_hoc',
                          label: 'Informal internal guidelines and engineering heuristics',
                          desc: 'Developers have general guidance against pasting customer secrets into ChatGPT, but no enforced verification.',
                        },
                        {
                          id: 'none',
                          label: 'No documented AI security policy or risk register',
                          desc: 'Engineers adopt AI APIs ad-hoc with no central oversight or architectural review.',
                        },
                      ].map((item) => {
                        const isSelected = answers.governancePolicy === item.id;
                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => setAnswers({ ...answers, governancePolicy: item.id })}
                            className={`w-full p-4 rounded-xl text-left border transition-all ${
                              isSelected
                                ? 'bg-blue-950/50 border-blue-500/70 shadow-sm shadow-blue-500/10'
                                : 'bg-slate-900/40 border-slate-800 hover:border-slate-700'
                            }`}
                          >
                            <div className="flex items-start justify-between">
                              <span className="font-semibold text-sm text-slate-100">{item.label}</span>
                              <div
                                className={`w-4 h-4 rounded-full mt-0.5 flex items-center justify-center border ${
                                  isSelected ? 'border-blue-400 bg-blue-500' : 'border-slate-700'
                                }`}
                              >
                                {isSelected && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                              </div>
                            </div>
                            <p className="text-xs text-slate-400 mt-1.5">{item.desc}</p>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Step 5: Incident Telemetry & Monitoring */}
                {currentStep === 5 && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2 flex items-center gap-2">
                        <Activity className="w-5 h-5 text-blue-400" />
                        How mature is your real-time LLM telemetry and security monitoring?
                      </h3>
                      <p className="text-sm text-slate-400">
                        Visibility into prompt injection payloads and anomalous token consumption surges.
                      </p>
                    </div>

                    <div className="space-y-3">
                      {[
                        {
                          id: 'mature',
                          label: 'Real-time prompt telemetry + automated SOC alerting playbooks',
                          desc: 'Tracing gateways (e.g. Langfuse, Helicone, or OpenTelemetry) with anomaly detection on jailbreak keywords and token volume.',
                        },
                        {
                          id: 'basic',
                          label: 'Standard cloud infrastructure logs (CloudWatch / CloudTrail / Datadog)',
                          desc: 'HTTP status codes and latency metrics are tracked, but prompt text and tool execution payloads are opaque.',
                        },
                        {
                          id: 'none',
                          label: 'No centralized logging or observability for AI calls',
                          desc: 'Inference traffic is unlogged; security team has zero visibility into active prompt tampering.',
                        },
                      ].map((item) => {
                        const isSelected = answers.incidentMaturity === item.id;
                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => setAnswers({ ...answers, incidentMaturity: item.id })}
                            className={`w-full p-4 rounded-xl text-left border transition-all ${
                              isSelected
                                ? 'bg-blue-950/50 border-blue-500/70 shadow-sm shadow-blue-500/10'
                                : 'bg-slate-900/40 border-slate-800 hover:border-slate-700'
                            }`}
                          >
                            <div className="flex items-start justify-between">
                              <span className="font-semibold text-sm text-slate-100">{item.label}</span>
                              <div
                                className={`w-4 h-4 rounded-full mt-0.5 flex items-center justify-center border ${
                                  isSelected ? 'border-blue-400 bg-blue-500' : 'border-slate-700'
                                }`}
                              >
                                {isSelected && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                              </div>
                            </div>
                            <p className="text-xs text-slate-400 mt-1.5">{item.desc}</p>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Step 6: Exposure Surface & Team Scale */}
                {currentStep === 6 && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2 flex items-center gap-2">
                        <Server className="w-5 h-5 text-blue-400" />
                        What is your external exposure surface and engineering scale?
                      </h3>
                      <p className="text-sm text-slate-400">
                        Adversaries prioritize unauthenticated endpoints and organizations with lean dedicated security headcount.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono uppercase text-slate-400 tracking-wider mb-2">
                          Endpoint Exposure Surface
                        </label>
                        <div className="space-y-2">
                          {[
                            { id: 'public_internet', label: 'Public Internet (Unauthenticated)' },
                            { id: 'b2b_authenticated', label: 'B2B Customers (Authenticated Sessions)' },
                            { id: 'internal_only', label: 'Internal Employees Only (Behind VPN/SSO)' },
                          ].map((surface) => (
                            <button
                              key={surface.id}
                              type="button"
                              onClick={() => setAnswers({ ...answers, exposureSurface: surface.id })}
                              className={`w-full p-3 rounded-lg text-left text-xs border transition-all ${
                                answers.exposureSurface === surface.id
                                  ? 'bg-blue-950/50 border-blue-500 text-white font-medium'
                                  : 'bg-slate-900/40 border-slate-800 text-slate-300 hover:border-slate-700'
                              }`}
                            >
                              {surface.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-mono uppercase text-slate-400 tracking-wider mb-2">
                          Engineering & SecOps Team Size
                        </label>
                        <div className="space-y-2">
                          {[
                            { id: '1-20', label: '1–20 Engineers (No Dedicated SecOps)' },
                            { id: '21-100', label: '21–100 Engineers (1–2 Security Engineers)' },
                            { id: '100+', label: '100+ Engineers (Dedicated Security Org)' },
                          ].map((size) => (
                            <button
                              key={size.id}
                              type="button"
                              onClick={() => setAnswers({ ...answers, teamSize: size.id })}
                              className={`w-full p-3 rounded-lg text-left text-xs border transition-all ${
                                answers.teamSize === size.id
                                  ? 'bg-blue-950/50 border-blue-500 text-white font-medium'
                                  : 'bg-slate-900/40 border-slate-800 text-slate-300 hover:border-slate-700'
                              }`}
                            >
                              {size.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation Controls */}
                <div className="pt-8 border-t border-slate-800/80 flex items-center justify-between mt-8">
                  {currentStep > 1 ? (
                    <button
                      type="button"
                      onClick={() => setCurrentStep((prev) => prev - 1)}
                      className="px-4 py-2 rounded-lg text-sm text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700 flex items-center gap-1.5 transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      Back
                    </button>
                  ) : (
                    <div />
                  )}

                  {currentStep < totalSteps ? (
                    <button
                      type="button"
                      onClick={() => setCurrentStep((prev) => prev + 1)}
                      className="px-5 py-2.5 rounded-lg text-sm font-semibold bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/20 flex items-center gap-2 transition-all cursor-pointer"
                    >
                      Continue
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleRunAssessment}
                      disabled={isLoading}
                      className="px-6 py-2.5 rounded-lg text-sm font-semibold bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/25 flex items-center gap-2 transition-all cursor-pointer disabled:opacity-50"
                    >
                      Generate Threat Snapshot
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ) : (
            /* Results View */
            <div className="p-6 sm:p-10 space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
              {/* Subtle Success / Reward Celebration Banner */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-950/40 via-blue-950/40 to-slate-900/60 border border-emerald-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-lg shadow-emerald-950/20">
                <div className="flex items-center gap-3">
                  <div className="relative flex h-3 w-3 shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
                        Analysis Complete & Verified
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-800/80 text-emerald-300 font-semibold">
                        Full Attack Surface Mapped
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 mt-0.5">
                      Threat modeling matrix synthesized across your runtime parameters, cloud perimeters, and data boundaries.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={fireSuccessConfetti}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium text-slate-300 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 transition-all cursor-pointer shrink-0"
                  title="Re-run celebration confetti"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Celebration</span>
                </button>
              </div>

              {/* Header with Risk Index and Gauge */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center pb-8 border-b border-slate-800">
                <div className="md:col-span-5 flex justify-center">
                  <RiskGauge score={result.riskScore} tier={result.riskTier} size={230} />
                </div>
                <div className="md:col-span-7 space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono uppercase tracking-widest text-slate-400">
                      Evaluated Environment:
                    </span>
                    <span className="text-xs font-mono font-semibold text-blue-400 bg-blue-950/60 px-2 py-0.5 rounded border border-blue-900">
                      {answers.cloudProviders.join(' + ').toUpperCase()}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-white tracking-tight">
                    Executive Threat Synthesis
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {result.summary}
                  </p>

                  {/* Primary Risk Drivers */}
                  {result.primaryRiskDrivers && (
                    <div className="pt-2">
                      <p className="text-xs font-mono uppercase text-slate-400 tracking-wider mb-2">
                        Primary Attack Surface Drivers:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {result.primaryRiskDrivers.map((driver, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800 text-slate-300 text-xs border border-slate-700/60 font-medium"
                          >
                            <AlertTriangle className="w-3 h-3 text-amber-400" />
                            {driver}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* 3 Prioritized Findings */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-base font-semibold text-white uppercase tracking-wider text-xs font-mono flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-400" />
                    Prioritized Technical Findings ({result.findings.length})
                  </h4>
                  <span className="text-xs text-slate-500">
                    Ranked by immediate adversarial exploitability
                  </span>
                </div>

                <div className="space-y-3">
                  {result.findings.map((f, index) => {
                    const isExpanded = expandedFinding === f.id;
                    const severityColors = {
                      Critical: 'bg-red-950/50 text-red-400 border-red-500/50',
                      High: 'bg-amber-950/50 text-amber-400 border-amber-500/50',
                      Medium: 'bg-yellow-950/50 text-yellow-400 border-yellow-500/50',
                      Low: 'bg-emerald-950/50 text-emerald-400 border-emerald-500/50',
                    }[f.severity] || 'bg-slate-800 text-slate-300 border-slate-700';

                    return (
                      <div
                        key={f.id || index}
                        className="rounded-xl border border-slate-800 bg-slate-900/50 hover:border-slate-700 transition-all overflow-hidden"
                      >
                        <button
                          type="button"
                          onClick={() => setExpandedFinding(isExpanded ? null : f.id)}
                          className="w-full p-4 text-left flex items-start justify-between gap-4 cursor-pointer"
                        >
                          <div className="flex items-start gap-3">
                            <span className="font-mono text-xs text-slate-500 mt-0.5">
                              0{index + 1}
                            </span>
                            <div>
                              <div className="flex items-center gap-2 flex-wrap mb-1">
                                <span className={`text-[11px] font-mono font-semibold uppercase px-2 py-0.5 rounded border ${severityColors}`}>
                                  {f.severity}
                                </span>
                                <span className="text-xs text-slate-400 font-mono">
                                  {f.category}
                                </span>
                              </div>
                              <h5 className="font-semibold text-sm text-slate-100">
                                {f.title}
                              </h5>
                            </div>
                          </div>
                          <ChevronDown
                            className={`w-4 h-4 text-slate-400 mt-1 transition-transform duration-200 ${
                              isExpanded ? 'rotate-180' : ''
                            }`}
                          />
                        </button>

                        {isExpanded && (
                          <div className="px-4 pb-4 pt-2 border-t border-slate-800/60 bg-slate-950/40 text-xs space-y-3">
                            <div>
                              <span className="font-mono uppercase text-slate-400 font-semibold text-[10px]">
                                Technical Impact:
                              </span>
                              <p className="text-slate-300 mt-0.5 leading-relaxed">
                                {f.impact}
                              </p>
                            </div>
                            <div>
                              <span className="font-mono uppercase text-slate-400 font-semibold text-[10px]">
                                Underlying Vulnerability:
                              </span>
                              <p className="text-slate-300 mt-0.5 leading-relaxed">
                                {f.technicalExplanation}
                              </p>
                            </div>
                            <div className="p-2.5 rounded bg-blue-950/40 border border-blue-800/40 text-blue-200">
                              <span className="font-mono uppercase text-blue-400 font-semibold text-[10px] block mb-0.5">
                                Recommended Remediation Architecture:
                              </span>
                              <p className="leading-relaxed">
                                {f.recommendedMitigation}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Recommended Practice & Action Banner */}
              <div className="p-5 rounded-xl bg-slate-800/40 border border-slate-700/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[11px] font-mono text-blue-400 uppercase font-semibold">
                    Target Engagement Recommendation
                  </span>
                  <h4 className="text-lg font-bold text-white mt-0.5">
                    {result.recommendedPractice.title}
                  </h4>
                  <p className="text-xs text-slate-300 mt-1 max-w-xl">
                    {result.recommendedPractice.rationale}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={handleConsultationHandoff}
                    className="px-5 py-2.5 rounded-lg text-sm font-semibold bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer whitespace-nowrap"
                  >
                    Discuss Findings — Book Call
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="px-3.5 py-2.5 rounded-lg text-xs text-slate-400 hover:text-white border border-slate-700 hover:border-slate-600 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    Reset Snapshot
                  </button>
                </div>
              </div>

              {/* Honest Disclaimer */}
              <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-slate-400 flex items-start gap-2.5">
                <Info className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  <strong className="text-slate-300">Methodology Notice:</strong> This snapshot is a directional self-assessment based on architectural heuristics and generative threat modeling. It is not an official penetration test, audit attestation, or substitute for a hands-on adversarial threat modeling engagement.
                </p>
              </div>
            </div>
          )}

          {/* Loading Overlay */}
          {isLoading && (
            <div className="p-16 flex flex-col items-center justify-center space-y-4 text-center">
              <div className="relative w-12 h-12">
                <div className="w-12 h-12 rounded-full border-2 border-slate-800 border-t-blue-500 animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <ShieldAlert className="w-5 h-5 text-blue-400" />
                </div>
              </div>
              <div>
                <h4 className="text-base font-semibold text-white">Analyzing Architecture</h4>
                <p className="text-xs font-mono text-blue-400 mt-1">{loadingPhase}</p>
              </div>
              <p className="text-xs text-slate-500 max-w-sm">
                Running prompt injection taxonomy matrix against {answers.cloudProviders.length} cloud provider environments...
              </p>
            </div>
          )}

          {/* Error Notice */}
          {error && !isLoading && (
            <div className="p-4 m-6 bg-red-950/40 border border-red-800/60 rounded-xl text-xs text-red-300 flex items-center justify-between">
              <span>{error}</span>
              <button
                type="button"
                onClick={handleRunAssessment}
                className="underline font-semibold hover:text-white ml-3"
              >
                Retry
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
