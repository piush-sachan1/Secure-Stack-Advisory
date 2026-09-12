import React, { useState, useRef, useEffect } from 'react';
import { COMPANY_INFO } from '../data/contentData';
import {
  ShieldCheck,
  Lock,
  ArrowUpRight,
  Instagram,
  Facebook,
  Youtube,
  ExternalLink,
  Settings,
  Globe,
  Check,
  ChevronUp,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SupportedLanguage } from '../types';

interface FooterProps {
  onSelectServiceTitle: (title: string) => void;
  onNavigateSection: (sectionId: string) => void;
}

const XIcon: React.FC<{ className?: string }> = ({ className = 'w-3.5 h-3.5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export const Footer: React.FC<FooterProps> = ({ onSelectServiceTitle, onNavigateSection }) => {
  const { channels, setIsChannelModalOpen, t, language, setLanguage } = useApp();
  const [isLangOpen, setIsLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  const languagesList: { code: SupportedLanguage; label: string; flag: string; target: string }[] = [
    { code: 'en', label: 'English', flag: '🇬🇧', target: 'Global / US' },
    { code: 'de', label: 'Deutsch', flag: '🇩🇪', target: 'DACH / EU' },
    { code: 'fr', label: 'Français', flag: '🇫🇷', target: 'France / NIS-2' },
  ];

  const currentLangObj = languagesList.find((l) => l.code === language) || languagesList[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <footer className="bg-[#05070a] text-slate-400 text-xs border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-8">
        {/* Main Footer Navigation Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10">
          {/* Col 1: Brand & Identity */}
          <div className="sm:col-span-2 lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 via-teal-500 to-cyan-600 flex items-center justify-center text-slate-950 font-bold border border-cyan-300/40 shadow-sm shadow-cyan-500/20">
                <ShieldCheck className="w-4 h-4 stroke-[2.5]" />
              </div>
              <span className="font-bold text-white text-base font-sans tracking-tight">
                {COMPANY_INFO.name}
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              {t.footer.tagline}
            </p>
            <div className="pt-2 text-[11px] font-mono text-slate-400 space-y-1">
              <div>{t.footer.encryptedComms}: {COMPANY_INFO.email}</div>
              <div>{t.footer.directWire}: {COMPANY_INFO.phone}</div>
              <div>{t.footer.locations}: {COMPANY_INFO.locations.join(' · ')}</div>
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
                  onClick={() => onNavigateSection('compliance-tracker')}
                  className="text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1"
                >
                  SOC 2 & ISO 27001 Tracker
                  <ArrowUpRight className="w-3 h-3" />
                </button>
              </li>
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
                {t.footer.zeroVendorPolicy}
              </li>
            </ul>
          </div>
        </div>

        {/* Compact Dedicated Social Media Channels: X.com, Instagram, Facebook, YouTube */}
        <div className="p-3.5 sm:p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-2.5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-800/60">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-cyan-400 font-semibold">
                {t.socials.sectionTitle}
              </span>
              <span className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-cyan-950/70 text-cyan-300 border border-cyan-800/60">
                Verified Feeds
              </span>
              <span className="text-[11px] text-slate-400 hidden md:inline">
                • Threat intel & announcements
              </span>
            </div>

            <button
              type="button"
              onClick={() => setIsChannelModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono text-cyan-300 bg-cyan-950/50 hover:bg-cyan-900/60 border border-cyan-700/50 hover:border-cyan-400 transition-all cursor-pointer self-start sm:self-auto"
              title="Configure social handles"
            >
              <Settings className="w-3 h-3" />
              <span>{t.socials.editChannelsBtn}</span>
            </button>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-2.5">
            {/* X.com Card */}
            <a
              href={channels.x?.url || 'https://x.com/VectorboundSec'}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-2.5 sm:p-3 rounded-lg bg-slate-900/50 hover:bg-slate-900/90 border border-slate-800/80 hover:border-slate-600 transition-all flex flex-col justify-between space-y-1.5"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md bg-black border border-slate-700 flex items-center justify-center text-white shrink-0 group-hover:scale-105 transition-transform">
                    <XIcon className="w-3 h-3" />
                  </div>
                  <div className="truncate">
                    <span className="text-[9px] font-mono uppercase tracking-wider text-slate-400 block leading-none">
                      X.com
                    </span>
                    <span className="text-xs font-bold text-white font-mono group-hover:text-cyan-300 transition-colors truncate block">
                      {channels.x?.name || '@VectorboundSec'}
                    </span>
                  </div>
                </div>
                <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-cyan-400 transition-colors shrink-0" />
              </div>
              <p className="text-[10px] text-slate-400 line-clamp-1 leading-snug">
                {channels.x?.description || 'Threat advisories & alerts'}
              </p>
            </a>

            {/* Instagram Card */}
            <a
              href={channels.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-2.5 sm:p-3 rounded-lg bg-slate-900/50 hover:bg-slate-900/90 border border-slate-800/80 hover:border-pink-500/40 transition-all flex flex-col justify-between space-y-1.5"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 flex items-center justify-center text-white shrink-0 group-hover:scale-105 transition-transform">
                    <Instagram className="w-3.5 h-3.5" />
                  </div>
                  <div className="truncate">
                    <span className="text-[9px] font-mono uppercase tracking-wider text-pink-400 block leading-none">
                      Instagram
                    </span>
                    <span className="text-xs font-bold text-white font-mono group-hover:text-pink-300 transition-colors truncate block">
                      {channels.instagram.name}
                    </span>
                  </div>
                </div>
                <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-pink-400 transition-colors shrink-0" />
              </div>
              <p className="text-[10px] text-slate-400 line-clamp-1 leading-snug">
                {channels.instagram.description}
              </p>
            </a>

            {/* Facebook Card */}
            <a
              href={channels.facebook.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-2.5 sm:p-3 rounded-lg bg-slate-900/50 hover:bg-slate-900/90 border border-slate-800/80 hover:border-blue-500/40 transition-all flex flex-col justify-between space-y-1.5"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md bg-blue-600 flex items-center justify-center text-white shrink-0 group-hover:scale-105 transition-transform">
                    <Facebook className="w-3.5 h-3.5 fill-white" />
                  </div>
                  <div className="truncate">
                    <span className="text-[9px] font-mono uppercase tracking-wider text-blue-400 block leading-none">
                      Facebook
                    </span>
                    <span className="text-xs font-bold text-white font-mono group-hover:text-blue-300 transition-colors truncate block">
                      {channels.facebook.name}
                    </span>
                  </div>
                </div>
                <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-blue-400 transition-colors shrink-0" />
              </div>
              <p className="text-[10px] text-slate-400 line-clamp-1 leading-snug">
                {channels.facebook.description}
              </p>
            </a>

            {/* YouTube Card */}
            <a
              href={channels.youtube.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-2.5 sm:p-3 rounded-lg bg-slate-900/50 hover:bg-slate-900/90 border border-slate-800/80 hover:border-red-500/40 transition-all flex flex-col justify-between space-y-1.5"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md bg-red-600 flex items-center justify-center text-white shrink-0 group-hover:scale-105 transition-transform">
                    <Youtube className="w-3.5 h-3.5" />
                  </div>
                  <div className="truncate">
                    <span className="text-[9px] font-mono uppercase tracking-wider text-red-400 block leading-none">
                      YouTube
                    </span>
                    <span className="text-xs font-bold text-white font-mono group-hover:text-red-300 transition-colors truncate block">
                      {channels.youtube.name}
                    </span>
                  </div>
                </div>
                <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-red-400 transition-colors shrink-0" />
              </div>
              <p className="text-[10px] text-slate-400 line-clamp-1 leading-snug">
                {channels.youtube.description}
              </p>
            </a>
          </div>
        </div>

        {/* Bottom Bar with Compact Language Icon Button & Copyright */}
        <div className="pt-6 border-t border-slate-900/90 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 text-center sm:text-left">
          <div className="flex items-center gap-2 justify-center sm:justify-start">
            <Lock className="w-3.5 h-3.5 text-slate-600 shrink-0" />
            <span>
              &copy; {new Date().getFullYear()} {COMPANY_INFO.name}. {t.footer.rightsReserved}
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-x-3 gap-y-2">
            <span className="hover:text-slate-400 cursor-pointer">{t.footer.responsibleDisclosure}</span>
            <span>•</span>
            <span className="hover:text-slate-400 cursor-pointer">{t.footer.securityPrivacy}</span>
            <span>•</span>
            <span className="hover:text-slate-400 cursor-pointer">{t.footer.termsEngagement}</span>

            {/* Small Language Switcher Icon Button */}
            <div className="relative inline-block ml-1" ref={langRef}>
              <button
                type="button"
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 hover:border-cyan-500/50 text-slate-300 hover:text-white text-xs font-mono transition-all cursor-pointer shadow-sm"
                title="Select Language / Region"
                aria-label="Select Language"
              >
                <Globe className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span className="text-xs">{currentLangObj.flag}</span>
                <span className="font-bold text-[10px] text-white uppercase">{currentLangObj.code}</span>
                <ChevronUp className={`w-3 h-3 text-slate-400 transition-transform ${isLangOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Popover Menu */}
              {isLangOpen && (
                <div className="absolute bottom-full mb-2 right-0 w-48 rounded-xl bg-[#0b0f19] border border-cyan-500/40 shadow-2xl p-1.5 z-50 animate-in fade-in zoom-in-95 text-left">
                  <div className="px-2 py-1 border-b border-slate-800/80 mb-1">
                    <span className="text-[10px] font-mono uppercase text-cyan-400 font-semibold block">
                      Language / Market
                    </span>
                  </div>
                  <div className="space-y-0.5">
                    {languagesList.map((lang) => {
                      const isSelected = language === lang.code;
                      return (
                        <button
                          key={lang.code}
                          type="button"
                          onClick={() => {
                            setLanguage(lang.code);
                            setIsLangOpen(false);
                          }}
                          className={`w-full text-left px-2 py-1.5 rounded-lg text-xs font-mono flex items-center justify-between gap-2 transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-cyan-950/80 text-cyan-300 font-bold border border-cyan-500/30'
                              : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span>{lang.flag}</span>
                            <span>{lang.label}</span>
                          </div>
                          {isSelected && <Check className="w-3.5 h-3.5 text-cyan-400" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
