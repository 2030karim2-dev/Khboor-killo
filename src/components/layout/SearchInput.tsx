"use client";

import { Search } from "lucide-react";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  onFocus: () => void;
  isOpen: boolean;
}

export default function SearchInput({ value, onChange, onSubmit, onFocus, isOpen }: SearchInputProps) {
  return (
    <form
      action="/search"
      role="search"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <label htmlFor="search-input" className="sr-only">ابحث عن منتجات</label>
      <input
        id="search-input"
        type="search"
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
        }}
        onFocus={onFocus}
        placeholder="ابحث عن منتجات..."
        className="w-full py-2.5 pr-12 pl-4 rounded-xl border-2 border-slate-200 focus:border-sky-500 focus:outline-none transition-colors bg-white dark:bg-slate-800 dark:border-slate-700 dark:focus:border-sky-400 text-right"
        autoComplete="off"
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-controls="search-suggestions"
      />
      <button
        type="submit"
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-sky-500 to-sky-600 text-white p-1.5 rounded-lg hover:from-sky-600 hover:to-sky-700 transition-all shadow-md"
        aria-label="بحث"
      >
        <Search size={18} aria-hidden="true" />
      </button>
    </form>
  );
}