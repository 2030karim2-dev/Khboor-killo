"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { Product } from "@/types/product";

interface CompareContextType {
  items: Product[];
  addItem: (product: Product) => void;
  removeItem: (id: string) => void;
  isInCompare: (id: string) => boolean;
  clearAll: () => void;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

const MAX_COMPARE_ITEMS = 4;
const STORAGE_KEY = "khuboor_compare";

function getStoredItems(): Product[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return [];
  try {
    return JSON.parse(stored);
  } catch {
    return [];
  }
}

export function CompareProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Product[]>(getStoredItems);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = (product: Product) => {
    setItems((prev) => {
      if (prev.some((p) => p.id === product.id)) return prev;
      if (prev.length >= MAX_COMPARE_ITEMS) return prev;
      return [...prev, product];
    });
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((p) => p.id !== id));
  };

  const isInCompare = (id: string) => items.some((p) => p.id === id);

  const clearAll = () => setItems([]);

  return (
    <CompareContext.Provider value={{ items, addItem, removeItem, isInCompare, clearAll }}>
      {children}
    </CompareContext.Provider>
  );
}

export function useCompare() {
  const context = useContext(CompareContext);
  if (!context) throw new Error("useCompare must be used within a CompareProvider");
  return context;
}