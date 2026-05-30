"use client";

import Link from "next/link";

interface AvailabilityFilterProps {
  inStock?: string;
  query: string;
  category?: string;
  min?: string;
  max?: string;
}

export default function AvailabilityFilter({ inStock, query, category, min, max }: AvailabilityFilterProps) {
  const buildUrl = (inStockValue?: string) => {
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (category) params.set("category", category);
    if (inStockValue) params.set("inStock", inStockValue);
    if (min) params.set("min", min);
    if (max) params.set("max", max);
    return `/search?${params.toString()}`;
  };

  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
        التوفر
      </label>
      <div className="flex gap-3">
        <Link
          href={buildUrl(undefined)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            !inStock
              ? "bg-sky-500 text-white"
              : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
          }`}
        >
          الكل
        </Link>
        <Link
          href={buildUrl("true")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            inStock === "true"
              ? "bg-emerald-500 text-white"
              : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
          }`}
        >
          متوفر
        </Link>
        <Link
          href={buildUrl("false")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            inStock === "false"
              ? "bg-red-500 text-white"
              : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
          }`}
        >
          غير متوفر
        </Link>
      </div>
    </div>
  );
}