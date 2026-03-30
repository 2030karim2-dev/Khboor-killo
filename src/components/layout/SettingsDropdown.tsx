"use client";

import { useState, useRef, useEffect } from "react";
import { Settings, Sun, Moon, Globe, DollarSign, Check } from "lucide-react";
import { useTheme } from "@/lib/ThemeContext";
import { useLanguage, languages } from "@/lib/i18n";
import { useCurrency, currencies, type CurrencyCode } from "@/lib/CurrencyContext";

export default function SettingsDropdown() {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<"theme" | "lang" | "currency">("theme");
  const { theme, setTheme } = useTheme();
  const { lang, setLang, config } = useLanguage();
  const { currency, setCurrency } = useCurrency();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getCurrencyName = (c: typeof currencies[0]) => {
    if (lang === "ar") return c.nameAr;
    if (lang === "zh") return c.nameZh;
    return c.name;
  };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        aria-label="الإعدادات"
        aria-expanded={open}
      >
        <Settings size={20} className="text-slate-600 dark:text-slate-300" />
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-1 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 min-w-[240px] animate-fade-in z-50">
          {/* Tabs */}
          <div className="flex border-b border-slate-100 dark:border-slate-700">
            {[
              { key: "theme" as const, icon: theme === "dark" ? Moon : Sun, label: theme === "dark" ? "☀️" : "🌙" },
              { key: "lang" as const, icon: Globe, label: config.dir === "rtl" ? "ع" : lang === "zh" ? "中" : "En" },
              { key: "currency" as const, icon: DollarSign, label: currency.symbol },
            ].map((t) => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`flex-1 py-2.5 text-xs font-medium transition-colors ${
                  tab === t.key ? "text-sky-600 border-b-2 border-sky-600" : "text-slate-400 hover:text-slate-600"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="p-2">
            {/* Theme */}
            {tab === "theme" && (
              <div className="space-y-1">
                <button
                  onClick={() => { setTheme("light"); setOpen(false); }}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 text-sm"
                >
                  <Sun size={16} />
                  <span>فاتح / Light</span>
                  {theme === "light" && <Check size={14} className="text-sky-600 mr-auto" />}
                </button>
                <button
                  onClick={() => { setTheme("dark"); setOpen(false); }}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 text-sm"
                >
                  <Moon size={16} />
                  <span>داكن / Dark</span>
                  {theme === "dark" && <Check size={14} className="text-sky-600 mr-auto" />}
                </button>
              </div>
            )}

            {/* Language */}
            {tab === "lang" && (
              <div className="space-y-1">
                {languages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => { setLang(l.code); setOpen(false); }}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 text-sm"
                  >
                    <span className="text-base">
                      {l.code === "ar" ? "🇸🇦" : l.code === "en" ? "🇺🇸" : "🇨🇳"}
                    </span>
                    <span>{l.nativeName}</span>
                    <span className="text-slate-400 text-xs">({l.name})</span>
                    {lang === l.code && <Check size={14} className="text-sky-600 mr-auto" />}
                  </button>
                ))}
              </div>
            )}

            {/* Currency */}
            {tab === "currency" && (
              <div className="space-y-1">
                {currencies.map((c) => (
                  <button
                    key={c.code}
                    onClick={() => { setCurrency(c.code); setOpen(false); }}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 text-sm"
                  >
                    <span className="font-bold text-xs w-8 text-center">{c.symbol}</span>
                    <span>{getCurrencyName(c)}</span>
                    {currency.code === c.code && <Check size={14} className="text-sky-600 mr-auto" />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
