import React, { useState, useEffect, useRef } from 'react';
import {
  ShieldCheck,
  Menu,
  X,
  ArrowUpRight,
  Globe,
  Check,
  ChevronDown,
  Cpu,
  Terminal,
  Code2,
  Cloud,
  Layers,
  Server,
  FileCheck2,
  Award,
  Shield,
  Activity,
  DollarSign,
  Users,
  GitBranch,
  BookOpen,
  Sparkles,
} from 'lucide-react';
import { COMPANY_INFO } from '../data/contentData';
import { useApp } from '../context/AppContext';
import { SupportedLanguage, AppSection } from '../types';

interface HeaderProps {
  currentSection: AppSection;
  onNavigate: (section: AppSection, targetAnchor?: string) => void;
  onBookClick: () => void;
  onSelectPractice?: (practiceId: string) => void;
  onSelectComplianceTab?: (tab: 'all' | 'soc2' | 'pci' | 'cis' | 'iso27001') => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentSection,
  onNavigate,
  onBookClick,
  onSelectPractice,
  onSelectComplianceTab,
}) => {
  const { language, setLanguage, t } = useApp();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [hoveredMenu, setHoveredMenu] = useState<'services' | 'compliance' | 'cloud-ops' | 'company' | null>(null);
  
  const langDropdownRef = useRef<HTMLDivElement>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target as Node)) {
        setLangDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu on escape key or resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280 && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        setLangDropdownOpen(false);
        setHoveredMenu(null);
      }
    };
    window.addEventListener('resize', handleResize);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileMenuOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleMouseEnter = (menuKey: 'services' | 'compliance' | 'cloud-ops' | 'company') => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setHoveredMenu(menuKey);
  };

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredMenu(null);
    }, 180);
  };

  const languagesList: { code: SupportedLanguage; label: string; flag: string; target: string; badge: string }[] = [
    {
      code: 'en',
      label: 'English',
      flag: '🇺🇸',
      target: 'Global Enterprise & US (NIST / SOC 2)',
      badge: 'Global Standard',
    },
    {
      code: 'de',
      label: 'Deutsch',
      flag: '🇩🇪',
      target: 'DACH, BSI C5 & NIS-2 EU Cybersecurity',
      badge: 'BSI C5 & NIS-2',
    },
    {
      code: 'fr',
      label: 'Français',
      flag: '🇫🇷',
      target: 'Marché Européen, ANSSI & SecNumCloud',
      badge: 'ANSSI & RGPD',
    },
  ];

  const handleSectionClick = (sectionId: AppSection, targetAnchor?: string) => {
    setMobileMenuOpen(false);
    setHoveredMenu(null);
    onNavigate(sectionId, targetAnchor);
  };

  const handleSelectLanguage = (langCode: SupportedLanguage) => {
    setLanguage(langCode);
    setLangDropdownOpen(false);
  };

  const currentLangObj = languagesList.find((l) => l.code === language) || languagesList[0];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        isScrolled
          ? 'bg-[#07090e]/95 backdrop-blur-md border-b border-cyan-500/20 py-2.5 sm:py-3 shadow-lg shadow-black/50'
          : 'bg-[#07090e]/85 backdrop-blur-sm sm:bg-[#07090e]/80 py-3 sm:py-3.5 border-b border-slate-800/60'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <button
          type="button"
          onClick={() => handleSectionClick('overview')}
          className="flex items-center gap-2.5 group focus:outline-none shrink-0 text-left cursor-pointer"
          aria-label="Vectorbound Home"
        >
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-gradient-to-br from-cyan-400 via-teal-500 to-cyan-600 flex items-center justify-center text-slate-950 shadow-md shadow-cyan-500/25 border border-cyan-300/50 group-hover:scale-105 transition-all">
            <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-slate-950 stroke-[2.5]" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold tracking-tight text-white text-sm sm:text-base leading-tight font-sans">
              {COMPANY_INFO.name}
            </span>
            <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-wider text-cyan-400">
              Cloud · SRE · Cyber
            </span>
          </div>
        </button>

        {/* Desktop Primary Section Navigation Tabs with Hover Subsections */}
        <nav
          className="hidden lg:flex items-center gap-1.5 p-1 rounded-xl bg-slate-950/80 border border-slate-800/90 relative"
          aria-label="Main Navigation"
        >
          {/* Overview */}
          <button
            type="button"
            onClick={() => handleSectionClick('overview')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 focus:outline-none ${
              currentSection === 'overview'
                ? 'bg-cyan-950/90 text-cyan-300 font-semibold border border-cyan-700/80 shadow-sm shadow-cyan-950'
                : 'text-slate-300 hover:text-white hover:bg-slate-900 border border-transparent'
            }`}
          >
            Overview
          </button>

          {/* Services with Hover Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter('services')}
            onMouseLeave={handleMouseLeave}
          >
            <button
              type="button"
              onClick={() => handleSectionClick('services')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer flex items-center gap-1 focus:outline-none ${
                currentSection === 'services' || hoveredMenu === 'services'
                  ? 'bg-cyan-950/90 text-cyan-300 font-semibold border border-cyan-700/80 shadow-sm shadow-cyan-950'
                  : 'text-slate-300 hover:text-white hover:bg-slate-900 border border-transparent'
              }`}
            >
              <span>Services</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  hoveredMenu === 'services' ? 'rotate-180 text-cyan-400' : 'text-slate-400'
                }`}
              />
            </button>

            {/* Hover Mega-Dropdown: Services */}
            {hoveredMenu === 'services' && (
              <div
                className="absolute left-0 mt-2 w-[680px] bg-[#090d16]/98 border border-cyan-500/30 rounded-2xl shadow-2xl p-5 backdrop-blur-xl ring-1 ring-cyan-500/20 z-50 animate-in fade-in zoom-in-95 duration-150"
                onMouseEnter={() => handleMouseEnter('services')}
                onMouseLeave={handleMouseLeave}
              >
                <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
                  <span className="text-xs font-mono uppercase text-cyan-400 font-semibold flex items-center gap-2">
                    <Shield className="w-4 h-4 text-cyan-400" />
                    Engineering Practices & Security Services
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">AWS · GCP · Azure</span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      onSelectPractice?.('ai-security');
                      handleSectionClick('services');
                    }}
                    className="p-3 rounded-xl bg-slate-900/60 hover:bg-cyan-950/50 border border-slate-800 hover:border-cyan-500/40 text-left transition-all group cursor-pointer"
                  >
                    <div className="flex items-center gap-2 text-xs font-bold text-white group-hover:text-cyan-300 mb-1">
                      <Cpu className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />
                      <span>AI Security & Governance</span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-snug">
                      Generative AI threat auditing, prompt injection defense, & agentic red teaming.
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      onSelectPractice?.('devsecops');
                      handleSectionClick('services');
                    }}
                    className="p-3 rounded-xl bg-slate-900/60 hover:bg-cyan-950/50 border border-slate-800 hover:border-cyan-500/40 text-left transition-all group cursor-pointer"
                  >
                    <div className="flex items-center gap-2 text-xs font-bold text-white group-hover:text-cyan-300 mb-1">
                      <Terminal className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                      <span>DevSecOps & CI/CD Pipelines</span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-snug">
                      Automated pipeline gates, SAST/DAST PR scanning, and supply chain hardening.
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      onSelectPractice?.('appsec');
                      handleSectionClick('services');
                    }}
                    className="p-3 rounded-xl bg-slate-900/60 hover:bg-cyan-950/50 border border-slate-800 hover:border-cyan-500/40 text-left transition-all group cursor-pointer"
                  >
                    <div className="flex items-center gap-2 text-xs font-bold text-white group-hover:text-cyan-300 mb-1">
                      <Code2 className="w-4 h-4 text-teal-400 group-hover:scale-110 transition-transform" />
                      <span>AppSec & Penetration Testing</span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-snug">
                      BOLA / IDOR REST API testing, GraphQL security, and manual code reviews.
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      onSelectPractice?.('cloud-security');
                      handleSectionClick('services');
                    }}
                    className="p-3 rounded-xl bg-slate-900/60 hover:bg-cyan-950/50 border border-slate-800 hover:border-cyan-500/40 text-left transition-all group cursor-pointer"
                  >
                    <div className="flex items-center gap-2 text-xs font-bold text-white group-hover:text-cyan-300 mb-1">
                      <Cloud className="w-4 h-4 text-sky-400 group-hover:scale-110 transition-transform" />
                      <span>AWS Cloud Architecture</span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-snug">
                      Control Tower, SCPs, GuardDuty, Transit Gateway, & IAM privilege pruning.
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      onSelectPractice?.('cloud-security');
                      handleSectionClick('services');
                    }}
                    className="p-3 rounded-xl bg-slate-900/60 hover:bg-cyan-950/50 border border-slate-800 hover:border-cyan-500/40 text-left transition-all group cursor-pointer"
                  >
                    <div className="flex items-center gap-2 text-xs font-bold text-white group-hover:text-cyan-300 mb-1">
                      <Layers className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" />
                      <span>Azure Enterprise Security</span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-snug">
                      CAF Landing Zones, Entra ID PIM JIT elevation, AKS & Defender for Cloud.
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      onSelectPractice?.('cloud-security');
                      handleSectionClick('services');
                    }}
                    className="p-3 rounded-xl bg-slate-900/60 hover:bg-cyan-950/50 border border-slate-800 hover:border-cyan-500/40 text-left transition-all group cursor-pointer"
                  >
                    <div className="flex items-center gap-2 text-xs font-bold text-white group-hover:text-cyan-300 mb-1">
                      <Server className="w-4 h-4 text-indigo-400 group-hover:scale-110 transition-transform" />
                      <span>GCP Sovereign Security</span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-snug">
                      VPC Service Controls, GCP Org policies, GKE Workload Identity, & SCC.
                    </p>
                  </button>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400">Looking for custom engagement?</span>
                  <button
                    type="button"
                    onClick={() => handleSectionClick('services')}
                    className="text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <span>View All Services & FAQ</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Compliance & Risk with Hover Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter('compliance')}
            onMouseLeave={handleMouseLeave}
          >
            <button
              type="button"
              onClick={() => handleSectionClick('compliance')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer flex items-center gap-1 focus:outline-none ${
                currentSection === 'compliance' || hoveredMenu === 'compliance'
                  ? 'bg-cyan-950/90 text-cyan-300 font-semibold border border-cyan-700/80 shadow-sm shadow-cyan-950'
                  : 'text-slate-300 hover:text-white hover:bg-slate-900 border border-transparent'
              }`}
            >
              <span>Compliance & Risk</span>
              <span className="px-1.5 py-0.2 rounded text-[9px] font-mono uppercase font-semibold bg-emerald-950 text-emerald-300 border border-emerald-800">
                SOC 2
              </span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  hoveredMenu === 'compliance' ? 'rotate-180 text-cyan-400' : 'text-slate-400'
                }`}
              />
            </button>

            {/* Hover Mega-Dropdown: Compliance */}
            {hoveredMenu === 'compliance' && (
              <div
                className="absolute left-0 mt-2 w-[620px] bg-[#090d16]/98 border border-cyan-500/30 rounded-2xl shadow-2xl p-5 backdrop-blur-xl ring-1 ring-cyan-500/20 z-50 animate-in fade-in zoom-in-95 duration-150"
                onMouseEnter={() => handleMouseEnter('compliance')}
                onMouseLeave={handleMouseLeave}
              >
                <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
                  <span className="text-xs font-mono uppercase text-emerald-400 font-semibold flex items-center gap-2">
                    <FileCheck2 className="w-4 h-4 text-emerald-400" />
                    Regulatory Compliance & Standard Subsections
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">Continuous Assurance</span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      onSelectComplianceTab?.('soc2');
                    }}
                    className="p-3 rounded-xl bg-slate-900/60 hover:bg-emerald-950/40 border border-slate-800 hover:border-emerald-500/40 text-left transition-all group cursor-pointer"
                  >
                    <div className="flex items-center gap-2 text-xs font-bold text-white group-hover:text-emerald-300 mb-1">
                      <Award className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                      <span>SOC 2 Type I & Type II</span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-snug">
                      Point-in-time design & continuous operating effectiveness audits with automated evidence.
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      onSelectComplianceTab?.('pci');
                    }}
                    className="p-3 rounded-xl bg-slate-900/60 hover:bg-cyan-950/40 border border-slate-800 hover:border-cyan-500/40 text-left transition-all group cursor-pointer"
                  >
                    <div className="flex items-center gap-2 text-xs font-bold text-white group-hover:text-cyan-300 mb-1">
                      <ShieldCheck className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                      <span>PCI DSS Gap Assessment</span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-snug">
                      PCI DSS v4.0 Cardholder Data Environment (CDE) segmentation & tokenization verification.
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      onSelectComplianceTab?.('cis');
                    }}
                    className="p-3 rounded-xl bg-slate-900/60 hover:bg-teal-950/40 border border-slate-800 hover:border-teal-500/40 text-left transition-all group cursor-pointer"
                  >
                    <div className="flex items-center gap-2 text-xs font-bold text-white group-hover:text-teal-300 mb-1">
                      <Check className="w-4 h-4 text-teal-400 group-hover:scale-110 transition-transform" />
                      <span>CIS Controls Implementation</span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-snug">
                      Level 1 & Level 2 CIS Foundations Benchmarks across AWS, Azure, and Google Cloud.
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      onSelectComplianceTab?.('iso27001');
                    }}
                    className="p-3 rounded-xl bg-slate-900/60 hover:bg-cyan-950/40 border border-slate-800 hover:border-cyan-500/40 text-left transition-all group cursor-pointer"
                  >
                    <div className="flex items-center gap-2 text-xs font-bold text-white group-hover:text-cyan-300 mb-1">
                      <Globe className="w-4 h-4 text-indigo-400 group-hover:scale-110 transition-transform" />
                      <span>ISO/IEC 27001 & NIS-2</span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-snug">
                      2022 ISMS Annex A controls, BSI C5 & sovereign European data protection compliance.
                    </p>
                  </button>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400">Interactive tracker with real evidence logs</span>
                  <button
                    type="button"
                    onClick={() => handleSectionClick('compliance')}
                    className="text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <span>Open Compliance Tracker →</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Cloud & SRE with Hover Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter('cloud-ops')}
            onMouseLeave={handleMouseLeave}
          >
            <button
              type="button"
              onClick={() => handleSectionClick('cloud-ops')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer flex items-center gap-1 focus:outline-none ${
                currentSection === 'cloud-ops' || hoveredMenu === 'cloud-ops'
                  ? 'bg-cyan-950/90 text-cyan-300 font-semibold border border-cyan-700/80 shadow-sm shadow-cyan-950'
                  : 'text-slate-300 hover:text-white hover:bg-slate-900 border border-transparent'
              }`}
            >
              <span>Cloud & SRE</span>
              <span className="px-1.5 py-0.2 rounded text-[9px] font-mono uppercase font-semibold bg-cyan-900 text-cyan-200">
                AWS · Azure · GCP
              </span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  hoveredMenu === 'cloud-ops' ? 'rotate-180 text-cyan-400' : 'text-slate-400'
                }`}
              />
            </button>

            {/* Hover Mega-Dropdown: Cloud & SRE */}
            {hoveredMenu === 'cloud-ops' && (
              <div
                className="absolute left-0 mt-2 w-[600px] bg-[#090d16]/98 border border-cyan-500/30 rounded-2xl shadow-2xl p-5 backdrop-blur-xl ring-1 ring-cyan-500/20 z-50 animate-in fade-in zoom-in-95 duration-150"
                onMouseEnter={() => handleMouseEnter('cloud-ops')}
                onMouseLeave={handleMouseLeave}
              >
                <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
                  <span className="text-xs font-mono uppercase text-sky-400 font-semibold flex items-center gap-2">
                    <Cloud className="w-4 h-4 text-sky-400" />
                    Multi-Cloud Infrastructure & 24/7 Operations
                  </span>
                  <span className="text-[11px] font-mono text-emerald-400">15-min SLA</span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => handleSectionClick('cloud-ops', 'multi-cloud-ops')}
                    className="p-3 rounded-xl bg-slate-900/60 hover:bg-cyan-950/40 border border-slate-800 hover:border-cyan-500/40 text-left transition-all group cursor-pointer"
                  >
                    <div className="flex items-center gap-2 text-xs font-bold text-white group-hover:text-cyan-300 mb-1">
                      <Cloud className="w-4 h-4 text-sky-400 group-hover:scale-110 transition-transform" />
                      <span>Multi-Cloud Landing Zones</span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-snug">
                      Production-grade AWS Control Tower, Azure CAF & GCP Org hierarchy IaC blueprints.
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSectionClick('cloud-ops', 'devops-support')}
                    className="p-3 rounded-xl bg-slate-900/60 hover:bg-cyan-950/40 border border-slate-800 hover:border-cyan-500/40 text-left transition-all group cursor-pointer"
                  >
                    <div className="flex items-center gap-2 text-xs font-bold text-white group-hover:text-cyan-300 mb-1">
                      <Activity className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                      <span>24/7 Managed SRE NOC</span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-snug">
                      Guaranteed 15-minute P1 incident response, automated runbooks & Tier-3 engineering.
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSectionClick('cloud-ops', 'finops-optimization')}
                    className="p-3 rounded-xl bg-slate-900/60 hover:bg-cyan-950/40 border border-slate-800 hover:border-cyan-500/40 text-left transition-all group cursor-pointer"
                  >
                    <div className="flex items-center gap-2 text-xs font-bold text-white group-hover:text-cyan-300 mb-1">
                      <DollarSign className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                      <span>FinOps & Cost Reduction</span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-snug">
                      Reclaim 25% to 40% of wasted compute/storage spend with automated PR cost guardrails.
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      onSelectPractice?.('cloud-security');
                      handleSectionClick('services');
                    }}
                    className="p-3 rounded-xl bg-slate-900/60 hover:bg-cyan-950/40 border border-slate-800 hover:border-cyan-500/40 text-left transition-all group cursor-pointer"
                  >
                    <div className="flex items-center gap-2 text-xs font-bold text-white group-hover:text-cyan-300 mb-1">
                      <Layers className="w-4 h-4 text-indigo-400 group-hover:scale-110 transition-transform" />
                      <span>Kubernetes & Container Hardening</span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-snug">
                      Cluster hardening for EKS, GKE, and private Azure AKS with Cilium eBPF network security.
                    </p>
                  </button>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400">Follow-the-sun global NOC coverage</span>
                  <button
                    type="button"
                    onClick={() => handleSectionClick('cloud-ops')}
                    className="text-sky-400 hover:text-sky-300 font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <span>View Cloud & SRE Operations Hub →</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* AI Risk Tool (Direct Link) */}
          <button
            type="button"
            onClick={() => handleSectionClick('risk-tool')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 focus:outline-none ${
              currentSection === 'risk-tool'
                ? 'bg-purple-950/90 text-purple-200 font-semibold border border-purple-700/80 shadow-sm shadow-purple-950'
                : 'text-purple-300 hover:text-white hover:bg-purple-950/50 border border-purple-900/50'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>AI Risk Tool</span>
            <span className="px-1.5 py-0.2 rounded text-[9px] font-mono uppercase font-semibold bg-purple-900 text-purple-200">
              Interactive
            </span>
          </button>

          {/* Company / Leadership with Hover Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter('company')}
            onMouseLeave={handleMouseLeave}
          >
            <button
              type="button"
              onClick={() => handleSectionClick('company')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer flex items-center gap-1 focus:outline-none ${
                currentSection === 'company' || hoveredMenu === 'company'
                  ? 'bg-cyan-950/90 text-cyan-300 font-semibold border border-cyan-700/80 shadow-sm shadow-cyan-950'
                  : 'text-slate-300 hover:text-white hover:bg-slate-900 border border-transparent'
              }`}
            >
              <span>Leadership</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  hoveredMenu === 'company' ? 'rotate-180 text-cyan-400' : 'text-slate-400'
                }`}
              />
            </button>

            {/* Hover Mega-Dropdown: Company / Leadership */}
            {hoveredMenu === 'company' && (
              <div
                className="absolute right-0 mt-2 w-[580px] bg-[#090d16]/98 border border-cyan-500/30 rounded-2xl shadow-2xl p-5 backdrop-blur-xl ring-1 ring-cyan-500/20 z-50 animate-in fade-in zoom-in-95 duration-150"
                onMouseEnter={() => handleMouseEnter('company')}
                onMouseLeave={handleMouseLeave}
              >
                <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
                  <span className="text-xs font-mono uppercase text-slate-300 font-semibold flex items-center gap-2">
                    <Users className="w-4 h-4 text-cyan-400" />
                    Vectorbound Advisory & Methodology
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">Ex-FAANG Principals</span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => handleSectionClick('company', 'team')}
                    className="p-3 rounded-xl bg-slate-900/60 hover:bg-cyan-950/40 border border-slate-800 hover:border-cyan-500/40 text-left transition-all group cursor-pointer"
                  >
                    <div className="flex items-center gap-2 text-xs font-bold text-white group-hover:text-cyan-300 mb-1">
                      <Users className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                      <span>Leadership & Principals</span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-snug">
                      Senior consultants with 14+ years experience in cloud security, AI defense, and SRE.
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSectionClick('company', 'process')}
                    className="p-3 rounded-xl bg-slate-900/60 hover:bg-cyan-950/40 border border-slate-800 hover:border-cyan-500/40 text-left transition-all group cursor-pointer"
                  >
                    <div className="flex items-center gap-2 text-xs font-bold text-white group-hover:text-cyan-300 mb-1">
                      <GitBranch className="w-4 h-4 text-teal-400 group-hover:scale-110 transition-transform" />
                      <span>6-Stage Engagement Lifecycle</span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-snug">
                      Audited methodology minimizing engineering disruption while delivering verifiable controls.
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSectionClick('company', 'why-us')}
                    className="p-3 rounded-xl bg-slate-900/60 hover:bg-cyan-950/40 border border-slate-800 hover:border-cyan-500/40 text-left transition-all group cursor-pointer"
                  >
                    <div className="flex items-center gap-2 text-xs font-bold text-white group-hover:text-cyan-300 mb-1">
                      <ShieldCheck className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                      <span>Why Vectorbound</span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-snug">
                      Engineering-first differentiation: zero junior staff delegation, zero generic checklists.
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSectionClick('company', 'insights')}
                    className="p-3 rounded-xl bg-slate-900/60 hover:bg-cyan-950/40 border border-slate-800 hover:border-cyan-500/40 text-left transition-all group cursor-pointer"
                  >
                    <div className="flex items-center gap-2 text-xs font-bold text-white group-hover:text-cyan-300 mb-1">
                      <BookOpen className="w-4 h-4 text-indigo-400 group-hover:scale-110 transition-transform" />
                      <span>Insights & Architecture Reports</span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-snug">
                      Deep-dive technical advisories, multi-cloud breach teardowns, and SOC 2 playbooks.
                    </p>
                  </button>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400">Trusted by fast-growing SaaS & FinTech</span>
                  <button
                    type="button"
                    onClick={() => handleSectionClick('company')}
                    className="text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <span>View Company Overview →</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Contact */}
          <button
            type="button"
            onClick={() => handleSectionClick('contact')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 focus:outline-none ${
              currentSection === 'contact'
                ? 'bg-cyan-950/90 text-cyan-300 font-semibold border border-cyan-700/80 shadow-sm shadow-cyan-950'
                : 'text-slate-300 hover:text-white hover:bg-slate-900 border border-transparent'
            }`}
          >
            Contact
          </button>
        </nav>

        {/* Header Action Buttons & Language Switcher */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Desktop Language Switcher */}
          <div className="relative" ref={langDropdownRef}>
            <button
              type="button"
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="flex items-center gap-1.5 px-2 sm:px-2.5 py-1.5 rounded-lg text-xs font-mono text-slate-300 hover:text-white bg-slate-900/80 hover:bg-slate-800/90 border border-slate-700/80 hover:border-cyan-500/50 transition-all cursor-pointer shadow-sm"
              aria-label="Select portal language and international market"
              aria-expanded={langDropdownOpen}
              title={`Active Market: ${currentLangObj.target}`}
            >
              <Globe className="w-3.5 h-3.5 text-cyan-400" />
              <span className="text-xs">{currentLangObj.flag}</span>
              <span className="font-bold text-[11px] text-white uppercase">{currentLangObj.code}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {/* Language Switcher Dropdown Menu */}
            {langDropdownOpen && (
              <div className="absolute right-0 mt-2 w-72 rounded-xl bg-[#0b0f19] border border-cyan-500/40 shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95">
                <div className="px-2.5 py-1.5 border-b border-slate-800/80 mb-1">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-semibold block">
                    {t.header.switchPrompt}
                  </span>
                  <span className="text-[11px] text-slate-400 block mt-0.5">
                    Targeting European & Global Cyber Regulations
                  </span>
                </div>

                <div className="space-y-1">
                  {languagesList.map((lang) => {
                    const isSelected = language === lang.code;
                    return (
                      <button
                        key={lang.code}
                        type="button"
                        onClick={() => handleSelectLanguage(lang.code)}
                        className={`w-full text-left p-2 rounded-lg transition-all flex items-start justify-between gap-2 cursor-pointer ${
                          isSelected
                            ? 'bg-cyan-950/60 border border-cyan-500/40 text-white'
                            : 'hover:bg-slate-800/60 text-slate-300 hover:text-white border border-transparent'
                        }`}
                      >
                        <div className="flex items-start gap-2.5">
                          <span className="text-base mt-0.5">{lang.flag}</span>
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs font-semibold font-sans">{lang.label}</span>
                              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-800 text-cyan-300">
                                {lang.code.toUpperCase()}
                              </span>
                            </div>
                            <span className="text-[10px] font-mono text-slate-400 block mt-0.5">
                              {lang.target}
                            </span>
                          </div>
                        </div>

                        {isSelected && <Check className="w-4 h-4 text-cyan-400 shrink-0 mt-1" />}
                      </button>
                    );
                  })}
                </div>

                <div className="mt-2 pt-2 border-t border-slate-800/80 px-2 py-1 text-[10px] font-mono text-slate-500 flex items-center justify-between">
                  <span>Current: {t.marketBadge}</span>
                  <span className="text-emerald-400">● Real-time</span>
                </div>
              </div>
            )}
          </div>

          {/* Book Review CTA */}
          <button
            type="button"
            onClick={onBookClick}
            className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs font-mono font-bold bg-gradient-to-r from-cyan-500 to-teal-400 hover:from-cyan-400 hover:to-teal-300 text-slate-950 shadow-sm shadow-cyan-500/30 border border-cyan-400 transition-all flex items-center gap-1 cursor-pointer"
          >
            <span>{t.header.bookReview}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>

          {/* Mobile menu toggle button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/80 border border-slate-800 transition-colors focus:outline-none"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-cyan-400" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay Backdrop */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 top-[53px] sm:top-[61px] bg-black/70 backdrop-blur-md z-40 lg:hidden animate-in fade-in duration-200"
          onClick={() => setMobileMenuOpen(false)}
        >
          {/* Drawer Sheet */}
          <div
            className="bg-[#07090e]/98 border-b border-cyan-500/20 max-h-[85vh] overflow-y-auto p-4 sm:p-6 space-y-5 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Mobile Market & Language Switcher Card */}
            <div className="p-3.5 rounded-xl bg-slate-900/90 border border-cyan-500/30 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-semibold flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5" />
                  {t.header.switchPrompt}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                  {t.marketBadge}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {languagesList.map((lang) => {
                  const isSelected = language === lang.code;
                  return (
                    <button
                      key={lang.code}
                      type="button"
                      onClick={() => handleSelectLanguage(lang.code)}
                      className={`py-2 px-2 rounded-lg text-xs font-mono flex flex-col items-center justify-center gap-1 border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-cyan-950 border-cyan-400 text-cyan-200 font-bold shadow-sm'
                          : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <span className="text-base">{lang.flag}</span>
                      <span className="text-[11px]">{lang.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Subsections & Practices for Mobile */}
            <div className="space-y-3">
              <div className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-semibold px-1">
                Explore Subsections & Standards
              </div>

              {/* Services Subsections */}
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
                <div className="text-xs font-bold text-cyan-300 font-mono">Services & Practices</div>
                <div className="grid grid-cols-1 gap-1.5 text-xs text-slate-300">
                  <button
                    type="button"
                    onClick={() => {
                      onSelectPractice?.('ai-security');
                      handleSectionClick('services');
                    }}
                    className="p-2 rounded-lg hover:bg-slate-800 text-left flex items-center justify-between text-slate-200"
                  >
                    <span>AI Security & LLM Governance</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-purple-400" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      onSelectPractice?.('devsecops');
                      handleSectionClick('services');
                    }}
                    className="p-2 rounded-lg hover:bg-slate-800 text-left flex items-center justify-between text-slate-200"
                  >
                    <span>DevSecOps & Supply Chain Gates</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-cyan-400" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      onSelectPractice?.('cloud-security');
                      handleSectionClick('services');
                    }}
                    className="p-2 rounded-lg hover:bg-slate-800 text-left flex items-center justify-between text-slate-200"
                  >
                    <span>Multi-Cloud Architecture (AWS, Azure & GCP)</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-sky-400" />
                  </button>
                </div>
              </div>

              {/* Compliance Standards Subsections */}
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
                <div className="text-xs font-bold text-emerald-300 font-mono">Compliance Frameworks</div>
                <div className="grid grid-cols-2 gap-1.5 text-xs">
                  <button
                    type="button"
                    onClick={() => {
                      onSelectComplianceTab?.('soc2');
                      setMobileMenuOpen(false);
                    }}
                    className="p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 text-left"
                  >
                    SOC 2 Type I & II
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      onSelectComplianceTab?.('pci');
                      setMobileMenuOpen(false);
                    }}
                    className="p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 text-left"
                  >
                    PCI DSS v4.0
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      onSelectComplianceTab?.('cis');
                      setMobileMenuOpen(false);
                    }}
                    className="p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 text-left"
                  >
                    CIS Controls
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      onSelectComplianceTab?.('iso27001');
                      setMobileMenuOpen(false);
                    }}
                    className="p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 text-left"
                  >
                    ISO 27001 & NIS-2
                  </button>
                </div>
              </div>
            </div>

            {/* Mobile Footer CTAs */}
            <div className="pt-2 border-t border-slate-800/80 space-y-2.5">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onBookClick();
                }}
                className="w-full py-3 rounded-xl text-xs font-mono font-bold bg-gradient-to-r from-cyan-500 to-teal-400 text-slate-950 flex items-center justify-center gap-1.5 shadow-lg shadow-cyan-950/50 cursor-pointer"
              >
                <span>{t.header.bookMobileCta}</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <div className="text-[11px] font-mono text-slate-500 text-center">
                {t.header.ndaNotice}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

