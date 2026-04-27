"use client";

import { useId } from "react";
import { Sun, Moon, Globe, DollarSign } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage, Locale } from "@/lib/language";
import { CONTACT_PHONE } from "@/utils/constants";
import { useCurrency, CurrencyCode } from "@/contexts/CurrencyContext";

export default function TopBar() {
  const { theme, toggleTheme } = useTheme();
  const { locale, setLocale } = useLanguage();
  const { currency, setCurrency } = useCurrency();
  const id = useId();

  const locales: Locale[] = ["ar", "en", "zh"];
  const localeNames = { ar: "العربية", en: "English", zh: "中文" };

  const nextLang = () => {
    const idx = locales.indexOf(locale);
    setLocale(locales[(idx + 1) % locales.length]);
  };


  const nextCurrency = () => {
    const currencyCodes = ["YER", "USD", "SAR", "OMR", "CNY"] as CurrencyCode[];
    const idx = currencyCodes.indexOf(currency.code);
    const nextCode = currencyCodes[(idx + 1) % currencyCodes.length];
    setCurrency(nextCode);
  };
  return (
    <div className="gradient-primary text-white text-[11px] py-1">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        <span className="hidden sm:inline">شحن مجاني للطلبات فوق 200 ر.ي</span>

        <div className="flex items-center gap-1 sm:gap-3">
          <button
            onClick={toggleTheme}
            className="flex items-center gap-1 px-2 py-0.5 rounded-md hover:bg-white/15 transition-colors cursor-pointer"
            aria-label={theme === "dark" ? "الوضع الفاتح" : "الوضع الداكن"}
          >
            {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
            <span className="hidden sm:inline">{theme === "dark" ? "فاتح" : "داكن"}</span>
          </button>

          <span className="text-white/30 hidden sm:inline">|</span>

          <button
            onClick={nextLang}
            className="flex items-center gap-1 px-2 py-0.5 rounded-md hover:bg-white/15 transition-colors cursor-pointer"
            aria-label="تغيير اللغة"
          >
            <Globe size={14} />
            <span className="font-medium">{localeNames[locale as keyof typeof localeNames]}</span>
          </button>

          <span className="text-white/30 hidden sm:inline">|</span>

          <button
            onClick={nextCurrency}
            className="flex items-center gap-1 px-2 py-0.5 rounded-md hover:bg-white/15 transition-colors cursor-pointer"
            aria-label="تغيير العملة"
          >
            <DollarSign size={14} />
            <span className="font-medium">{currency?.symbol || "ر.ي"}</span>
          </button>

          <span className="text-white/30 hidden md:inline">|</span>
          <span className="hidden md:inline" dir="ltr">📞 {CONTACT_PHONE}</span>
        </div>
      </div>
    </div>
  );
}
