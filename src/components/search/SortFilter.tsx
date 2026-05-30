"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";

interface SortFilterProps {
  currentSort?: string;
  query: string;
  category?: string;
}

const sortOptions = [
  { value: "", label: "الافتراضي" },
  { value: "price-asc", label: "السعر: من الأقل" },
  { value: "price-desc", label: "السعر: من الأعلى" },
  { value: "rating", label: "الأعلى تقييم" },
  { value: "newest", label: "الأحدث" },
];

export default function SortFilter({ currentSort, query, category }: SortFilterProps) {
  const buildUrl = (sort?: string) => {
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (category) params.set("category", category);
    if (sort) params.set("sort", sort);
    return `/search?${params.toString()}`;
  };

  return (
    <div className="relative group">
      <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-sm font-medium hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
        ترتيب
        <ChevronDown size={14} />
      </button>
      <div className="absolute top-full left-0 mt-1 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 py-1 min-w-[160px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-20">
        {sortOptions.map((option) => (
          <Link
            key={option.value}
            href={buildUrl(option.value)}
            className={`block px-4 py-2 text-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors ${
              currentSort === option.value
                ? "text-sky-500 font-medium"
                : "text-slate-600 dark:text-slate-300"
            }`}
          >
            {option.label}
          </Link>
        ))}
      </div>
    </div>
  );
}