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
import { Product } from "../types/product";
import { products as allProducts } from "../data/products";

interface WishlistContextType {
  itemIds: string[];
  products: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

const STORAGE_KEY = "khuboor_wishlist";

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [itemIds, setItemIds] = useState<string[]>(() => {
    if (typeof window === "undefined") return [];
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) return parsed.filter((x: unknown) => typeof x === "string");
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(itemIds));
  }, [itemIds]);

  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key !== STORAGE_KEY || !e.newValue) return;
      try {
        const parsed = JSON.parse(e.newValue);
        if (Array.isArray(parsed)) {
          setItemIds(parsed.filter((x: unknown) => typeof x === "string"));
        }
      } catch {
        // ignore
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const products = useMemo(
    () => itemIds.map((id) => allProducts.find((p) => p.id === id)).filter(Boolean) as Product[],
    [itemIds]
  );

  const addToWishlist = useCallback((product: Product) => {
    setItemIds((prev) => (prev.includes(product.id) ? prev : [...prev, product.id]));
  }, []);

  const removeFromWishlist = useCallback((productId: string) => {
    setItemIds((prev) => prev.filter((id) => id !== productId));
  }, []);

  const toggleWishlist = useCallback((product: Product) => {
    setItemIds((prev) =>
      prev.includes(product.id) ? prev.filter((id) => id !== product.id) : [...prev, product.id]
    );
  }, []);

  const isInWishlist = useCallback(
    (productId: string) => itemIds.includes(productId),
    [itemIds]
  );

  const clearWishlist = useCallback(() => setItemIds([]), []);

  return (
    <WishlistContext.Provider
      value={{ itemIds, products, addToWishlist, removeFromWishlist, toggleWishlist, isInWishlist, clearWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) throw new Error("useWishlist must be used within a WishlistProvider");
  return context;
}
