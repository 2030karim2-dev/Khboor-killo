"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useMemo,
  ReactNode,
} from "react";
import { Product } from "./types";
import { products as allProducts } from "./products";

interface RecentlyViewedContextType {
  products: Product[];
  addProduct: (product: Product) => void;
}

const RecentlyViewedContext = createContext<RecentlyViewedContextType | undefined>(undefined);

const STORAGE_KEY = "khuboor_recently_viewed";
const MAX_ITEMS = 10;

export function RecentlyViewedProvider({ children }: { children: ReactNode }) {
  const [productIds, setProductIds] = useState<string[]>(() => {
    if (typeof window === "undefined") return [];
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) return parsed.filter((x: unknown) => typeof x === "string").slice(0, MAX_ITEMS);
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(productIds));
  }, [productIds]);

  const products = useMemo(
    () => productIds.map((id) => allProducts.find((p) => p.id === id)).filter(Boolean) as Product[],
    [productIds]
  );

  const addProduct = useCallback((product: Product) => {
    setProductIds((prev) => {
      const filtered = prev.filter((id) => id !== product.id);
      return [product.id, ...filtered].slice(0, MAX_ITEMS);
    });
  }, []);

  return (
    <RecentlyViewedContext.Provider value={{ products, addProduct }}>
      {children}
    </RecentlyViewedContext.Provider>
  );
}

export function useRecentlyViewed() {
  const context = useContext(RecentlyViewedContext);
  if (!context) throw new Error("useRecentlyViewed must be used within a RecentlyViewedProvider");
  return context;
}
