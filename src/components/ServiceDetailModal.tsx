import React from 'react';
import { ServiceDetail } from '../types';
import { X, CheckCircle2, HelpCircle, ArrowRight, ShieldCheck, FileCode, Layers } from 'lucide-react';

interface ServiceDetailModalProps {
  service: ServiceDetail | null;
  onClose: () => void;
  onBookConsultation: (serviceTitle: string) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  onClose,
  onBookConsultation,
}) => {
  if (!service) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-4xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden my-8 text-slate-100 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 sm:p-8 bg-slate-950/80 border-b border-slate-800 flex items-start justify-between gap-4 shrink-0">
          <div>
            <div className="flex items-center gap-2 flex-wrap mb-2">
              <span className="px-2.5 py-0.5 rounded text-[11px] font-mono uppercase bg-blue-950/70 border border-blue-800 text-blue-400">
                Service Specification
              </span>
              <span className="text-xs text-slate-400 font-mono">
                Code: SEC-{service.id.toUpperCase()}
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {service.title}
            </h3>
            <p className="text-sm text-slate-300 mt-1">
              {service.tagline}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors shrink-0"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8 flex-1">
          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {service.tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-md text-xs font-mono bg-slate-800 text-slate-300 border border-slate-700/60"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* 1. The Core Engineering Problem */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold flex items-center gap-2">
              <Layers className="w-4 h-4" />
              1. The Specific Problem We Address
            </h4>
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 text-sm text-slate-300 leading-relaxed">
              {service.problem}
            </div>
          </div>

          {/* 2. Structured Methodology */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-blue-400 font-semibold flex items-center gap-2">
              <FileCode className="w-4 h-4" />
              2. Technical Approach & Phases
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {service.methodology.map((phase, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-slate-950/40 border border-slate-800/80 space-y-1"
                >
                  <span className="text-xs font-mono font-bold text-white block">
                    {phase.phase}
                  </span>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {phase.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Tangible Deliverables */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" />
              3. Verifiable Engineering Deliverables
            </h4>
            <div className="space-y-2">
              {service.deliverables.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-lg bg-slate-950/50 border border-slate-800 flex items-start gap-3"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-xs text-slate-200 leading-relaxed font-medium">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 4. Technical FAQ */}
          {service.faq && service.faq.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold flex items-center gap-2">
                <HelpCircle className="w-4 h-4" />
                4. Technical FAQ & Rules of Engagement
              </h4>
              <div className="space-y-3">
                {service.faq.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5"
                  >
                    <h5 className="text-xs font-semibold text-white">
                      Q: {item.question}
                    </h5>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-6 bg-slate-950 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="text-xs text-slate-400 font-mono text-center sm:text-left">
            Estimated turnaround: 2–3 weeks under mutual NDA
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-xs text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700 transition-colors w-full sm:w-auto"
            >
              Close
            </button>
            <button
              type="button"
              onClick={() => {
                onClose();
                onBookConsultation(service.title);
              }}
              className="px-5 py-2 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/30 flex items-center justify-center gap-1.5 transition-all w-full sm:w-auto cursor-pointer"
            >
              <span>Scope This Assessment</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
