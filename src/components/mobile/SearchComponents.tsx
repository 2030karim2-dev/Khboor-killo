"use client";

import Link from "next/link";
import Image from "next/image";
import { Clock, TrendingUp } from "lucide-react";
import { searchProducts } from "@/utils/helpers";
import { categories } from "@/data/categories";
import { useFormatPrice } from "@/hooks/useFormatPrice";

const recentSearches = ["سيارات تويوتا", "ثوب رجالي", "حديد تسليح"];
const trendingSearches = ["كامري 2024", "ساعة ذكية", "بلاط سيراميك", "فستان سهرة"];

interface SearchSuggestionsProps {
  onSelectQuery: (q: string) => void;
}

export function SearchSuggestions({ onSelectQuery }: SearchSuggestionsProps) {
  return (
    <div className="p-4 space-y-6">
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-slate-700">عمليات البحث الأخيرة</h3>
          <button className="text-xs text-sky-600">مسح الكل</button>
        </div>
        <div className="space-y-2">
          {recentSearches.map((s) => (
            <button key={s} onClick={() => onSelectQuery(s)} className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 text-right">
              <Clock size={16} className="text-slate-400 shrink-0" />
              <span className="text-sm text-slate-600">{s}</span>
            </button>
          ))}
        </div>
      </div>
      <div>
        <h3 className="text-sm font-bold text-slate-700 mb-3">الأكثر بحثاً</h3>
        <div className="flex flex-wrap gap-2">
          {trendingSearches.map((s) => (
            <button key={s} onClick={() => onSelectQuery(s)} className="px-3 py-2 rounded-full bg-sky-50 text-sky-700 text-sm flex items-center gap-1">
              <TrendingUp size={14} /> {s}
            </button>
          ))}
        </div>
      </div>
      <div>
        <h3 className="text-sm font-bold text-slate-700 mb-3">تصفح الأقسام</h3>
        <div className="grid grid-cols-3 gap-2">
          {categories.map((cat) => (
            <Link key={cat.slug} href={`/category/${cat.slug}`} className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-slate-50 active:bg-slate-100 transition-colors">
              <span className="text-2xl">{cat.icon}</span>
              <span className="text-xs font-medium text-slate-600">{cat.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

interface SearchResultsProps {
  query: string;
  onClose: () => void;
}

export function SearchResults({ query, onClose }: SearchResultsProps) {
  const results = searchProducts(query);
  const { format: formatCurrency } = useFormatPrice();

  if (results.length > 0) {
    return (
      <div className="p-4 space-y-3">
        {results.map((product) => (
          <Link key={product.id} href={`/product/${product.id}`} onClick={onClose} className="flex gap-3 p-3 rounded-xl hover:bg-slate-50 active:bg-slate-100 transition-colors">
            <div className="w-16 h-16 relative rounded-xl overflow-hidden shrink-0">
              <Image src={product.image} alt={product.name} fill sizes="64px" className="object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-medium text-slate-800 line-clamp-1">{product.name}</h3>
              <p className="text-xs text-slate-500">{product.category}</p>
              <p className="text-sm font-bold text-slate-900 mt-0.5">{formatCurrency(product.price)}</p>
            </div>
          </Link>
        ))}
      </div>
    );
  }

  return (
    <div className="p-8 text-center">
      <p className="text-4xl mb-3">🔍</p>
      <p className="text-slate-500">لا توجد نتائج لـ &ldquo;{query}&rdquo;</p>
    </div>
  );
}
