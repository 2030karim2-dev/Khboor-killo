"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { Search, ArrowRight, X } from "lucide-react";
import { SearchSuggestions, SearchResults } from "./SearchComponents";

export default function MobileSearchOverlay({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
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
            <button onClick={() => setQuery("")} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" aria-label="مسح">
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      <div className="overflow-y-auto h-[calc(100vh-56px)]">
        {query.length > 0 ? (
          <SearchResults query={query} onClose={onClose} />
        ) : (
          <SearchSuggestions onSelectQuery={setQuery} />
        )}
      </div>
    </div>
  );
}
