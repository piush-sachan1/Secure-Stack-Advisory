import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X as CloseIcon, Instagram, Facebook, Youtube, Check, RefreshCw, ExternalLink, Sparkles, Code } from 'lucide-react';
import { SocialChannelsConfig } from '../types';

const XIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export const ChannelManagerModal: React.FC = () => {
  const { channels, saveAllChannels, resetChannels, isChannelModalOpen, setIsChannelModalOpen, t } = useApp();

  const [formData, setFormData] = useState<SocialChannelsConfig>(channels);
  const [showSavedToast, setShowSavedToast] = useState(false);

  // Sync state when modal opens
  React.useEffect(() => {
    if (isChannelModalOpen) {
      setFormData(channels);
      setShowSavedToast(false);
    }
  }, [isChannelModalOpen, channels]);

  if (!isChannelModalOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    saveAllChannels(formData);
    setShowSavedToast(true);
    setTimeout(() => {
      setShowSavedToast(false);
      setIsChannelModalOpen(false);
    }, 1200);
  };

  const handleReset = () => {
    resetChannels();
    setIsChannelModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-3xl bg-[#0b0f19] border border-cyan-500/40 rounded-2xl shadow-2xl overflow-hidden my-auto text-slate-100 flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-6 bg-slate-950/90 border-b border-slate-800 flex items-start justify-between gap-4 shrink-0">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-cyan-950/80 border border-cyan-700 text-cyan-300 font-semibold">
                Channel Administration
              </span>
              <span className="text-xs text-slate-400 font-mono">
                Live Broadcast Settings
              </span>
            </div>
            <h3 className="text-lg sm:text-2xl font-bold text-white tracking-tight">
              {t.socials.channelModalTitle}
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Configure handles, direct URLs, and descriptions for your public advisory channels including X.com, Instagram, Facebook, and YouTube.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsChannelModalOpen(false)}
            className="p-1.5 sm:p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors shrink-0 cursor-pointer"
            aria-label="Close dialog"
          >
            <CloseIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <form onSubmit={handleSave} className="p-4 sm:p-6 overflow-y-auto space-y-5 flex-1">
          {showSavedToast && (
            <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-500/60 text-emerald-300 text-xs font-mono flex items-center gap-2 animate-in fade-in">
              <Check className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{t.socials.successToast}</span>
            </div>
          )}

          {/* X.com Config */}
          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-700/60 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-black border border-slate-700 flex items-center justify-center text-white shadow-sm">
                  <XIcon className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                    <span>X.com (formerly Twitter)</span>
                  </h4>
                  <span className="text-[11px] text-slate-400">
                    Real-time CVE threat alerts, breach teardowns & executive threads
                  </span>
                </div>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                Primary Wire
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-1">
                  X.com Handle / Account
                </label>
                <input
                  type="text"
                  value={formData.x?.name || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      x: {
                        id: 'x',
                        url: formData.x?.url || 'https://x.com/VectorboundSec',
                        description: formData.x?.description || 'Threat alerts & advisories',
                        badge: formData.x?.badge || '34K Followers',
                        ...formData.x,
                        name: e.target.value,
                      },
                    })
                  }
                  required
                  placeholder="@VectorboundSec"
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400 font-mono"
                />
              </div>
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-1">
                  Direct Profile URL
                </label>
                <input
                  type="url"
                  value={formData.x?.url || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      x: {
                        id: 'x',
                        name: formData.x?.name || '@VectorboundSec',
                        description: formData.x?.description || 'Threat alerts & advisories',
                        badge: formData.x?.badge || '34K Followers',
                        ...formData.x,
                        url: e.target.value,
                      },
                    })
                  }
                  required
                  placeholder="https://x.com/..."
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400 font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-1">
                Channel Tagline / Description
              </label>
              <input
                type="text"
                value={formData.x?.description || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    x: {
                      id: 'x',
                      name: formData.x?.name || '@VectorboundSec',
                      url: formData.x?.url || 'https://x.com/VectorboundSec',
                      badge: formData.x?.badge || '34K Followers',
                      ...formData.x,
                      description: e.target.value,
                    },
                  })
                }
                placeholder="Real-time CVE threat alerts, cloud incident teardowns"
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          {/* Instagram Config */}
          <div className="p-4 rounded-xl bg-slate-900/70 border border-pink-500/25 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 flex items-center justify-center text-white shadow-sm">
                  <Instagram className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                    <span>Instagram Channel</span>
                  </h4>
                  <span className="text-[11px] text-slate-400">
                    Security advisories, team culture & reels
                  </span>
                </div>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-pink-300 border border-pink-900/50">
                Live Feed
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-1">
                  Channel / Account Name
                </label>
                <input
                  type="text"
                  value={formData.instagram.name}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      instagram: { ...formData.instagram, name: e.target.value },
                    })
                  }
                  required
                  placeholder="@vectorbound.cyber"
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-pink-500 font-mono"
                />
              </div>
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-1">
                  Direct URL
                </label>
                <input
                  type="url"
                  value={formData.instagram.url}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      instagram: { ...formData.instagram, url: e.target.value },
                    })
                  }
                  required
                  placeholder="https://instagram.com/..."
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-pink-500 font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-1">
                Channel Description / Tagline
              </label>
              <input
                type="text"
                value={formData.instagram.description}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    instagram: { ...formData.instagram, description: e.target.value },
                  })
                }
                placeholder="Field notes & alerts"
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-pink-500"
              />
            </div>
          </div>

          {/* Facebook Config */}
          <div className="p-4 rounded-xl bg-slate-900/70 border border-blue-500/25 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-sm">
                  <Facebook className="w-4 h-4 fill-white" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                    <span>Facebook Page / Channel</span>
                  </h4>
                  <span className="text-[11px] text-slate-400">
                    Enterprise webinars, community & announcements
                  </span>
                </div>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-blue-300 border border-blue-900/50">
                Official Group
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-1">
                  Page / Channel Name
                </label>
                <input
                  type="text"
                  value={formData.facebook.name}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      facebook: { ...formData.facebook, name: e.target.value },
                    })
                  }
                  required
                  placeholder="Vectorbound Advisory Group"
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-blue-500 font-mono"
                />
              </div>
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-1">
                  Direct URL
                </label>
                <input
                  type="url"
                  value={formData.facebook.url}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      facebook: { ...formData.facebook, url: e.target.value },
                    })
                  }
                  required
                  placeholder="https://facebook.com/..."
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-blue-500 font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-1">
                Channel Description / Tagline
              </label>
              <input
                type="text"
                value={formData.facebook.description}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    facebook: { ...formData.facebook, description: e.target.value },
                  })
                }
                placeholder="Enterprise briefings & webinars"
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* YouTube Config */}
          <div className="p-4 rounded-xl bg-slate-900/70 border border-red-500/25 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center text-white shadow-sm">
                  <Youtube className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                    <span>YouTube Channel</span>
                  </h4>
                  <span className="text-[11px] text-slate-400">
                    Deep-dive cloud teardowns & live adversarial exploits
                  </span>
                </div>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-red-300 border border-red-900/50">
                Video Teardowns
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-1">
                  Channel Name / Handle
                </label>
                <input
                  type="text"
                  value={formData.youtube.name}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      youtube: { ...formData.youtube, name: e.target.value },
                    })
                  }
                  required
                  placeholder="@VectorboundArchitecture"
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-red-500 font-mono"
                />
              </div>
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-1">
                  Direct URL
                </label>
                <input
                  type="url"
                  value={formData.youtube.url}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      youtube: { ...formData.youtube, url: e.target.value },
                    })
                  }
                  required
                  placeholder="https://youtube.com/@..."
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-red-500 font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-1">
                Channel Description / Tagline
              </label>
              <input
                type="text"
                value={formData.youtube.description}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    youtube: { ...formData.youtube, description: e.target.value },
                  })
                }
                placeholder="Architecture teardowns & live tutorials"
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-red-500"
              />
            </div>
          </div>

          {/* Live Preview Box */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2.5">
            <div className="text-[11px] font-mono uppercase tracking-wider text-cyan-400 font-semibold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Live Site Render Preview
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex items-center gap-2">
                <XIcon className="w-4 h-4 text-white shrink-0" />
                <div className="truncate">
                  <span className="font-mono text-[11px] text-white block truncate">
                    {formData.x?.name || '@VectorboundSec'}
                  </span>
                  <span className="text-[10px] text-slate-400 truncate block">
                    {formData.x?.description || 'Threat alerts'}
                  </span>
                </div>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex items-center gap-2">
                <Instagram className="w-4 h-4 text-pink-400 shrink-0" />
                <div className="truncate">
                  <span className="font-mono text-[11px] text-white block truncate">
                    {formData.instagram.name || 'Instagram'}
                  </span>
                  <span className="text-[10px] text-slate-400 truncate block">
                    {formData.instagram.description || 'Live updates'}
                  </span>
                </div>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex items-center gap-2">
                <Facebook className="w-4 h-4 text-blue-400 shrink-0" />
                <div className="truncate">
                  <span className="font-mono text-[11px] text-white block truncate">
                    {formData.facebook.name || 'Facebook'}
                  </span>
                  <span className="text-[10px] text-slate-400 truncate block">
                    {formData.facebook.description || 'Community'}
                  </span>
                </div>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex items-center gap-2">
                <Youtube className="w-4 h-4 text-red-400 shrink-0" />
                <div className="truncate">
                  <span className="font-mono text-[11px] text-white block truncate">
                    {formData.youtube.name || 'YouTube'}
                  </span>
                  <span className="text-[10px] text-slate-400 truncate block">
                    {formData.youtube.description || 'Teardowns'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Permanent Code Edit Note */}
          <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800 text-[11px] text-slate-400 flex items-start gap-2">
            <Code className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <span>
              <strong className="text-slate-300">Code Persistence:</strong> Changes made here persist instantly in your browser via local storage. You can also permanently hardcode channel names in{' '}
              <code className="px-1 py-0.5 rounded bg-slate-900 text-cyan-300 font-mono text-[10px]">
                /src/data/contentData.ts
              </code>{' '}
              under <code className="text-cyan-300 font-mono text-[10px]">DEFAULT_SOCIAL_CHANNELS</code>.
            </span>
          </div>

          {/* Actions */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-800">
            <button
              type="button"
              onClick={handleReset}
              className="w-full sm:w-auto px-4 py-2 rounded-lg text-xs font-mono text-slate-400 hover:text-white hover:bg-slate-800 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>{t.socials.resetBtn}</span>
            </button>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => setIsChannelModalOpen(false)}
                className="w-1/2 sm:w-auto px-4 py-2 rounded-lg text-xs font-mono text-slate-300 hover:bg-slate-800 transition-colors cursor-pointer"
              >
                {t.socials.cancelBtn}
              </button>
              <button
                type="submit"
                className="w-1/2 sm:w-auto px-5 py-2 rounded-lg text-xs font-mono font-bold bg-gradient-to-r from-cyan-500 to-teal-400 hover:from-cyan-400 hover:to-teal-300 text-slate-950 shadow-md shadow-cyan-500/25 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Check className="w-3.5 h-3.5" />
                <span>{t.socials.saveBtn}</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
