"use client";

import Link from "next/link";
import Image from "next/image";
import { X, Clock, TrendingUp } from "lucide-react";

interface SuggestionItem {
  type: "product" | "category";
  label: string;
  href: string;
  icon?: string;
}

interface SearchSuggestionsProps {
  query: string;
  results: { id: string; name: string; image: string; price: number; href: string }[];
  suggestions: SuggestionItem[];
  history: string[];
  popularSearches: string[];
  onSelectResult: (id: string) => void;
  onRemoveHistory: (item: string) => void;
  onClearHistory: () => void;
  onSelectSuggestion: (href: string) => void;
}

export default function SearchSuggestions({
  query,
  results,
  suggestions,
  history,
  popularSearches,
  onSelectResult,
  onRemoveHistory,
  onClearHistory,
  onSelectSuggestion,
}: SearchSuggestionsProps) {
  return (
    <div
      id="search-suggestions"
      role="listbox"
      className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden z-50 animate-fade-in"
    >
      {/* No query - show history and popular */}
      {!query.trim() && (
        <div className="p-4">
          {history.length > 0 && (
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide flex items-center gap-1">
                  <Clock size={12} />
                  عمليات البحث الأخيرة
                </h3>
                <button
                  onClick={onClearHistory}
                  className="text-xs text-sky-600 dark:text-sky-400 hover:text-sky-700 font-medium"
                >
                  مسح الكل
                </button>
              </div>
              <div className="space-y-1">
                {history.map((item) => (
                  <div
                    key={item}
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 group"
                  >
                    <Link href={`/search?q=${encodeURIComponent(item)}`} className="flex-1 text-sm text-slate-700 dark:text-slate-300">
                      {item}
                    </Link>
                    <button
                      onClick={() => onRemoveHistory(item)}
                      className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-600 transition-all"
                      aria-label={`مسح ${item}`}
                    >
                      <X size={14} className="text-slate-400" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {popularSearches.length > 0 && (
            <div>
              <h3 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide flex items-center gap-1 mb-2">
                <TrendingUp size={12} />
                عمليات البحث الشائعة
              </h3>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map((term) => (
                  <Link
                    key={term}
                    href={`/search?q=${encodeURIComponent(term)}`}
                    className="px-3 py-1.5 bg-slate-100 dark:bg-slate-700 rounded-full text-xs text-slate-600 dark:text-slate-300 hover:bg-sky-100 dark:hover:bg-sky-900/30 hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
                  >
                    {term}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Has query - show suggestions */}
      {query.trim() && (
        <div className="max-h-80 overflow-y-auto">
          {/* Category suggestions */}
          {suggestions.filter(s => s.type === "category").length > 0 && (
            <div className="p-3 border-b border-slate-100 dark:border-slate-700">
              <h3 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase mb-2">تصنيفات</h3>
              <div className="space-y-1">
                {suggestions.filter(s => s.type === "category").map((item, i) => (
                  <Link
                    key={i}
                    href={item.href}
                    onClick={() => onSelectSuggestion(item.href)}
                    className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700"
                  >
                    <span className="text-xl">{item.icon}</span>
                    <span className="text-sm text-slate-700 dark:text-slate-300">{item.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Product results */}
          {results.length > 0 && (
            <div className="p-3">
              <h3 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase mb-2">منتجات</h3>
              <div className="space-y-1">
                {results.map((product) => (
                  <Link
                    key={product.id}
                    href={product.href}
                    onClick={() => onSelectResult(product.id)}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700"
                  >
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={40}
                      height={40}
                      className="w-10 h-10 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-slate-700 dark:text-slate-300 truncate">{product.name}</p>
                      <p className="text-xs text-sky-600 dark:text-sky-400 font-bold">{product.price} ر.ي</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* No results */}
          {results.length === 0 && suggestions.length === 0 && query.trim() && (
            <div className="p-6 text-center">
              <p className="text-slate-500 dark:text-slate-400 text-sm">لم يتم العثور على نتائج لـ &quot;{query}&quot;</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}