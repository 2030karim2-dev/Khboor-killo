"use client";

import { useState, useEffect, useRef } from "react";
import { useSearch, getPopularSearches } from "@/hooks/useSearch";
import SearchInput from "./SearchInput";
import SearchSuggestions from "./SearchSuggestions";

export default function SearchBar({ className = "" }: { className?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const {
    query,
    setQuery,
    results,
    suggestions,
    handleSearch,
    getSearchHistory,
    removeHistoryItem,
    clearHistory,
  } = useSearch();
  
  const containerRef = useRef<HTMLDivElement>(null);
  const history = getSearchHistory();
  const popularSearches = getPopularSearches();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectResult = (id: string) => {
    const product = results.find(p => p.id === id);
    if (product) {
      handleSearch(product.name);
    }
  };

  const handleSelectSuggestion = (href: string) => {
    setIsOpen(false);
    window.location.href = href;
  };

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <SearchInput
        value={query}
        onChange={setQuery}
        onSubmit={() => handleSearch(query)}
        onFocus={() => setIsOpen(true)}
        isOpen={isOpen}
      />

      {isOpen && (
        <SearchSuggestions
          query={query}
          results={results.map(p => ({
            id: p.id,
            name: p.name,
            image: p.image,
            price: p.price,
            href: `/product/${p.id}`,
          }))}
          suggestions={suggestions}
          history={history}
          popularSearches={popularSearches}
          onSelectResult={handleSelectResult}
          onRemoveHistory={removeHistoryItem}
          onClearHistory={clearHistory}
          onSelectSuggestion={handleSelectSuggestion}
        />
      )}
    </div>
  );
}