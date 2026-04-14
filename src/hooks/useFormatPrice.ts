"use client";

import { useCurrency } from "@/contexts/CurrencyContext";

export function useFormatPrice() {
  const { format, currency } = useCurrency();
  return {
    format,
    currency,
  };
}