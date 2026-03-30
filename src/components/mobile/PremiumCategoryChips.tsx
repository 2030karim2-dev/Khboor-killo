"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { categories } from "@/lib";
import { ChevronLeft } from "lucide-react";

export default function PremiumCategoryChips() {
  const pathname = usePathname();

  return (
    <div className="relative">
      <div className="overflow-x-auto scrollbar-hide -mx-4 px-4 pb-1">
        <div className="flex gap-2.5">
          {/* All */}
          <Link
            href="/search"
            className={`shrink-0 px-4 py-2 rounded-2xl text-sm font-medium transition-all duration-200 flex items-center gap-1.5 ${
              pathname === "/search"
                ? "bg-sky-500 text-white shadow-lg shadow-sky-500/25"
                : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-sky-300 hover:bg-sky-50 dark:hover:bg-sky-900/20"
            }`}
          >
            <span className="text-base">🛍️</span>
            <span>الكل</span>
          </Link>

          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className={`shrink-0 px-4 py-2 rounded-2xl text-sm font-medium transition-all duration-200 flex items-center gap-1.5 ${
                pathname === `/category/${cat.slug}`
                  ? "bg-sky-500 text-white shadow-lg shadow-sky-500/25"
                  : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-sky-300 hover:bg-sky-50 dark:hover:bg-sky-900/20"
              }`}
            >
              <span className="text-base">{cat.icon}</span>
              <span>{cat.name}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-slate-50 dark:from-slate-900 to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-slate-50 dark:from-slate-900 to-transparent pointer-events-none" />
    </div>
  );
}
