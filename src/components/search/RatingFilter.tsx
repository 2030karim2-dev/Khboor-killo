"use client";

import Link from "next/link";

interface RatingFilterProps {
  inStock?: string;
  minRating?: string;
  query: string;
  category?: string;
  min?: string;
  max?: string;
}

export default function RatingFilter({ inStock, minRating, query, category, min, max }: RatingFilterProps) {
  const buildUrl = (rating?: string) => {
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (category) params.set("category", category);
    if (inStock) params.set("inStock", inStock);
    if (rating) params.set("minRating", rating);
    if (min) params.set("min", min);
    if (max) params.set("max", max);
    return `/search?${params.toString()}`;
  };

  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
        الحد الأدنى للتقييم
      </label>
      <div className="flex gap-2 flex-wrap">
        {[4, 3, 2, 1].map((rating) => (
          <Link
            key={rating}
            href={buildUrl(String(rating))}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              minRating === String(rating)
                ? "bg-amber-500 text-white"
                : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
            }`}
          >
            {rating}+ ★
          </Link>
        ))}
        <Link
          href={buildUrl(undefined)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            !minRating
              ? "bg-sky-500 text-white"
              : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
          }`}
        >
          الكل
        </Link>
      </div>
    </div>
  );
}