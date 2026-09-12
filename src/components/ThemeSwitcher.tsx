import React, { useState } from 'react';
import { Palette, Check, X, Sparkles, Info, ShieldCheck, Moon, Sun } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SiteTheme } from '../types';

interface ThemePreset {
  id: SiteTheme;
  name: string;
  tagline: string;
  badge: string;
  category: 'Cyber & SOC' | 'Enterprise & Cloud' | 'Executive & Compliance';
  accentColor: string;
  bgPreview: string;
  borderPreview: string;
  isLight?: boolean;
}

export const THEME_PRESETS: ThemePreset[] = [
  {
    id: 'cyber-obsidian',
    name: 'Cyber Obsidian',
    tagline: 'Precision dark high-tech security canvas with neon cyan and teal telemetry glow',
    badge: 'Default Cyber',
    category: 'Cyber & SOC',
    accentColor: '#06b6d4',
    bgPreview: 'bg-[#07090e]',
    borderPreview: 'border-cyan-500/40',
  },
  {
    id: 'deep-navy',
    name: 'Deep Navy & Cobalt',
    tagline: 'Enterprise hyperscaler midnight navy with cobalt and azure cloud infrastructure accents',
    badge: 'Hyperscaler Blue',
    category: 'Enterprise & Cloud',
    accentColor: '#38bdf8',
    bgPreview: 'bg-[#040914]',
    borderPreview: 'border-sky-500/40',
  },
  {
    id: 'slate-corporate',
    name: 'Graphite & Pure Indigo',
    tagline: 'Refined Silicon Valley corporate enterprise aesthetic with deep carbon slate and crisp indigo',
    badge: 'Enterprise SaaS',
    category: 'Enterprise & Cloud',
    accentColor: '#6366f1',
    bgPreview: 'bg-[#090b11]',
    borderPreview: 'border-indigo-500/40',
  },
  {
    id: 'emerald-matrix',
    name: 'Emerald SRE Matrix',
    tagline: '24/7 SRE NOC & terminal operations theme with high-contrast mint telemetry accents',
    badge: 'SRE & DevOps',
    category: 'Cyber & SOC',
    accentColor: '#10b981',
    bgPreview: 'bg-[#030d07]',
    borderPreview: 'border-emerald-500/40',
  },
  {
    id: 'nordic-frost',
    name: 'Nordic Frost Slate',
    tagline: 'Minimalist Scandinavian engineering theme with icy teal, cool slate, and balanced contrast',
    badge: 'Nordic Clean',
    category: 'Enterprise & Cloud',
    accentColor: '#14b8a6',
    bgPreview: 'bg-[#080d12]',
    borderPreview: 'border-teal-500/40',
  },
  {
    id: 'obsidian-gold',
    name: 'Obsidian Amber & Gold',
    tagline: 'Executive luxury advisory theme with warm amber gold & deep carbon slate contrast',
    badge: 'Executive Gold',
    category: 'Executive & Compliance',
    accentColor: '#f59e0b',
    bgPreview: 'bg-[#0a0907]',
    borderPreview: 'border-amber-500/40',
  },
  {
    id: 'amethyst-stealth',
    name: 'Amethyst Stealth & SecOps',
    tagline: 'Modern cyber red-team & threat intelligence aesthetic with violet neon accents',
    badge: 'Threat Intel',
    category: 'Cyber & SOC',
    accentColor: '#a855f7',
    bgPreview: 'bg-[#08060f]',
    borderPreview: 'border-purple-500/40',
  },
  {
    id: 'light-titanium',
    name: 'Titanium Light',
    tagline: 'Crisp, high-contrast daylight theme tailored for boardrooms and daylight compliance reviews',
    badge: 'Clean Light',
    category: 'Executive & Compliance',
    accentColor: '#0284c7',
    bgPreview: 'bg-slate-100',
    borderPreview: 'border-slate-300',
    isLight: true,
  },
];

export const ThemeSwitcher: React.FC = () => {
  const { theme, setTheme, isThemeSandboxOpen, setIsThemeSandboxOpen } = useApp();
  const [activeCategory, setActiveCategory] = useState<'All' | 'Cyber & SOC' | 'Enterprise & Cloud' | 'Executive & Compliance'>('All');

  const activePreset = THEME_PRESETS.find((p) => p.id === theme) || THEME_PRESETS[0];

  const filteredPresets = activeCategory === 'All'
    ? THEME_PRESETS
    : THEME_PRESETS.filter((p) => p.category === activeCategory);

  return (
    <>
      {/* Discreet Floating Trigger / Badge in Bottom-Left */}
      <div className="fixed bottom-4 left-4 z-40">
        {!isThemeSandboxOpen ? (
          <button
            type="button"
            onClick={() => setIsThemeSandboxOpen(true)}
            className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-slate-900/95 hover:bg-slate-850 text-slate-200 border border-cyan-500/40 hover:border-cyan-400 shadow-xl shadow-black/50 text-xs font-mono transition-all cursor-pointer backdrop-blur-md group hover:scale-[1.02]"
            title="Temporary Theme Switcher for Design Review"
          >
            <div
              className="w-3 h-3 rounded-full border border-white/30"
              style={{ backgroundColor: activePreset.accentColor }}
            />
            <span className="font-semibold text-white">🎨 Theme:</span>
            <span className="text-cyan-300 group-hover:text-cyan-200">{activePreset.name}</span>
            <span className="px-1.5 py-0.2 rounded text-[9px] bg-amber-950/80 text-amber-300 border border-amber-700/60 ml-0.5">
              Temp
            </span>
          </button>
        ) : null}
      </div>

      {/* Expanded Theme Review Modal / Drawer */}
      {isThemeSandboxOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setIsThemeSandboxOpen(false)}
        >
          <div
            className="theme-switcher-modal relative w-full max-w-xl bg-[#090d16] border border-cyan-500/40 rounded-2xl shadow-2xl overflow-hidden my-auto text-slate-100 flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-4 sm:p-5 bg-slate-950/90 border-b border-slate-800 flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-amber-950/80 border border-amber-600/70 text-amber-300 font-bold">
                    Temporary Staging Tool
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    Design Direction Sandbox
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                  <Palette className="w-5 h-5 text-cyan-400" />
                  <span>Website Aesthetic & Theme Switcher</span>
                </h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Select a theme to evaluate font contrast, accent colors, and background atmosphere. Once the design is finalized, this staging switcher will be disabled and locked.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsThemeSandboxOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors shrink-0 cursor-pointer"
                aria-label="Close theme selector"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Category Filter Pills */}
            <div className="px-4 sm:px-5 pt-3 pb-2 bg-slate-950/60 border-b border-slate-850 flex items-center gap-1.5 overflow-x-auto text-xs font-mono">
              {(['All', 'Enterprise & Cloud', 'Cyber & SOC', 'Executive & Compliance'] as const).map((cat) => {
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all cursor-pointer ${
                      isActive
                        ? 'bg-slate-800 text-white font-semibold border border-slate-600 shadow-sm'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900 border border-transparent'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            {/* Presets List */}
            <div className="p-4 sm:p-5 overflow-y-auto space-y-3">
              {filteredPresets.map((preset) => {
                const isSelected = theme === preset.id;
                return (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => setTheme(preset.id)}
                    className={`w-full p-3.5 sm:p-4 rounded-xl text-left transition-all flex items-center justify-between gap-3 border cursor-pointer ${
                      isSelected
                        ? 'bg-slate-900 shadow-md shadow-black/40 ring-1'
                        : 'bg-slate-950/60 hover:bg-slate-900/80 border-slate-800 hover:border-slate-700'
                    }`}
                    style={
                      isSelected
                        ? {
                            borderColor: preset.accentColor,
                            boxShadow: `0 4px 20px -2px ${preset.accentColor}33`,
                          }
                        : undefined
                    }
                  >
                    <div className="flex items-center gap-3.5">
                      {/* Color Preview Swatch */}
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center border shadow-inner shrink-0 ${preset.bgPreview} ${preset.borderPreview}`}
                      >
                        <div
                          className="w-4 h-4 rounded-full shadow-sm"
                          style={{ backgroundColor: preset.accentColor }}
                        />
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-white">
                            {preset.name}
                          </span>
                          <span
                            className="px-1.5 py-0.2 rounded text-[9px] font-mono border"
                            style={
                              isSelected
                                ? {
                                    backgroundColor: `${preset.accentColor}22`,
                                    color: preset.accentColor,
                                    borderColor: `${preset.accentColor}55`,
                                  }
                                : {
                                    backgroundColor: '#1e293b',
                                    color: '#cbd5e1',
                                    borderColor: '#334155',
                                  }
                            }
                          >
                            {preset.badge}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 mt-0.5 line-clamp-1 leading-snug">
                          {preset.tagline}
                        </p>
                      </div>
                    </div>

                    <div className="shrink-0">
                      {isSelected ? (
                        <div
                          className="w-6 h-6 rounded-full text-slate-950 flex items-center justify-center shadow-sm"
                          style={{ backgroundColor: preset.accentColor }}
                        >
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      ) : (
                        <div className="w-6 h-6 rounded-full border border-slate-700 hover:border-slate-500" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Footer / Notice */}
            <div className="p-3.5 sm:p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-2 text-slate-400">
                <Info className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span className="text-[11px]">Settings are automatically saved to your browser session.</span>
              </div>
              <button
                type="button"
                onClick={() => setIsThemeSandboxOpen(false)}
                className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs font-mono transition-colors cursor-pointer"
              >
                Apply & Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
