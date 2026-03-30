"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { SlidersHorizontal, Grid3X3, List } from "lucide-react";
import { SORT_OPTIONS } from "@/lib";

export default function CategoryToolbar({
  categorySlug,
  currentSort,
}: {
  categorySlug: string;
  currentSort?: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "newest") {
      params.delete("sort");
    } else {
      params.set("sort", value);
    }
    router.push(`/category/${categorySlug}?${params.toString()}`);
  };

  return (
    <div className="flex items-center justify-between mb-6 bg-white rounded-xl p-4 border border-slate-200">
      <div className="flex items-center gap-3">
        <button
          className="flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-200 hover:bg-sky-50 transition-colors text-sm"
          aria-label="فلترة المنتجات"
        >
          <SlidersHorizontal size={16} aria-hidden="true" />
          <span>فلترة</span>
        </button>
        <select
          aria-label="ترتيب المنتجات"
          value={currentSort || "newest"}
          onChange={(e) => handleSortChange(e.target.value)}
          className="px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-sky-500 bg-white"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>
      <div className="flex items-center gap-2">
        <button className="p-2 rounded-lg bg-sky-50 text-sky-600" aria-label="عرض شبكي" aria-pressed="true">
          <Grid3X3 size={18} aria-hidden="true" />
        </button>
        <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-400" aria-label="عرض قائمة" aria-pressed="false">
          <List size={18} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
