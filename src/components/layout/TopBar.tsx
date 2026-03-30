"use client";

import { Sun, Moon, Globe, DollarSign } from "lucide-react";
import { useTheme } from "@/lib/ThemeContext";
import { useLanguage, languages } from "@/lib/i18n";
import { useCurrency, currencies } from "@/lib/CurrencyContext";

export default function TopBar() {
  const { theme, toggleTheme } = useTheme();
  const { lang, setLang, config } = useLanguage();
  const { currency, setCurrency } = useCurrency();

  const nextLang = () => {
    const codes = languages.map((l) => l.code);
    const idx = codes.indexOf(lang);
    setLang(codes[(idx + 1) % codes.length]);
  };

  const nextCurrency = () => {
    const codes = currencies.map((c) => c.code);
    const idx = codes.indexOf(currency.code);
    setCurrency(codes[(idx + 1) % codes.length]);
  };

  return (
    <div className="gradient-primary text-white text-[11px] py-1">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        <span className="hidden sm:inline">شحن مجاني للطلبات فوق 200 ر.س</span>

        <div className="flex items-center gap-1 sm:gap-3">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="flex items-center gap-1 px-2 py-0.5 rounded-md hover:bg-white/15 transition-colors"
            aria-label={theme === "dark" ? "الوضع الفاتح" : "الوضع الداكن"}
          >
            {theme === "dark" ? <Sun size={13} /> : <Moon size={13} />}
            <span className="hidden sm:inline">{theme === "dark" ? "فاتح" : "داكن"}</span>
          </button>

          <span className="text-white/30 hidden sm:inline">|</span>

          {/* Language Toggle */}
          <button
            onClick={nextLang}
            className="flex items-center gap-1 px-2 py-0.5 rounded-md hover:bg-white/15 transition-colors"
            aria-label="تغيير اللغة"
          >
            <Globe size={13} />
            <span className="font-medium">{config.nativeName}</span>
          </button>

          <span className="text-white/30 hidden sm:inline">|</span>

          {/* Currency Toggle */}
          <button
            onClick={nextCurrency}
            className="flex items-center gap-1 px-2 py-0.5 rounded-md hover:bg-white/15 transition-colors"
            aria-label="تغيير العملة"
          >
            <DollarSign size={13} />
            <span className="font-medium">{currency.symbol}</span>
          </button>

          <span className="text-white/30 hidden sm:inline">|</span>

          {/* Contact */}
          <span className="hidden md:inline">📞 920001234</span>
        </div>
      </div>
    </div>
  );
}
