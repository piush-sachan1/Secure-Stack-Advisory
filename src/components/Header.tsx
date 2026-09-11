import React, { useState, useEffect } from 'react';
import { ShieldCheck, Menu, X, ArrowUpRight } from 'lucide-react';
import { COMPANY_INFO } from '../data/contentData';

interface HeaderProps {
  onBookClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onBookClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Multi-Cloud 24/7', href: '#multi-cloud-ops', badge: 'AWS · GCP · Azure' },
    { label: 'DevOps', href: '#devops-support' },
    { label: 'FinOps', href: '#finops-optimization', badge: 'ROI' },
    { label: 'Practices', href: '#practices' },
    { label: 'Risk Snapshot', href: '#risk-assessment', badge: 'AI Tool' },
    { label: 'Services', href: '#services' },
    { label: 'Process', href: '#process' },
    { label: 'Insights', href: '#insights' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        isScrolled
          ? 'bg-[#07090e]/95 backdrop-blur-md border-b border-cyan-500/20 py-3 shadow-lg shadow-black/40'
          : 'bg-transparent py-4 border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          className="flex items-center gap-2.5 group focus:outline-none"
          aria-label="SecureStack Advisory Home"
        >
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-400 via-teal-500 to-cyan-600 flex items-center justify-center text-slate-950 shadow-md shadow-cyan-500/25 border border-cyan-300/50 group-hover:scale-105 transition-all">
            <ShieldCheck className="w-5 h-5 text-slate-950 stroke-[2.5]" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold tracking-tight text-white text-base leading-tight font-sans">
              {COMPANY_INFO.name}
            </span>
            <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400">
              Cloud · SRE · Cyber Advisory
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden xl:flex items-center gap-5" aria-label="Main Navigation">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNavClick(link.href)}
              className="text-xs font-medium text-slate-300 hover:text-white transition-colors cursor-pointer flex items-center gap-1.5 focus:outline-none"
            >
              {link.label}
              {link.badge && (
                <span className="px-1.5 py-0.2 rounded text-[9px] font-mono uppercase bg-cyan-950/80 text-cyan-300 border border-cyan-800/80">
                  {link.badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Action Button */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            type="button"
            onClick={onBookClick}
            className="px-4 py-2 rounded-lg text-xs font-mono font-bold bg-gradient-to-r from-cyan-500 to-teal-400 hover:from-cyan-400 hover:to-teal-300 text-slate-950 shadow-sm shadow-cyan-500/30 border border-cyan-400 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <span>Book Advisory Review</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="xl:hidden flex items-center gap-2">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#07090e]/98 border-b border-slate-800 px-4 pt-3 pb-6 space-y-2 backdrop-blur-xl">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNavClick(link.href)}
              className="w-full text-left py-2.5 px-3 rounded-md text-sm text-slate-300 hover:text-white hover:bg-slate-900 transition-colors flex items-center justify-between"
            >
              <span>{link.label}</span>
              {link.badge && (
                <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-cyan-950 text-cyan-300 border border-cyan-800">
                  {link.badge}
                </span>
              )}
            </button>
          ))}
          <div className="pt-3 border-t border-slate-800">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onBookClick();
              }}
              className="w-full py-2.5 rounded-lg text-xs font-mono font-bold bg-cyan-500 text-slate-950 flex items-center justify-center gap-1.5"
            >
              Book Advisory Review
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
