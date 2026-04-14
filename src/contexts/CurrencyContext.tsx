"use client";

import { createContext, useContext, useState, useCallback, useMemo, type ReactNode } from "react";

export type CurrencyCode = "SAR" | "YER" | "OMR" | "USD" | "CNY";

export interface Currency {
  code: CurrencyCode;
  symbol: string;
  name: string;
  nameAr: string;
  nameZh: string;
  rate: number; // relative to YER (1 YER = rate * other)
}

export const currencies: Currency[] = [
  { code: "YER", symbol: "ر.ي", name: "Yemeni Riyal", nameAr: "الريال اليمني", nameZh: "也门里亚尔", rate: 1 },
  { code: "SAR", symbol: "ر.س", name: "Saudi Riyal", nameAr: "الريال السعودي", nameZh: "沙特里亚尔", rate: 0.00673 },
  { code: "OMR", symbol: "ر.ع", name: "Omani Riyal", nameAr: "الريال العماني", nameZh: "阿曼里亚尔", rate: 0.000694 },
  { code: "USD", symbol: "$", name: "US Dollar", nameAr: "الدولار الأمريكي", nameZh: "美元", rate: 0.00405 },
  { code: "CNY", symbol: "¥", name: "Chinese Yuan", nameAr: "الين الصيني", nameZh: "人民币", rate: 0.013 },
];

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (code: CurrencyCode) => void;
  convert: (priceInSAR: number) => number;
  format: (priceInSAR: number) => string;
  currencies: Currency[];
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

const CURRENCY_KEY = "khuboor_currency";

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>(() => {
    if (typeof window === "undefined") return currencies[0];
    const stored = localStorage.getItem(CURRENCY_KEY) as CurrencyCode | null;
    if (stored) {
      const found = currencies.find((c) => c.code === stored);
      if (found) return found;
    }
    return currencies[0];
  });

  const setCurrency = useCallback((code: CurrencyCode) => {
    const found = currencies.find((c) => c.code === code);
    if (found) {
      setCurrencyState(found);
      localStorage.setItem(CURRENCY_KEY, code);
    }
  }, []);

  const convert = useCallback(
    (priceInSAR: number): number => {
      return Math.round(priceInSAR * currency.rate * 100) / 100;
    },
    [currency.rate]
  );

  const format = useCallback(
    (priceInSAR: number): string => {
      const converted = convert(priceInSAR);
      return `${converted.toLocaleString("en")} ${currency.symbol}`;
    },
    [convert, currency.symbol]
  );

  const value = useMemo(
    () => ({ currency, setCurrency, convert, format, currencies }),
    [currency, setCurrency, convert, format]
  );

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) throw new Error("useCurrency must be used within a CurrencyProvider");
  return context;
}
