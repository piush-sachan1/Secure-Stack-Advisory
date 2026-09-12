import React, { createContext, useContext, useState, useEffect } from 'react';
import { SupportedLanguage, SocialChannelsConfig, SocialChannelItem, SiteTheme } from '../types';
import { TRANSLATIONS, TranslationDictionary } from '../data/translations';
import { DEFAULT_SOCIAL_CHANNELS } from '../data/contentData';

interface AppContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: TranslationDictionary;
  channels: SocialChannelsConfig;
  updateChannel: (channelId: 'instagram' | 'facebook' | 'youtube' | 'x', updates: Partial<SocialChannelItem>) => void;
  saveAllChannels: (newConfig: SocialChannelsConfig) => void;
  resetChannels: () => void;
  isChannelModalOpen: boolean;
  setIsChannelModalOpen: (open: boolean) => void;
  theme: SiteTheme;
  setTheme: (theme: SiteTheme) => void;
  isThemeSandboxOpen: boolean;
  setIsThemeSandboxOpen: (open: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const LANGUAGE_STORAGE_KEY = 'vectorbound_lang';
const SOCIALS_STORAGE_KEY = 'vectorbound_socials';
const THEME_STORAGE_KEY = 'vectorbound_theme';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Theme state defaulting to Graphite & Pure Indigo ('slate-corporate')
  const [theme, setThemeState] = useState<SiteTheme>(() => {
    try {
      const saved = localStorage.getItem(THEME_STORAGE_KEY);
      if (
        saved === 'slate-corporate' ||
        saved === 'cyber-obsidian' ||
        saved === 'deep-navy' ||
        saved === 'emerald-matrix' ||
        saved === 'obsidian-gold' ||
        saved === 'nordic-frost' ||
        saved === 'amethyst-stealth' ||
        saved === 'crimson-sentinel' ||
        saved === 'swiss-minimal' ||
        saved === 'light-titanium'
      ) {
        return saved as SiteTheme;
      }
    } catch {
      // ignore
    }
    return 'slate-corporate';
  });

  const [isThemeSandboxOpen, setIsThemeSandboxOpen] = useState(false);

  // Sync data-theme attribute on root element
  useEffect(() => {
    try {
      document.documentElement.setAttribute('data-theme', theme);
      // If light theme, we also toggle a light-theme class
      if (theme === 'light-titanium') {
        document.documentElement.classList.add('theme-light');
      } else {
        document.documentElement.classList.remove('theme-light');
      }
    } catch {
      // ignore
    }
  }, [theme]);

  const setTheme = (newTheme: SiteTheme) => {
    setThemeState(newTheme);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, newTheme);
    } catch {
      // ignore
    }
  };

  // Language state with persistence
  const [language, setLanguageState] = useState<SupportedLanguage>(() => {
    try {
      const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY);
      if (saved && (saved === 'en' || saved === 'de' || saved === 'fr')) {
        return saved as SupportedLanguage;
      }
    } catch {
      // ignore
    }
    return 'en';
  });

  // Social channels state with persistence
  const [channels, setChannelsState] = useState<SocialChannelsConfig>(() => {
    try {
      const saved = localStorage.getItem(SOCIALS_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed) {
          return {
            x: { ...DEFAULT_SOCIAL_CHANNELS.x, ...(parsed.x || {}) },
            instagram: { ...DEFAULT_SOCIAL_CHANNELS.instagram, ...(parsed.instagram || {}) },
            facebook: { ...DEFAULT_SOCIAL_CHANNELS.facebook, ...(parsed.facebook || {}) },
            youtube: { ...DEFAULT_SOCIAL_CHANNELS.youtube, ...(parsed.youtube || {}) },
          };
        }
      }
    } catch {
      // ignore
    }
    return DEFAULT_SOCIAL_CHANNELS;
  });

  const [isChannelModalOpen, setIsChannelModalOpen] = useState(false);

  const setLanguage = (lang: SupportedLanguage) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
    } catch {
      // ignore
    }
  };

  const updateChannel = (
    channelId: 'instagram' | 'facebook' | 'youtube' | 'x',
    updates: Partial<SocialChannelItem>
  ) => {
    setChannelsState((prev) => {
      const updated = {
        ...prev,
        [channelId]: {
          ...prev[channelId],
          ...updates,
        },
      };
      try {
        localStorage.setItem(SOCIALS_STORAGE_KEY, JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  };

  const saveAllChannels = (newConfig: SocialChannelsConfig) => {
    setChannelsState(newConfig);
    try {
      localStorage.setItem(SOCIALS_STORAGE_KEY, JSON.stringify(newConfig));
    } catch {
      // ignore
    }
  };

  const resetChannels = () => {
    setChannelsState(DEFAULT_SOCIAL_CHANNELS);
    try {
      localStorage.removeItem(SOCIALS_STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        t,
        channels,
        updateChannel,
        saveAllChannels,
        resetChannels,
        isChannelModalOpen,
        setIsChannelModalOpen,
        theme,
        setTheme,
        isThemeSandboxOpen,
        setIsThemeSandboxOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
