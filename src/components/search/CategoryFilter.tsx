"use client";

import Link from "next/link";
import { categories } from "@/data/categories";

interface CategoryFilterProps {
  currentCategory?: string;
  query: string;
}

export default function CategoryFilter({ currentCategory, query }: CategoryFilterProps) {
  const buildUrl = (category?: string) => {
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (category) params.set("category", category);
    return `/search?${params.toString()}`;
  };

  return (
    <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2 flex-1">
      <Link
        href={buildUrl(undefined)}
        className={`shrink-0 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
          !currentCategory
            ? "bg-sky-500 text-white"
            : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
        }`}
      >
        الكل
      </Link>
      {categories.map((cat) => (
        <Link
          key={cat.slug}
          href={buildUrl(cat.slug)}
          className={`shrink-0 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
            currentCategory === cat.slug
              ? "bg-sky-500 text-white"
              : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
          }`}
        >
          {cat.icon} {cat.name}
        </Link>
      ))}
    </div>
  );
}