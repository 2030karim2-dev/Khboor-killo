"use client";

import { use } from "react";
import Link from "next/link";
import { ChevronLeft, Search } from "lucide-react";
import { searchProducts, categories } from "@/lib/data";
import ProductCard from "@/components/ProductCard";

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
      <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6">
        <Link href="/" className="hover:text-sky-600 transition-colors">
          الرئيسية
        </Link>
        <ChevronLeft size={14} />
        <span className="text-slate-800 font-medium">نتائج البحث</span>
      </nav>

      {/* Search form */}
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
          <p className="text-slate-500 mb-6">
            تم العثور على {results.length} منتج
          </p>

          {results.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {results.map((product, i) => (
                <div key={product.id} style={{ animationDelay: `${i * 50}ms` }}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-6xl mb-4">🔍</p>
              <h3 className="text-xl font-bold text-slate-800 mb-2">
                لم نجد نتائج
              </h3>
              <p className="text-slate-500 mb-6">
                جرب البحث بكلمات مختلفة أو تصفح الأقسام
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
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
          <h2 className="text-xl font-bold text-slate-800 mb-2">
            ابحث عن ما تحتاجه
          </h2>
          <p className="text-slate-500 mb-6">
            اكتب في مربع البحث أعلاه للعثور على المنتجات
          </p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 max-w-2xl mx-auto">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className="card p-4 text-center hover:border-sky-300"
              >
                <span className="text-3xl block mb-2">{cat.icon}</span>
                <span className="text-sm font-medium text-slate-700">
                  {cat.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
