import React from 'react';
import { COMPANY_INFO, PRACTICES, SERVICES_LIST } from '../data/contentData';
import { ShieldCheck, Lock, Terminal, ArrowUpRight } from 'lucide-react';

interface FooterProps {
  onSelectServiceTitle: (title: string) => void;
  onNavigateSection: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectServiceTitle, onNavigateSection }) => {
  return (
    <footer className="bg-[#05070a] text-slate-400 text-xs border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-14">
          {/* Col 1: Brand & Identity */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 via-teal-500 to-cyan-600 flex items-center justify-center text-slate-950 font-bold border border-cyan-300/40 shadow-sm shadow-cyan-500/20">
                <ShieldCheck className="w-4 h-4 stroke-[2.5]" />
              </div>
              <span className="font-bold text-white text-base font-sans tracking-tight">
                {COMPANY_INFO.name}
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Engineering-first cloud, SRE & cybersecurity advisory for technical leaders. We design multi-cloud landing zones, implement automated agile GitOps rollouts, cut cloud waste via FinOps, and threat-model AI architectures under real adversarial conditions.
            </p>
            <div className="pt-2 text-[11px] font-mono text-slate-400 space-y-1">
              <div>Encrypted Comms: {COMPANY_INFO.email}</div>
              <div>Direct Wire: {COMPANY_INFO.phone}</div>
              <div>Offices: {COMPANY_INFO.locations.join(' · ')}</div>
            </div>
          </div>

          {/* Col 2: Hyperscaler & Multi-Cloud */}
          <div className="space-y-3">
            <span className="text-[11px] font-mono uppercase text-cyan-400 font-semibold tracking-wider block">
              Multi-Cloud & 24/7 SRE
            </span>
            <ul className="space-y-2">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateSection('multi-cloud-ops')}
                  className="hover:text-white transition-colors text-left"
                >
                  AWS Control Tower & Landing Zones
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateSection('multi-cloud-ops')}
                  className="hover:text-white transition-colors text-left"
                >
                  Google Cloud Workload Identity
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateSection('multi-cloud-ops')}
                  className="hover:text-white transition-colors text-left"
                >
                  Azure CAF & Entra ID PIM
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateSection('multi-cloud-ops')}
                  className="text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1"
                >
                  24/7 Managed SRE NOC
                  <ArrowUpRight className="w-3 h-3" />
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: DevOps & FinOps */}
          <div className="space-y-3">
            <span className="text-[11px] font-mono uppercase text-amber-400 font-semibold tracking-wider block">
              DevOps & FinOps
            </span>
            <ul className="space-y-2">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateSection('devops-support')}
                  className="hover:text-white transition-colors text-left"
                >
                  Trunk-Based GitOps Delivery
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateSection('devops-support')}
                  className="hover:text-white transition-colors text-left"
                >
                  Automated Canary Rollback
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateSection('finops-optimization')}
                  className="hover:text-white transition-colors text-left"
                >
                  Multi-Cloud Cost Reduction
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateSection('finops-optimization')}
                  className="text-amber-400 hover:text-amber-300 transition-colors flex items-center gap-1"
                >
                  FinOps Waste Reclamation ROI
                  <ArrowUpRight className="w-3 h-3" />
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Organization & Integrity */}
          <div className="space-y-3">
            <span className="text-[11px] font-mono uppercase text-slate-200 font-semibold tracking-wider block">
              Advisory Integrity
            </span>
            <ul className="space-y-2">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateSection('process')}
                  className="hover:text-white transition-colors text-left"
                >
                  Engagement Operating Model
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateSection('team')}
                  className="hover:text-white transition-colors text-left"
                >
                  Principal Biographies
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateSection('insights')}
                  className="hover:text-white transition-colors text-left"
                >
                  Research & Field Notes
                </button>
              </li>
              <li className="pt-2 text-slate-500 font-mono text-[10px]">
                Zero Vendor Resale Policy
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div className="flex items-center gap-2">
            <Lock className="w-3.5 h-3.5 text-slate-600" />
            <span>
              &copy; {new Date().getFullYear()} {COMPANY_INFO.name}. All rights reserved. Operating under mutual confidentiality agreements.
            </span>
          </div>

          <div className="flex items-center gap-5">
            <span className="hover:text-slate-400 cursor-pointer">Responsible Disclosure</span>
            <span>•</span>
            <span className="hover:text-slate-400 cursor-pointer">Security & Privacy</span>
            <span>•</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms of Engagement</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
