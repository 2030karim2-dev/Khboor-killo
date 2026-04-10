"use client";

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { Lang, LanguageConfig, languages, defaultLang, getLanguageConfig } from "./config";
import ar from "./locales/ar";
import en from "./locales/en";
import zh from "./locales/zh";

const translations: Record<Lang, Record<string, string>> = { ar, en, zh };

interface LanguageContextType {
  lang: Lang;
  config: LanguageConfig;
  t: (key: string) => string;
  setLang: (lang: Lang) => void;
  languages: LanguageConfig[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const LANG_KEY = "khuboor_lang";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    if (typeof window === "undefined") return defaultLang;
    const stored = localStorage.getItem(LANG_KEY) as Lang | null;
    if (stored && ["ar", "en", "zh"].includes(stored)) return stored;
    return defaultLang;
  });

  useEffect(() => {
    const config = getLanguageConfig(lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = config.dir;
    localStorage.setItem(LANG_KEY, lang);
  }, [lang]);

  const t = useCallback(
    (key: string): string => translations[lang][key] || translations.en[key] || key,
    [lang]
  );

  const setLang = useCallback((l: Lang) => setLangState(l), []);

  const config = getLanguageConfig(lang);

  return (
    <LanguageContext.Provider value={{ lang, config, t, setLang, languages }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within a LanguageProvider");
  return context;
}
