"use client";

import { use } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { searchProducts, categories } from "@/lib";
import { Breadcrumb, ProductGrid, EmptyState } from "@/components/ui";

export default function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const params = use(searchParams);
  const query = params.q || "";
  const results = query ? searchProducts(query) : [];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Breadcrumb
        items={[
          { label: "الرئيسية", href: "/" },
          { label: "نتائج البحث" },
        ]}
      />

      <form action="/search" className="mb-8">
        <div className="relative max-w-2xl">
          <input
            type="text"
            name="q"
            defaultValue={query}
            placeholder="ابحث عن منتجات..."
            className="w-full py-3.5 pr-14 pl-4 rounded-2xl border-2 border-slate-200 focus:border-sky-500 focus:outline-none transition-colors bg-white text-right text-lg"
          />
          <button
            type="submit"
            className="absolute left-3 top-1/2 -translate-y-1/2 bg-sky-500 text-white p-2 rounded-xl hover:bg-sky-600 transition-colors"
          >
            <Search size={20} />
          </button>
        </div>
      </form>

      {query ? (
        <>
          <h1 className="text-xl font-bold text-slate-800 mb-2">
            نتائج البحث عن: &ldquo;{query}&rdquo;
          </h1>
          <p className="text-slate-500 mb-6">تم العثور على {results.length} منتج</p>

          {results.length > 0 ? (
            <ProductGrid products={results} />
          ) : (
            <div className="text-center py-16">
              <EmptyState
                icon="🔍"
                title="لم نجد نتائج"
                description="جرب البحث بكلمات مختلفة أو تصفح الأقسام"
              />
              <div className="flex flex-wrap gap-2 justify-center mt-4">
                {categories.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/category/${cat.slug}`}
                    className="px-4 py-2 bg-sky-50 text-sky-700 rounded-xl text-sm font-medium hover:bg-sky-100 transition-colors"
                  >
                    {cat.icon} {cat.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-16">
          <Search size={48} className="text-slate-300 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-slate-800 mb-2">ابحث عن ما تحتاجه</h2>
          <p className="text-slate-500 mb-6">اكتب في مربع البحث أعلاه للعثور على المنتجات</p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 max-w-2xl mx-auto">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className="card p-4 text-center hover:border-sky-300"
              >
                <span className="text-3xl block mb-2">{cat.icon}</span>
                <span className="text-sm font-medium text-slate-700">{cat.name}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
