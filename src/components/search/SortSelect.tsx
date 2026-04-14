"use client";

import { useRouter } from "next/navigation";
import { SORT_OPTIONS } from "@/utils/constants";

interface SortSelectProps {
  currentSort: string;
  buildFilterUrl: (key: string, value: string) => string;
}

export default function SortSelect({ currentSort, buildFilterUrl }: SortSelectProps) {
  const router = useRouter();

  return (
    <select
      defaultValue={currentSort}
      onChange={(e) => {
        router.push(buildFilterUrl("sort", e.target.value));
      }}
      className="px-3 py-1.5 rounded-xl border border-slate-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
      aria-label="ترتيب النتائج"
    >
      <option value="">الترتيب الافتراضي</option>
      {SORT_OPTIONS.map((opt) => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
  );
}
