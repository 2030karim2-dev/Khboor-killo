"use client";

import { useState } from "react";
import { SubCategory, Product } from "@/lib/types";
import { ProductGrid } from "@/components/ui";

interface Props {
  subcategories: SubCategory[];
  products: Product[];
}

export default function SubcategoryFilter({ subcategories, products }: Props) {
  const [activeSub, setActiveSub] = useState<string | null>(null);

  const filteredProducts = activeSub
    ? products.filter((p) =>
        p.name.toLowerCase().includes(activeSub.toLowerCase()) ||
        p.description.toLowerCase().includes(activeSub.toLowerCase())
      )
    : products;

  return (
    <>
      {subcategories.length > 0 && (
        <div className="flex gap-2 overflow-x-auto scrollbar-hide -mx-4 px-4 pb-4 mb-4">
          <button
            onClick={() => setActiveSub(null)}
            className={`shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-sm transition-colors ${
              activeSub === null
                ? "bg-sky-500 text-white border-sky-500"
                : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-sky-400 hover:bg-sky-50 dark:hover:bg-sky-900/20"
            }`}
          >
            <span className={`font-medium ${activeSub === null ? "text-white" : "text-slate-700 dark:text-slate-300"}`}>الكل</span>
            <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${activeSub === null ? "bg-white/20 text-white" : "bg-slate-100 dark:bg-slate-700 text-slate-400"}`}>{products.length}</span>
          </button>
          {subcategories.map((sub) => (
            <button
              key={sub.slug}
              onClick={() => setActiveSub(sub.name)}
              className={`shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-sm transition-colors ${
                activeSub === sub.name
                  ? "bg-sky-500 text-white border-sky-500"
                  : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-sky-400 hover:bg-sky-50 dark:hover:bg-sky-900/20"
              }`}
            >
              <span className="text-base">{sub.icon}</span>
              <span className={`font-medium ${activeSub === sub.name ? "text-white" : "text-slate-700 dark:text-slate-300"}`}>{sub.name}</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${activeSub === sub.name ? "bg-white/20 text-white" : "bg-slate-100 dark:bg-slate-700 text-slate-400"}`}>{sub.productCount}</span>
            </button>
          ))}
        </div>
      )}

      {filteredProducts.length > 0 ? (
        <ProductGrid products={filteredProducts} />
      ) : (
        <div className="text-center py-16">
          <p className="text-slate-500">لا توجد منتجات في هذه الفئة الفرعية</p>
        </div>
      )}
    </>
  );
}
