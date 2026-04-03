import Link from "next/link";
import type { Metadata } from "next";
import { Search } from "lucide-react";
import { searchProducts, categories, SORT_OPTIONS } from "@/lib";
import { Breadcrumb, ProductGrid, EmptyState } from "@/components/ui";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string; sort?: string; min?: string; max?: string }>;
}) {
  const params = await searchParams;
  const query = params.q || "";
  let results = query ? searchProducts(query) : [];

  if (params.category) {
    results = results.filter((p) => p.categorySlug === params.category);
  }

  const minPrice = params.min ? Number(params.min) : undefined;
  const maxPrice = params.max ? Number(params.max) : undefined;
  if (minPrice !== undefined) results = results.filter((p) => p.price >= minPrice);
  if (maxPrice !== undefined) results = results.filter((p) => p.price <= maxPrice);

  if (params.sort === "price-asc") results = [...results].sort((a, b) => a.price - b.price);
  else if (params.sort === "price-desc") results = [...results].sort((a, b) => b.price - a.price);
  else if (params.sort === "rating") results = [...results].sort((a, b) => b.rating - a.rating);

  const buildFilterUrl = (key: string, value: string) => {
    const sp = new URLSearchParams();
    if (query) sp.set("q", query);
    if (params.category && key !== "category") sp.set("category", params.category);
    if (params.sort && key !== "sort") sp.set("sort", params.sort);
    if (params.min && key !== "min") sp.set("min", params.min);
    if (params.max && key !== "max") sp.set("max", params.max);
    if (value) sp.set(key, value);
    return `/search?${sp.toString()}`;
  };

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
          <label htmlFor="search-input" className="sr-only">ابحث عن منتجات</label>
          <input
            id="search-input"
            type="text"
            name="q"
            defaultValue={query}
            placeholder="ابحث عن منتجات..."
            className="w-full py-3.5 pe-14 ps-4 rounded-2xl border-2 border-slate-200 focus:border-sky-500 focus:outline-none transition-colors bg-white text-right text-lg"
          />
          <button
            type="submit"
            className="absolute start-3 top-1/2 -translate-y-1/2 bg-sky-500 text-white p-2 rounded-xl hover:bg-sky-600 transition-colors"
            aria-label="بحث"
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

          {/* Filters */}
          {results.length > 0 && (
            <div className="flex flex-wrap gap-3 mb-6">
              {/* Category Filter */}
              <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
                <Link
                  href={buildFilterUrl("category", "")}
                  className={`shrink-0 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    !params.category
                      ? "bg-sky-500 text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  الكل
                </Link>
                {categories.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={buildFilterUrl("category", cat.slug)}
                    className={`shrink-0 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                      params.category === cat.slug
                        ? "bg-sky-500 text-white"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {cat.icon} {cat.name}
                  </Link>
                ))}
              </div>

              {/* Sort */}
              <select
                defaultValue={params.sort || ""}
                onChange={(e) => {
                  window.location.href = buildFilterUrl("sort", e.target.value);
                }}
                className="px-3 py-1.5 rounded-xl border border-slate-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                aria-label="ترتيب النتائج"
              >
                <option value="">الترتيب الافتراضي</option>
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
          )}

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
          <Search size={48} className="text-slate-300 mx-auto mb-4" aria-hidden="true" />
          <h2 className="text-xl font-bold text-slate-800 mb-2">ابحث عن ما تحتاجه</h2>
          <p className="text-slate-500 mb-6">اكتب في مربع البحث أعلاه للعثور على المنتجات</p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 max-w-2xl mx-auto">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className="card p-4 text-center hover:border-sky-300"
              >
                <span className="text-3xl block mb-2" aria-hidden="true">{cat.icon}</span>
                <span className="text-sm font-medium text-slate-700">{cat.name}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
