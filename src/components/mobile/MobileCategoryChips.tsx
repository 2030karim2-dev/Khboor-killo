"use client";

import Link from "next/link";
import { categories } from "@/data/categories";
import { usePathname } from "next/navigation";

export default function MobileCategoryChips() {
  const pathname = usePathname();

  return (
    <div className="overflow-x-auto scrollbar-hide -mx-4 px-4">
      <div className="flex gap-2 pb-1">
        <Link
          href="/search"
          className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            pathname === "/search"
              ? "bg-sky-500 text-white"
              : "bg-white text-slate-600 border border-slate-200"
          }`}
        >
          الكل
        </Link>
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/category/${cat.slug}`}
            className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-1.5 ${
              pathname === `/category/${cat.slug}`
                ? "bg-sky-500 text-white"
                : "bg-white text-slate-600 border border-slate-200"
            }`}
          >
            <span className="text-base">{cat.icon}</span>
            <span>{cat.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
