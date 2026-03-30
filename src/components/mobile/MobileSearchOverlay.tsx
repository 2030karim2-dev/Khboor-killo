"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { Search, ArrowRight, Clock, X, TrendingUp } from "lucide-react";
import { searchProducts, categories } from "@/lib";
import Link from "next/link";
import Image from "next/image";
import { formatPrice } from "@/lib";

const recentSearches = ["سيارات تويوتا", "ثوب رجالي", "حديد تسليح"];
const trendingSearches = ["كامري 2024", "ساعة ذكية", "بلاط سيراميك", "فستان سهرة"];

export default function MobileSearchOverlay({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const results = useMemo(
    () => query.length > 0 ? searchProducts(query) : [],
    [query]
  );
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] md:hidden bg-white animate-slide-up">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-100">
        <button onClick={onClose} className="p-1" aria-label="رجوع">
          <ArrowRight size={22} className="text-slate-600" />
        </button>
        <div className="flex-1 relative">
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ابحث عن منتجات..."
            className="w-full py-2.5 pr-10 pl-3 rounded-xl bg-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 text-right"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              aria-label="مسح"
            >
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="overflow-y-auto h-[calc(100vh-56px)]">
        {query.length > 0 ? (
          results.length > 0 ? (
            <div className="p-4 space-y-3">
              {results.map((product) => (
                <Link
                  key={product.id}
                  href={`/product/${product.id}`}
                  onClick={onClose}
                  className="flex gap-3 p-3 rounded-xl hover:bg-slate-50 active:bg-slate-100 transition-colors"
                >
                  <div className="w-16 h-16 relative rounded-xl overflow-hidden shrink-0">
                    <Image src={product.image} alt={product.name} fill sizes="64px" className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-slate-800 line-clamp-1">{product.name}</h3>
                    <p className="text-xs text-slate-500">{product.category}</p>
                    <p className="text-sm font-bold text-slate-900 mt-0.5">{formatPrice(product.price)}</p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center">
              <p className="text-4xl mb-3">🔍</p>
              <p className="text-slate-500">لا توجد نتائج لـ &ldquo;{query}&rdquo;</p>
            </div>
          )
        ) : (
          <div className="p-4 space-y-6">
            {/* Recent searches */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold text-slate-700">عمليات البحث الأخيرة</h3>
                <button className="text-xs text-sky-600">مسح الكل</button>
              </div>
              <div className="space-y-2">
                {recentSearches.map((s) => (
                  <button
                    key={s}
                    onClick={() => setQuery(s)}
                    className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 text-right"
                  >
                    <Clock size={16} className="text-slate-400 shrink-0" />
                    <span className="text-sm text-slate-600">{s}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Trending */}
            <div>
              <h3 className="text-sm font-bold text-slate-700 mb-3">الأكثر بحثاً</h3>
              <div className="flex flex-wrap gap-2">
                {trendingSearches.map((s) => (
                  <button
                    key={s}
                    onClick={() => setQuery(s)}
                    className="px-3 py-2 rounded-full bg-sky-50 text-sky-700 text-sm flex items-center gap-1"
                  >
                    <TrendingUp size={14} />
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Categories */}
            <div>
              <h3 className="text-sm font-bold text-slate-700 mb-3">تصفح الأقسام</h3>
              <div className="grid grid-cols-3 gap-2">
                {categories.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/category/${cat.slug}`}
                    onClick={onClose}
                    className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-slate-50 active:bg-slate-100 transition-colors"
                  >
                    <span className="text-2xl">{cat.icon}</span>
                    <span className="text-xs font-medium text-slate-600">{cat.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
