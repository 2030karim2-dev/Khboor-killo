"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Search, X, Clock, TrendingUp, ChevronLeft } from "lucide-react";
import { searchProducts, categories, products } from "@/lib";

const SEARCH_HISTORY_KEY = "khuboor_search_history";
const MAX_HISTORY = 8;

function getSearchHistory(): string[] {
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
}

function saveSearchHistory(query: string) {
  if (!query.trim()) return;
  const history = getSearchHistory();
  const filtered = history.filter((q) => q.toLowerCase() !== query.toLowerCase());
  const updated = [query, ...filtered].slice(0, MAX_HISTORY);
  localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(updated));
}

function removeSearchHistory(query: string) {
  const history = getSearchHistory();
  const filtered = history.filter((q) => q !== query);
  localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(filtered));
}

function getPopularSearches(): string[] {
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

export default function SearchBar({ className = "" }: { className?: string }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<typeof products>([]);
  const [suggestions, setSuggestions] = useState<{ type: "product" | "category"; label: string; href: string; icon?: string }[]>([]);
  const [history] = useState<string[]>(() => getSearchHistory());
  const containerRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = useCallback((searchQuery: string) => {
    if (!searchQuery.trim()) return;
    saveSearchHistory(searchQuery.trim());
    setIsOpen(false);
    router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
  }, [router]);

  const clearHistory = useCallback(() => {
    localStorage.removeItem(SEARCH_HISTORY_KEY);
    window.location.reload();
  }, []);

  const removeHistoryItem = useCallback((item: string) => {
    removeSearchHistory(item);
    window.location.reload();
  }, []);

  const doSearch = useCallback((q: string) => {
    if (!q.trim()) return;
    if (debounceRef.current) clearTimeout(debounceRef.current);
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

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setSuggestions([]);
      return;
    }

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      doSearch(query);
    }, 200);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query, doSearch]);

  const popularSearches = getPopularSearches();

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <form
        action="/search"
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch(query);
        }}
      >
        <label htmlFor="search-input" className="sr-only">ابحث عن منتجات</label>
        <input
          id="search-input"
          type="search"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="ابحث عن منتجات..."
          className="w-full py-2.5 pr-12 pl-4 rounded-xl border-2 border-slate-200 focus:border-sky-500 focus:outline-none transition-colors bg-white text-right"
          autoComplete="off"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-controls="search-suggestions"
        />
        <button
          type="submit"
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-sky-500 text-white p-1.5 rounded-lg hover:bg-sky-600 transition-colors"
          aria-label="بحث"
        >
          <Search size={18} aria-hidden="true" />
        </button>
      </form>

      {isOpen && (
        <div
          id="search-suggestions"
          role="listbox"
          className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden z-50 animate-fade-in"
        >
          {!query.trim() && (
            <div className="p-4">
              {history.length > 0 && (
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wide">عمليات البحث الأخيرة</h3>
                    <button
                      onClick={() => {
                        localStorage.removeItem(SEARCH_HISTORY_KEY);
                        setHistory([]);
                      }}
                      className="text-xs text-sky-600 hover:text-sky-700"
                    >
                      مسح الكل
                    </button>
                  </div>
                  <div className="space-y-1">
                    {history.map((item) => (
                      <div
                        key={item}
                        className="flex items-center justify-between group px-3 py-2 rounded-lg hover:bg-slate-50 cursor-pointer"
                        onClick={() => handleSearch(item)}
                        role="option"
                      >
                        <div className="flex items-center gap-2">
                          <Clock size={14} className="text-slate-400" />
                          <span className="text-sm text-slate-700">{item}</span>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            removeSearchHistory(item);
                            setHistory(getSearchHistory());
                          }}
                          className="opacity-0 group-hover:opacity-100 p-1 hover:bg-slate-200 rounded"
                          aria-label={`إزالة "${item}" من التاريخ`}
                        >
                          <X size={12} className="text-slate-400" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2 flex items-center gap-1.5">
                  <TrendingUp size={12} />
                  عمليات بحث شائعة
                </h3>
                <div className="flex flex-wrap gap-2">
                  {popularSearches.map((term) => (
                    <button
                      key={term}
                      onClick={() => handleSearch(term)}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-full text-xs text-slate-700 transition-colors"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {query.trim() && suggestions.length > 0 && (
            <div className="p-2">
              {suggestions.map((s, i) => (
                <Link
                  key={`${s.type}-${i}`}
                  href={s.href}
                  onClick={() => {
                    setIsOpen(false);
                    if (s.type === "product") saveSearchHistory(query.trim());
                  }}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-50 transition-colors"
                  role="option"
                  aria-selected={false}
                >
                  {s.icon && <span className="text-lg" aria-hidden="true">{s.icon}</span>}
                  {!s.icon && <Search size={16} className="text-slate-400" />}
                  <span className="text-sm text-slate-700">{s.label}</span>
                  <ChevronLeft size={14} className="text-slate-300 mr-auto" />
                </Link>
              ))}
            </div>
          )}

          {query.trim() && results.length > 0 && (
            <div className="border-t border-slate-100 p-2">
              <p className="text-xs text-slate-500 px-3 py-1.5">منتجات مقترحة</p>
              {results.map((product) => (
                <Link
                  key={product.id}
                  href={`/product/${product.id}`}
                  onClick={() => {
                    setIsOpen(false);
                    saveSearchHistory(query.trim());
                  }}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-50 transition-colors"
                  role="option"
                  aria-selected={false}
                >
                  <div className="w-10 h-10 rounded-lg bg-slate-100 overflow-hidden shrink-0" />
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-slate-800 truncate">{product.name}</p>
                    <p className="text-xs text-slate-500">{product.category}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {query.trim() && results.length === 0 && suggestions.length === 0 && (
            <div className="p-6 text-center">
              <Search size={32} className="text-slate-300 mx-auto mb-2" />
              <p className="text-sm text-slate-500">لا توجد نتائج لـ &ldquo;{query}&rdquo;</p>
              <p className="text-xs text-slate-400 mt-1">حاول بكلمات مختلفة</p>
            </div>
          )}

          <div className="border-t border-slate-100 px-4 py-2">
            <button
              onClick={() => handleSearch(query)}
              className="w-full py-2 bg-sky-500 text-white rounded-lg text-sm font-medium hover:bg-sky-600 transition-colors"
            >
              بحث عن &ldquo;{query}&rdquo;
            </button>
          </div>
        </div>
      )}
    </div>
  );
}