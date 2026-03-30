"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { categories, getFeaturedProducts } from "@/lib";
import CategoryCard from "@/components/CategoryCard";
import ProductCard from "@/components/ProductCard";
import { SectionHeader, ProductGrid, TrustBar } from "@/components/ui";
import { HeroSection, PromoBanner, CategorySection } from "@/components/home";

export default function Home() {
  const featured = getFeaturedProducts();

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
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-extrabold text-slate-800">
                منتجات مميزة
              </h2>
              <p className="text-slate-500 mt-1">أفضل العروض والمنتجات المختارة</p>
            </div>
            <div className="flex gap-2">
              <button className="w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center hover:bg-sky-50 hover:border-sky-300 transition-colors">
                <ChevronRight size={20} className="text-slate-600" />
              </button>
              <button className="w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center hover:bg-sky-50 hover:border-sky-300 transition-colors">
                <ChevronLeft size={20} className="text-slate-600" />
              </button>
            </div>
          </div>
          <ProductGrid products={featured} />
        </div>
      </section>

      <PromoBanner />

      {categories.map((cat) => {
        const catProducts = featured.filter((p) => p.categorySlug === cat.slug);
        if (catProducts.length === 0) return null;
        return (
          <div key={cat.slug} className={cat.slug === "accessories" ? "" : "bg-white"}>
            <CategorySection category={cat} products={catProducts} />
          </div>
        );
      })}
    </div>
  );
}
