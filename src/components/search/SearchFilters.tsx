"use client";

import { useState } from "react";
import Link from "next/link";
import { SlidersHorizontal, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { Product } from "@/types/product";
import CategoryFilter from "./CategoryFilter";
import SortFilter from "./SortFilter";
import AdvancedFilter from "./AdvancedFilter";

interface SearchFiltersProps {
  query: string;
  results: Product[];
  currentFilters: {
    category?: string;
    sort?: string;
    min?: string;
    max?: string;
    inStock?: string;
    minRating?: string;
  };
}

export default function SearchFilters({
  query,
  results,
  currentFilters,
}: SearchFiltersProps) {
  const router = useRouter();
  const [showAdvanced, setShowAdvanced] = useState(false);

  const hasFilters =
    currentFilters.category ||
    currentFilters.min ||
    currentFilters.max ||
    currentFilters.inStock ||
    currentFilters.minRating;

  const clearFilters = () => {
    router.push(`/search?q=${query}`);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3 mb-6">
        <CategoryFilter
          currentCategory={currentFilters.category}
          query={query}
        />

        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            showAdvanced || hasFilters
              ? "bg-sky-500 text-white"
              : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
          }`}
        >
          <SlidersHorizontal size={16} />
          فلترة
          {(currentFilters.inStock || currentFilters.minRating) && (
            <span className="w-2 h-2 bg-orange-500 rounded-full" />
          )}
        </button>

        <SortFilter
          currentSort={currentFilters.sort}
          query={query}
          category={currentFilters.category}
        />
      </div>

      {showAdvanced && (
        <div className="relative">
          <AdvancedFilter
            inStock={currentFilters.inStock}
            minRating={currentFilters.minRating}
            query={query}
            category={currentFilters.category}
            min={currentFilters.min}
            max={currentFilters.max}
          />
          {hasFilters && (
            <button
              onClick={clearFilters}
              className="absolute top-5 left-5 text-sm text-red-500 hover:text-red-600"
            >
              مسح الكل
            </button>
          )}
        </div>
      )}

      {hasFilters && (
        <ActiveFilters filters={currentFilters} query={query} />
      )}

      <p className="text-slate-500 dark:text-slate-400">
        تم العثور على <span className="font-bold text-slate-800 dark:text-white">{results.length}</span> منتج
      </p>
    </div>
  );
}

interface ActiveFiltersProps {
  filters: SearchFiltersProps["currentFilters"];
  query: string;
}

function ActiveFilters({ filters, query }: ActiveFiltersProps) {
  const router = useRouter();

  const buildFilterUrl = (updates: Record<string, string | undefined>) => {
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    Object.entries(updates).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });
    return `/search?${params.toString()}`;
  };

  return (
    <div className="flex flex-wrap gap-2 items-center">
      <span className="text-sm text-slate-500">الفلاتر النشطة:</span>

      {filters.category && (
        <span className="inline-flex items-center gap-1 px-3 py-1 bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300 rounded-full text-sm">
          {filters.category}
          <button
            onClick={() => router.push(buildFilterUrl({ category: undefined }))}
            className="hover:text-sky-900"
          >
            <X size={14} />
          </button>
        </span>
      )}

      {filters.min && (
        <span className="inline-flex items-center gap-1 px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-full text-sm">
          السعر: {Number(filters.min).toLocaleString()}+
          <button
            onClick={() => router.push(buildFilterUrl({ min: undefined }))}
            className="hover:text-slate-900"
          >
            <X size={14} />
          </button>
        </span>
      )}

      {filters.max && (
        <span className="inline-flex items-center gap-1 px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-full text-sm">
          حتى: {Number(filters.max).toLocaleString()}
          <button
            onClick={() => router.push(buildFilterUrl({ max: undefined }))}
            className="hover:text-slate-900"
          >
            <X size={14} />
          </button>
        </span>
      )}

      {filters.inStock === "true" && (
        <span className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded-full text-sm">
          متوفر فقط
          <button
            onClick={() => router.push(buildFilterUrl({ inStock: undefined }))}
            className="hover:text-emerald-900"
          >
            <X size={14} />
          </button>
        </span>
      )}

      {filters.minRating && (
        <span className="inline-flex items-center gap-1 px-3 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 rounded-full text-sm">
          {filters.minRating}+ ★
          <button
            onClick={() => router.push(buildFilterUrl({ minRating: undefined }))}
            className="hover:text-amber-900"
          >
            <X size={14} />
          </button>
        </span>
      )}
    </div>
  );
}