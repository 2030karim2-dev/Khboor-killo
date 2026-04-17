"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, SlidersHorizontal, X, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { categories } from "@/data/categories";
import { Product } from "@/types/product";

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
  const [priceRange, setPriceRange] = useState({
    min: currentFilters.min ? Number(currentFilters.min) : 0,
    max: currentFilters.max ? Number(currentFilters.max) : 1000000,
  });

  const buildFilterUrl = (updates: Record<string, string | undefined>) => {
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    Object.entries({ ...currentFilters, ...updates }).forEach(([key, value]) => {
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

  const clearFilters = () => {
    router.push(`/search?q=${query}`);
  };

  const hasFilters =
    currentFilters.category ||
    currentFilters.min ||
    currentFilters.max ||
    currentFilters.inStock ||
    currentFilters.minRating;

  return (
    <div className="space-y-4">
      {/* Main Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        {/* Category Filter */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2 flex-1">
          <Link
            href={buildFilterUrl({ category: undefined })}
            className={`shrink-0 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              !currentFilters.category
                ? "bg-sky-500 text-white"
                : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
            }`}
          >
            الكل
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={buildFilterUrl({ category: cat.slug })}
              className={`shrink-0 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                currentFilters.category === cat.slug
                  ? "bg-sky-500 text-white"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              {cat.icon} {cat.name}
            </Link>
          ))}
        </div>

        {/* Advanced Filters Button */}
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

        {/* Sort */}
        <div className="relative group">
          <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-sm font-medium hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
            ترتيب
            <ChevronDown size={14} />
          </button>
          <div className="absolute top-full left-0 mt-1 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 py-1 min-w-[160px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-20">
            {[
              { value: "", label: "الافتراضي" },
              { value: "price-asc", label: "السعر: من الأقل" },
              { value: "price-desc", label: "السعر: من الأعلى" },
              { value: "rating", label: "الأعلى تقييم" },
              { value: "newest", label: "الأحدث" },
            ].map((option) => (
              <Link
                key={option.value}
                href={buildFilterUrl({ sort: option.value })}
                className={`block px-4 py-2 text-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors ${
                  currentFilters.sort === option.value
                    ? "text-sky-500 font-medium"
                    : "text-slate-600 dark:text-slate-300"
                }`}
              >
                {option.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Advanced Filters Panel */}
      {showAdvanced && (
        <div className="card p-5 dark:bg-slate-800 space-y-5 animate-fade-in">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-800 dark:text-white">فلاتر متقدمة</h3>
            {hasFilters && (
              <button
                onClick={clearFilters}
                className="text-sm text-red-500 hover:text-red-600"
              >
                مسح الكل
              </button>
            )}
          </div>

          {/* Price Range */}
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
                onClick={handlePriceApply}
                className="px-4 py-2 bg-sky-500 text-white rounded-lg text-sm font-medium hover:bg-sky-600 transition-colors"
              >
                تطبيق
              </button>
            </div>
            {currentFilters.min && currentFilters.max && (
              <p className="text-sm text-slate-500 mt-2">
                السعر المحدد: {Number(currentFilters.min).toLocaleString()} -{" "}
                {Number(currentFilters.max).toLocaleString()} ر.ي
              </p>
            )}
          </div>

          {/* Availability Filter */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
              التوفر
            </label>
            <div className="flex gap-3">
              <Link
                href={buildFilterUrl({ inStock: undefined })}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  !currentFilters.inStock
                    ? "bg-sky-500 text-white"
                    : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
                }`}
              >
                الكل
              </Link>
              <Link
                href={buildFilterUrl({ inStock: "true" })}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  currentFilters.inStock === "true"
                    ? "bg-emerald-500 text-white"
                    : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
                }`}
              >
                متوفر
              </Link>
              <Link
                href={buildFilterUrl({ inStock: "false" })}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  currentFilters.inStock === "false"
                    ? "bg-red-500 text-white"
                    : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
                }`}
              >
                غير متوفر
              </Link>
            </div>
          </div>

          {/* Rating Filter */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
              الحد الأدنى للتقييم
            </label>
            <div className="flex gap-2 flex-wrap">
              {[4, 3, 2, 1].map((rating) => (
                <Link
                  key={rating}
                  href={buildFilterUrl({ minRating: String(rating) })}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    currentFilters.minRating === String(rating)
                      ? "bg-amber-500 text-white"
                      : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
                  }`}
                >
                  {rating}+ ★
                </Link>
              ))}
              <Link
                href={buildFilterUrl({ minRating: undefined })}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  !currentFilters.minRating
                    ? "bg-sky-500 text-white"
                    : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
                }`}
              >
                الكل
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Active Filters */}
      {hasFilters && (
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-sm text-slate-500">الفلاتر النشطة:</span>
          {currentFilters.category && (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300 rounded-full text-sm">
              {categories.find((c) => c.slug === currentFilters.category)?.icon}{" "}
              {categories.find((c) => c.slug === currentFilters.category)?.name}
              <button
                onClick={() => router.push(buildFilterUrl({ category: undefined }))}
                className="hover:text-sky-900"
              >
                <X size={14} />
              </button>
            </span>
          )}
          {currentFilters.min && (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-full text-sm">
              السعر: {Number(currentFilters.min).toLocaleString()}+
              <button
                onClick={() => router.push(buildFilterUrl({ min: undefined }))}
                className="hover:text-slate-900"
              >
                <X size={14} />
              </button>
            </span>
          )}
          {currentFilters.max && (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-full text-sm">
              حتى: {Number(currentFilters.max).toLocaleString()}
              <button
                onClick={() => router.push(buildFilterUrl({ max: undefined }))}
                className="hover:text-slate-900"
              >
                <X size={14} />
              </button>
            </span>
          )}
          {currentFilters.inStock === "true" && (
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
          {currentFilters.minRating && (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 rounded-full text-sm">
              {currentFilters.minRating}+ ★
              <button
                onClick={() => router.push(buildFilterUrl({ minRating: undefined }))}
                className="hover:text-amber-900"
              >
                <X size={14} />
              </button>
            </span>
          )}
        </div>
      )}

      {/* Results Count */}
      <p className="text-slate-500 dark:text-slate-400">
        تم العثور على <span className="font-bold text-slate-800 dark:text-white">{results.length}</span> منتج
      </p>
    </div>
  );
}