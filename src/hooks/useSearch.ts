"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Search, X, Clock, TrendingUp } from "lucide-react";
import { searchProducts, categories, products } from "@/lib";

const SEARCH_HISTORY_KEY = "khuboor_search_history";
const MAX_HISTORY = 8;

export function useSearch() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(products);
  const [suggestions, setSuggestions] = useState<{ type: "product" | "category"; label: string; href: string; icon?: string }[]>([]);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const getSearchHistory = useCallback((): string[] => {
    if (typeof window === "undefined") return [];
    try {
      const stored = localStorage.getItem(SEARCH_HISTORY_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) return parsed.filter((x: unknown) => typeof x === "string");
      }
    } catch {
      localStorage.removeItem(SEARCH_HISTORY_KEY);
    }
    return [];
  }, []);

  const saveSearchHistory = useCallback((q: string) => {
    if (!q.trim()) return;
    const history = getSearchHistory();
    const filtered = history.filter((item) => item.toLowerCase() !== q.toLowerCase());
    const updated = [q, ...filtered].slice(0, MAX_HISTORY);
    localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(updated));
  }, [getSearchHistory]);

  const removeHistoryItem = useCallback((q: string) => {
    const history = getSearchHistory();
    const filtered = history.filter((item) => item !== q);
    localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(filtered));
  }, [getSearchHistory]);

  const clearHistory = useCallback(() => {
    localStorage.removeItem(SEARCH_HISTORY_KEY);
  }, []);

  const doSearch = useCallback((q: string) => {
    if (!q.trim()) {
      setResults([]);
      setSuggestions([]);
      return;
    }
    const searchResults = searchProducts(q);
    setResults(searchResults.slice(0, 5));

    const matchedCategories = categories.filter((c) =>
      c.name.toLowerCase().includes(q.toLowerCase())
    );
    const suggestionList = [
      ...matchedCategories.map((c) => ({
        type: "category" as const,
        label: c.name,
        href: `/category/${c.slug}`,
        icon: c.icon,
      })),
      ...searchResults.slice(0, 3).map((p) => ({
        type: "product" as const,
        label: p.name,
        href: `/product/${p.id}`,
      })),
    ];
    setSuggestions(suggestionList);
  }, []);

  const handleSearch = useCallback((searchQuery: string) => {
    if (!searchQuery.trim()) return;
    saveSearchHistory(searchQuery.trim());
    router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
  }, [router, saveSearchHistory]);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      if (!query.trim()) {
        setResults([]);
        setSuggestions([]);
      } else {
        doSearch(query);
      }
    }, 200);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query, doSearch]);

  return {
    query,
    setQuery,
    results,
    suggestions,
    handleSearch,
    getSearchHistory,
    removeHistoryItem,
    clearHistory,
  };
}

export function getPopularSearches(): string[] {
  const counts: Record<string, number> = {};
  products.forEach((p) => {
    const words = p.name.split(/\s+/);
    words.forEach((w) => {
      if (w.length > 2) {
        const key = w.toLowerCase();
        counts[key] = (counts[key] || 0) + 1;
      }
    });
  });
  return Object.entries(counts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 6)
    .map(([word]) => word);
}