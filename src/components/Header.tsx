import React, { useState, useEffect, useRef } from 'react';
import { ShieldCheck, Menu, X, ArrowUpRight, Globe, Check, ChevronDown, Palette } from 'lucide-react';
import { COMPANY_INFO } from '../data/contentData';
import { useApp } from '../context/AppContext';
import { SupportedLanguage, AppSection } from '../types';

interface HeaderProps {
  currentSection: AppSection;
  onNavigate: (section: AppSection, targetAnchor?: string) => void;
  onBookClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentSection, onNavigate, onBookClick }) => {
  const { language, setLanguage, t, setIsThemeSandboxOpen, theme } = useApp();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const langDropdownRef = useRef<HTMLDivElement>(null);

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

  const sectionTabs: { id: AppSection; label: string; badge?: string; highlight?: boolean }[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'cloud-ops', label: 'Cloud & SRE', badge: 'AWS · GCP' },
    { id: 'risk-tool', label: 'AI Risk Tool', badge: 'Interactive', highlight: true },
    { id: 'services', label: 'Services' },
    { id: 'compliance', label: 'Compliance', badge: 'SOC 2' },
    { id: 'company', label: 'Leadership' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleSectionClick = (sectionId: AppSection, targetAnchor?: string) => {
    setMobileMenuOpen(false);
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
          aria-label="SecureStack Advisory Home"
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

        {/* Desktop Primary Section Navigation Tabs */}
        <nav className="hidden lg:flex items-center gap-1.5 p-1 rounded-xl bg-slate-950/80 border border-slate-800/90" aria-label="Main Navigation">
          {sectionTabs.map((tab) => {
            const isActive = currentSection === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleSectionClick(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 focus:outline-none ${
                  isActive
                    ? 'bg-cyan-950/90 text-cyan-300 font-semibold border border-cyan-700/80 shadow-sm shadow-cyan-950'
                    : 'text-slate-300 hover:text-white hover:bg-slate-900 border border-transparent'
                }`}
              >
                <span>{tab.label}</span>
                {tab.badge && (
                  <span
                    className={`px-1.5 py-0.2 rounded text-[9px] font-mono uppercase font-semibold ${
                      tab.highlight
                        ? 'bg-purple-950 text-purple-300 border border-purple-800'
                        : isActive
                        ? 'bg-cyan-900 text-cyan-200'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
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

          {/* Temporary Theme Switcher Trigger */}
          <button
            type="button"
            onClick={() => setIsThemeSandboxOpen(true)}
            className="flex items-center gap-1.5 px-2 sm:px-2.5 py-1.5 rounded-lg text-xs font-mono text-slate-300 hover:text-white bg-slate-900/80 hover:bg-slate-800/90 border border-slate-700/80 hover:border-cyan-500/50 transition-all cursor-pointer shadow-sm"
            title="Temporary Theme Switcher for Design Review"
          >
            <Palette className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline text-[11px] font-semibold">Theme</span>
            <span className="px-1 py-0.2 rounded text-[8px] bg-amber-950/80 text-amber-300 border border-amber-700/60 hidden md:inline">
              Temp
            </span>
          </button>

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
            className="xl:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/80 border border-slate-800 transition-colors focus:outline-none"
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
          className="fixed inset-0 top-[53px] sm:top-[61px] bg-black/70 backdrop-blur-md z-40 xl:hidden animate-in fade-in duration-200"
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

            {/* Quick Status Bar */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs font-mono">
              <div className="flex items-center gap-2 text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>{t.header.sreNocActive}</span>
              </div>
              <span className="text-slate-400">{t.header.slaText}</span>
            </div>

            {/* Primary Section Switcher for Mobile */}
            <div className="space-y-1.5">
              <div className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-semibold px-2">
                Sections & Exploration
              </div>
              <div className="grid grid-cols-2 gap-2">
                {sectionTabs.map((tab) => {
                  const isActive = currentSection === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => handleSectionClick(tab.id)}
                      className={`p-3 rounded-xl text-xs font-semibold text-left transition-all flex flex-col justify-between gap-1 border cursor-pointer ${
                        isActive
                          ? 'bg-cyan-950 border-cyan-400 text-cyan-200 shadow-md shadow-cyan-950'
                          : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <span className="font-sans">{tab.label}</span>
                      {tab.badge && (
                        <span className={`text-[9px] font-mono uppercase px-1.5 py-0.2 rounded w-fit ${
                          tab.highlight ? 'bg-purple-950 text-purple-300 border border-purple-800' : 'bg-slate-800 text-slate-400'
                        }`}>
                          {tab.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick Deep-Dive Links */}
            <div className="space-y-2 pt-1 border-t border-slate-800/80">
              <div className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-semibold px-2">
                Direct Feature Shortlinks
              </div>
              <div className="grid grid-cols-1 gap-1.5">
                <button
                  type="button"
                  onClick={() => handleSectionClick('cloud-ops', 'multi-cloud-ops')}
                  className="w-full text-left py-2 px-3 rounded-lg text-xs text-slate-300 hover:text-white bg-slate-900/40 hover:bg-slate-800/60 flex items-center justify-between"
                >
                  <span>24/7 Managed SRE & Landing Zones</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-cyan-400" />
                </button>
                <button
                  type="button"
                  onClick={() => handleSectionClick('cloud-ops', 'finops-optimization')}
                  className="w-full text-left py-2 px-3 rounded-lg text-xs text-slate-300 hover:text-white bg-slate-900/40 hover:bg-slate-800/60 flex items-center justify-between"
                >
                  <span>FinOps Multi-Cloud Cost Reclamation Sandbox</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-amber-400" />
                </button>
                <button
                  type="button"
                  onClick={() => handleSectionClick('compliance', 'compliance-tracker')}
                  className="w-full text-left py-2 px-3 rounded-lg text-xs text-slate-300 hover:text-white bg-slate-900/40 hover:bg-slate-800/60 flex items-center justify-between"
                >
                  <span>SOC 2 & ISO 27001 Readiness Rings</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-emerald-400" />
                </button>
                <button
                  type="button"
                  onClick={() => handleSectionClick('risk-tool', 'risk-assessment')}
                  className="w-full text-left py-2 px-3 rounded-lg text-xs text-purple-200 bg-purple-950/40 border border-purple-800/50 flex items-center justify-between"
                >
                  <span>Run Free AI Security Risk Snapshot (D3 Gauge)</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-purple-400" />
                </button>
              </div>
            </div>

            {/* Mobile Theme Switcher Trigger */}
            <div className="pt-2 border-t border-slate-800/60">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsThemeSandboxOpen(true);
                }}
                className="w-full py-2.5 px-3 rounded-lg text-xs font-mono text-cyan-300 bg-slate-900/90 border border-slate-700/80 flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Palette className="w-4 h-4 text-cyan-400" />
                  <span>Website Aesthetic & Theme Sandbox</span>
                </div>
                <span className="px-1.5 py-0.2 rounded text-[9px] bg-amber-950/80 text-amber-300 border border-amber-700/60">
                  Temp
                </span>
              </button>
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
