import { Search } from "lucide-react";

export default function SearchBar({ className = "" }: { className?: string }) {
  return (
    <form action="/search" className={`relative ${className}`} role="search">
      <label htmlFor="search-input" className="sr-only">ابحث عن منتجات</label>
      <input
        id="search-input"
        type="search"
        name="q"
        placeholder="ابحث عن منتجات..."
        className="w-full py-2.5 pr-12 pl-4 rounded-xl border-2 border-slate-200 focus:border-sky-500 focus:outline-none transition-colors bg-white text-right"
      />
      <button
        type="submit"
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-sky-500 text-white p-1.5 rounded-lg hover:bg-sky-600 transition-colors"
        aria-label="بحث"
      >
        <Search size={18} aria-hidden="true" />
      </button>
    </form>
  );
}
