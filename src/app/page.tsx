import Link from "next/link";
import { categories } from "@/data/categories";
import { getFeaturedProducts } from "@/utils/helpers";
import CategoryCard from "@/components/CategoryCard";
import { SectionHeader, ProductGrid, TrustBar } from "@/components/ui";
import { HeroSection, PromoBanner, CategorySection } from "@/components/home";
import { MobileHeroSlider, MobileCategoryChips } from "@/components/mobile";
import ProductCard from "@/components/ProductCard";
import RecentlyViewed from "@/components/product/RecentlyViewed";

export default function Home() {
  const featured = getFeaturedProducts();
  const categoryProducts = categories.map((cat) => ({
    category: cat,
    products: featured.filter((p) => p.categorySlug === cat.slug),
  }));

  return (
    <div>
      {/* Mobile Hero */}
      <div className="md:hidden px-2 pt-2 pb-1">
        <MobileHeroSlider />
      </div>

      {/* Desktop Hero */}
      <div className="hidden md:block">
        <HeroSection />
      </div>

      {/* Mobile Category Chips */}
      <div className="md:hidden px-2 py-2">
        <MobileCategoryChips />
      </div>

      {/* Desktop Trust Bar */}
      <section className="hidden md:block bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <TrustBar />
        </div>
      </section>

      {/* Desktop Categories Grid */}
      <section className="hidden md:block max-w-7xl mx-auto px-4 py-8">
        <SectionHeader
          title="تسوق حسب القسم"
          subtitle="اكتشف مجموعتنا الواسعة من المنتجات"
          viewAllHref="/search"
          viewAllLabel="عرض الكل"
        />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {categories.map((cat, i) => (
            <div key={cat.slug} style={{ animationDelay: `${i * 100}ms` }}>
              <CategoryCard category={cat} />
            </div>
          ))}
        </div>
      </section>

      {/* Mobile Featured Products */}
      <section className="md:hidden px-2 py-3">
        <div className="flex items-center justify-between mb-2 px-1">
          <h2 className="text-sm font-extrabold text-slate-800">منتجات مميزة</h2>
          <Link href="/search" className="text-[10px] text-sky-600 font-medium">عرض الكل</Link>
        </div>
        <div className="grid grid-cols-3 gap-1.5">
          {featured.slice(0, 6).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Desktop Featured Products */}
      <section className="hidden md:block bg-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <SectionHeader
            title="منتجات مميزة"
            subtitle="أفضل العروض والمنتجات المختارة"
          />
          <ProductGrid products={featured} />
        </div>
      </section>

      {/* Mobile Promo */}
      <div className="md:hidden px-2 py-3">
        <div className="gradient-primary rounded-2xl p-5 text-center">
          <h3 className="text-white text-lg font-extrabold mb-1">عروض حصرية!</h3>
          <p className="text-sky-100 text-xs mb-3">خصم يصل إلى 50%</p>
          <Link href="/search" className="inline-block px-5 py-2 bg-white text-sky-600 font-bold rounded-xl text-sm">
            تصفح العروض
          </Link>
        </div>
      </div>

      {/* Desktop Promo */}
      <div className="hidden md:block">
        <PromoBanner />
      </div>

      {/* Desktop Category Sections */}
      <div className="hidden md:block">
        {categoryProducts.map(({ category: cat, products }) => {
          if (products.length === 0) return null;
          return (
            <div key={cat.slug} className={cat.slug !== "accessories" ? "bg-white" : ""}>
              <CategorySection category={cat} products={products} />
            </div>
          );
        })}
      </div>

      {/* Mobile Category Sections */}
      {categoryProducts.map(({ category: cat, products }) => {
        if (products.length === 0) return null;
        return (
          <section key={cat.slug} className="md:hidden px-2 py-3">
            <div className="flex items-center justify-between mb-2 px-1">
              <h2 className="text-sm font-extrabold text-slate-800 flex items-center gap-1.5">
                <span aria-hidden="true">{cat.icon}</span> {cat.name}
              </h2>
              <Link href={`/category/${cat.slug}`} className="text-[10px] text-sky-600 font-medium">عرض الكل</Link>
            </div>
            <div className="grid grid-cols-3 gap-1.5">
              {products.slice(0, 3).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        );
      })}

      {/* Recently Viewed Products */}
      <RecentlyViewed />
    </div>
  );
}
