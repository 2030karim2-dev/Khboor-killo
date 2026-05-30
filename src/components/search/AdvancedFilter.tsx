"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import AvailabilityFilter from "./AvailabilityFilter";
import RatingFilter from "./RatingFilter";

interface AdvancedFilterProps {
  inStock?: string;
  minRating?: string;
  query: string;
  category?: string;
  min?: string;
  max?: string;
}

export default function AdvancedFilter({
  inStock,
  minRating,
  query,
  category,
  min,
  max,
}: AdvancedFilterProps) {
  const router = useRouter();
  const [priceRange, setPriceRange] = useState({
    min: min ? Number(min) : 0,
    max: max ? Number(max) : 1000000,
  });

  const buildFilterUrl = (updates: Record<string, string | undefined>) => {
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (category) params.set("category", category);
    Object.entries(updates).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });
    return `/search?${params.toString()}`;
  };

  const handlePriceApply = () => {
    const url = buildFilterUrl({
      min: priceRange.min > 0 ? String(priceRange.min) : undefined,
      max: priceRange.max < 1000000 ? String(priceRange.max) : undefined,
    });
    router.push(url);
  };

  return (
    <div className="card p-5 dark:bg-slate-800 space-y-5 animate-fade-in">
      <PriceRangeFilter
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        onApply={handlePriceApply}
        min={min}
        max={max}
      />

      <AvailabilityFilter inStock={inStock} query={query} category={category} min={min} max={max} />

      <RatingFilter inStock={inStock} minRating={minRating} query={query} category={category} min={min} max={max} />
    </div>
  );
}

interface PriceRangeFilterProps {
  priceRange: { min: number; max: number };
  setPriceRange: (range: { min: number; max: number }) => void;
  onApply: () => void;
  min?: string;
  max?: string;
}

function PriceRangeFilter({
  priceRange,
  setPriceRange,
  onApply,
  min,
  max,
}: PriceRangeFilterProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
        نطاق السعر (ر.ي)
      </label>
      <div className="flex items-center gap-4">
        <input
          type="number"
          value={priceRange.min}
          onChange={(e) =>
            setPriceRange({ ...priceRange, min: Number(e.target.value) })
          }
          placeholder="من"
          className="flex-1 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 focus:border-sky-500 focus:outline-none"
        />
        <span className="text-slate-400">-</span>
        <input
          type="number"
          value={priceRange.max}
          onChange={(e) =>
            setPriceRange({ ...priceRange, max: Number(e.target.value) })
          }
          placeholder="إلى"
          className="flex-1 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 focus:border-sky-500 focus:outline-none"
        />
        <button
          onClick={onApply}
          className="px-4 py-2 bg-sky-500 text-white rounded-lg text-sm font-medium hover:bg-sky-600 transition-colors"
        >
          تطبيق
        </button>
      </div>
      {min && max && (
        <p className="text-sm text-slate-500 mt-2">
          السعر المحدد: {Number(min).toLocaleString()} -{" "}
          {Number(max).toLocaleString()} ر.ي
        </p>
      )}
    </div>
  );
}