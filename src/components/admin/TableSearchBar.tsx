"use client";

import { Search } from "lucide-react";

interface TableSearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function TableSearchBar({ value, onChange, placeholder = "بحث..." }: TableSearchBarProps) {
  return (
    <div className="p-3 border-b border-slate-200 dark:border-slate-700">
      <div className="relative max-w-xs">
        <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full py-2 pr-9 pl-3 rounded-lg border border-slate-200 dark:border-slate-600 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 bg-transparent"
        />
      </div>
    </div>
  );
}