import React, { useState, useEffect } from 'react';
import { ContactFormData } from '../types';
import { COMPANY_INFO } from '../data/contentData';
import {
  ShieldCheck,
  Send,
  Lock,
  Mail,
  Phone,
  Key,
  CheckCircle2,
  XCircle,
  AlertCircle
} from 'lucide-react';

interface ContactSectionProps {
  prefilledData: {
    score: number;
    tier: string;
    recommendedPractice: string;
    keyFindingSummary: string;
  } | null;
  onClearPrefill: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  prefilledData,
  onClearPrefill,
}) => {
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    workEmail: '',
    companyName: '',
    targetPractice: 'AI Security & Governance',
    timeline: 'Within 30 days',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (prefilledData) {
      setFormData((prev) => ({
        ...prev,
        targetPractice: prefilledData.recommendedPractice || 'AI Security & Governance',
        message: `Discussing findings from our AI Security Risk Snapshot (${prefilledData.tier} Exposure, Score: ${prefilledData.score}/100).\nKey focus: ${prefilledData.keyFindingSummary}`,
      }));
    }
  }, [prefilledData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 800);
  };

  return (
    <section id="contact" className="py-16 sm:py-24 bg-slate-950 text-slate-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Restated Value Prop / Final CTA Band */}
        <div className="mb-12 sm:mb-16 p-6 sm:p-12 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950 border border-slate-800 text-center space-y-4 sm:space-y-6 shadow-2xl relative overflow-hidden">
          <div className="max-w-3xl mx-auto space-y-3 sm:space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-wider bg-blue-500/20 text-blue-400 border border-blue-500/30">
              <ShieldCheck className="w-4 h-4" />
              Direct Principal Access
            </div>
            <h2 className="text-xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
              Ready to eliminate critical attack surfaces before your adversaries find them?
            </h2>
            <p className="text-slate-300 text-xs sm:text-base leading-relaxed">
              Book a 30-minute confidential scoping call with a senior security engineer. We will review your architecture under mutual NDA and provide a definitive assessment proposal within 48 hours.
            </p>
          </div>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12">
          {/* Left Column: Direct Outreach & Confidentiality Details */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-blue-400 font-semibold mb-2">
                Technical Engagement Inquiries
              </div>
              <h3 className="text-2xl font-bold text-white tracking-tight">
                Confidential Scoping
              </h3>
              <p className="text-slate-400 text-sm mt-2 leading-relaxed">
                All communications and architecture disclosures are held strictly confidential. We execute bilateral non-disclosure agreements prior to reviewing system topology diagrams.
              </p>
            </div>

            <div className="space-y-4 pt-2">
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                  <Mail className="w-3.5 h-3.5 text-blue-400" />
                  Encrypted Inquiries
                </div>
                <div className="text-sm font-semibold text-white font-mono">
                  {COMPANY_INFO.email}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                  <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  Direct Advisory Line
                </div>
                <div className="text-sm font-semibold text-white font-mono">
                  {COMPANY_INFO.phone}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                  <Key className="w-3.5 h-3.5 text-amber-400" />
                  PGP Key Fingerprint
                </div>
                <div className="text-xs font-mono text-slate-300 break-all">
                  {COMPANY_INFO.pgpKeyId}
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-blue-950/30 border border-blue-900/60 text-xs text-blue-300 flex items-start gap-3">
              <Lock className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                We do not sell software licenses or accept referral commissions from security vendors. Our assessments are strictly uncorrupted by product reselling.
              </p>
            </div>
          </div>

          {/* Right Column: Consultation Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl">
              {/* Prefill Notice Banner */}
              {prefilledData && !submitted && (
                <div className="mb-6 p-4 rounded-xl bg-blue-950/60 border border-blue-800/80 flex items-start justify-between gap-3 text-xs">
                  <div className="space-y-1">
                    <span className="font-mono text-[10px] uppercase font-bold text-blue-300 block">
                      Context Attached from Risk Snapshot:
                    </span>
                    <p className="text-white font-medium">
                      {prefilledData.tier} Risk Exposure ({prefilledData.score}/100) — Practice: {prefilledData.recommendedPractice}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={onClearPrefill}
                    className="text-slate-400 hover:text-white"
                    title="Remove prefilled assessment data"
                  >
                    <XCircle className="w-4 h-4" />
                  </button>
                </div>
              )}

              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5 font-medium">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="Alex Morgan"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-700 text-white text-sm focus:border-blue-500 focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5 font-medium">
                        Work Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.workEmail}
                        onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                        placeholder="alex@company.com"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-700 text-white text-sm focus:border-blue-500 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5 font-medium">
                        Company / Organization *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        placeholder="Acme Technologies"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-700 text-white text-sm focus:border-blue-500 focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5 font-medium">
                        Primary Practice Area
                      </label>
                      <select
                        value={formData.targetPractice}
                        onChange={(e) => setFormData({ ...formData, targetPractice: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-700 text-white text-sm focus:border-blue-500 focus:outline-none transition-colors"
                      >
                        <option value="AI Security & Governance">AI Security & Governance</option>
                        <option value="DevSecOps & Application Security">DevSecOps & Application Security</option>
                        <option value="Cloud Security">Cloud Infrastructure Security</option>
                        <option value="Advisory & Compliance">Advisory & Compliance</option>
                        <option value="Custom Multi-Scope Review">Custom Multi-Scope Review</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5 font-medium">
                      Anticipated Engagement Timeline
                    </label>
                    <select
                      value={formData.timeline}
                      onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-700 text-white text-sm focus:border-blue-500 focus:outline-none transition-colors"
                    >
                      <option value="Immediate (< 2 weeks)">Immediate (&lt; 2 weeks)</option>
                      <option value="Within 30 days">Within 30 days</option>
                      <option value="Q3/Q4 Planning">Upcoming Quarter Planning</option>
                      <option value="Informational / Early Scoping">Informational / Early Scoping</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5 font-medium">
                      Technical Scope & Architecture Context
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Briefly describe your environment (e.g. AWS EKS, Vertex AI RAG pipeline, SOC 2 audit deadline)..."
                      className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-700 text-white text-sm focus:border-blue-500 focus:outline-none transition-colors leading-relaxed"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-lg text-sm font-semibold bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Transmitting Encrypted Request...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Scoping Request</span>
                      </>
                    )}
                  </button>

                  <p className="text-[11px] text-slate-400 text-center font-mono">
                    Under mutual NDA. A principal will reply within 1 business day.
                  </p>
                </form>
              ) : (
                /* Success View */
                <div className="py-12 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-950 border border-emerald-700 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-bold text-white">
                    Scoping Request Logged
                  </h4>
                  <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                    Thank you, {formData.fullName}. A practice lead will review your architecture parameters and reach out at <strong className="text-white">{formData.workEmail}</strong> with a calendar invite and mutual NDA draft within 24 hours.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="mt-4 px-4 py-2 rounded-lg text-xs font-semibold bg-slate-800 text-slate-300 hover:text-white"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
