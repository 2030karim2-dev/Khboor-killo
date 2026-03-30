"use client";

import { useMemo } from "react";
import { categories, getFeaturedProducts } from "@/lib";
import CategoryCard from "@/components/CategoryCard";
import { SectionHeader, ProductGrid, TrustBar } from "@/components/ui";
import { HeroSection, PromoBanner, CategorySection } from "@/components/home";

export default function Home() {
  const featured = useMemo(() => getFeaturedProducts(), []);
  const categoryProducts = useMemo(
    () =>
      categories.map((cat) => ({
        category: cat,
        products: featured.filter((p) => p.categorySlug === cat.slug),
      })),
    [featured]
  );

  return (
    <div>
      <HeroSection />

      <section className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <TrustBar />
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-12">
        <SectionHeader
          title="تسوق حسب القسم"
          subtitle="اكتشف مجموعتنا الواسعة من المنتجات"
          viewAllHref="/search"
          viewAllLabel="عرض الكل"
        />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((cat, i) => (
            <div key={cat.slug} style={{ animationDelay: `${i * 100}ms` }}>
              <CategoryCard category={cat} />
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <SectionHeader
            title="منتجات مميزة"
            subtitle="أفضل العروض والمنتجات المختارة"
          />
          <ProductGrid products={featured} />
        </div>
      </section>

      <PromoBanner />

      {categoryProducts.map(({ category: cat, products }) => {
        if (products.length === 0) return null;
        return (
          <div key={cat.slug} className={cat.slug !== "accessories" ? "bg-white" : ""}>
            <CategorySection category={cat} products={products} />
          </div>
        );
      })}
    </div>
  );
}
