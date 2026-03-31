"use client";

import { useRecentlyViewed } from "@/lib/RecentlyViewedContext";
import ProductCard from "@/components/ProductCard";
import { SectionHeader } from "@/components/ui";

export default function RecentlyViewed() {
  const { products } = useRecentlyViewed();

  if (products.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <SectionHeader
        title="شاهدتها مؤخراً"
        subtitle="المنتجات التي تصفحتها"
      />
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {products.slice(0, 5).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
