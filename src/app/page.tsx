"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Truck,
  Shield,
  HeadphonesIcon,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { categories, getFeaturedProducts } from "@/lib/data";
import ProductCard from "@/components/ProductCard";
import CategoryCard from "@/components/CategoryCard";

export default function Home() {
  const featured = getFeaturedProducts();

  return (
    <div>
      {/* Hero Section */}
      <section className="gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-72 h-72 bg-sky-400 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-orange-400 rounded-full blur-3xl animate-float" />
        </div>
        <div className="max-w-7xl mx-auto px-4 py-16 md:py-24 relative z-10">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="text-center md:text-right animate-slide-up">
              <span className="inline-block bg-sky-500/20 text-sky-300 px-4 py-1 rounded-full text-sm mb-4 font-medium">
                منصة موثوقة +10 آلاف مستخدم
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4">
                كل ما تحتاجه
                <br />
                <span className="text-gradient bg-gradient-to-r from-sky-400 to-orange-400 bg-clip-text text-transparent">
                  في مكان واحد
                </span>
              </h1>
              <p className="text-slate-300 text-lg mb-8 max-w-lg mx-auto md:mx-0">
                خبور يوفر لك تجربة تسوق فريدة مع آلاف المنتجات من سيارات وقطع
                غيار وملابس ومواد بناء وإكسسوارات.
              </p>
              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                <Link
                  href="/category/cars"
                  className="btn-secondary text-base px-6 py-3"
                >
                  تصفح المنتجات
                  <ArrowLeft size={18} />
                </Link>
                <Link
                  href="/sell"
                  className="btn-outline border-white/30 text-white hover:bg-white hover:text-slate-900 text-base px-6 py-3"
                >
                  ابدأ البيع الآن
                </Link>
              </div>
            </div>
            <div className="hidden md:grid grid-cols-2 gap-3 animate-slide-in-right">
              <div className="space-y-3">
                <div className="rounded-2xl overflow-hidden aspect-square">
                  <img
                    src="https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=400&h=400&fit=crop"
                    alt="سيارات"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden aspect-[4/3]">
                  <img
                    src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop"
                    alt="ملابس"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
              <div className="space-y-3 pt-6">
                <div className="rounded-2xl overflow-hidden aspect-[4/3]">
                  <img
                    src="https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400&h=300&fit=crop"
                    alt="قطع غيار"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden aspect-square">
                  <img
                    src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop"
                    alt="إكسسوارات"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features bar */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-3 justify-center md:justify-start">
              <div className="w-12 h-12 rounded-xl bg-sky-50 flex items-center justify-center shrink-0">
                <Truck size={22} className="text-sky-600" />
              </div>
              <div>
                <p className="font-bold text-sm text-slate-800">شحن سريع</p>
                <p className="text-xs text-slate-500">لجميع المدن</p>
              </div>
            </div>
            <div className="flex items-center gap-3 justify-center md:justify-start">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
                <Shield size={22} className="text-emerald-600" />
              </div>
              <div>
                <p className="font-bold text-sm text-slate-800">ضمان الجودة</p>
                <p className="text-xs text-slate-500">منتجات أصلية</p>
              </div>
            </div>
            <div className="flex items-center gap-3 justify-center md:justify-start">
              <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center shrink-0">
                <HeadphonesIcon size={22} className="text-orange-600" />
              </div>
              <div>
                <p className="font-bold text-sm text-slate-800">دعم 24/7</p>
                <p className="text-xs text-slate-500">فريق متخصص</p>
              </div>
            </div>
            <div className="flex items-center gap-3 justify-center md:justify-start">
              <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center shrink-0">
                <RotateCcw size={22} className="text-purple-600" />
              </div>
              <div>
                <p className="font-bold text-sm text-slate-800">إرجاع سهل</p>
                <p className="text-xs text-slate-500">خلال 14 يوم</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-800">
              تسوق حسب القسم
            </h2>
            <p className="text-slate-500 mt-1">
              اكتشف مجموعتنا الواسعة من المنتجات
            </p>
          </div>
          <Link
            href="/search"
            className="flex items-center gap-1 text-sky-600 hover:text-sky-700 font-medium text-sm transition-colors"
          >
            عرض الكل
            <ChevronLeft size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((cat, i) => (
            <div key={cat.slug} style={{ animationDelay: `${i * 100}ms` }}>
              <CategoryCard category={cat} />
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
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
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {featured.map((product, i) => (
              <div key={product.id} style={{ animationDelay: `${i * 100}ms` }}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Promo Banner */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="gradient-primary rounded-2xl p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-48 h-48 bg-white/10 rounded-full translate-x-1/3 translate-y-1/3" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-2">
                عروض حصرية بانتظارك!
              </h2>
              <p className="text-sky-100">
                احصل على خصم يصل إلى 50% على آلاف المنتجات
              </p>
            </div>
            <Link
              href="/search"
              className="px-8 py-3 bg-white text-sky-600 font-bold rounded-xl hover:bg-sky-50 transition-colors whitespace-nowrap text-lg"
            >
              تصفح العروض
            </Link>
          </div>
        </div>
      </section>

      {/* All Products by Category */}
      {categories.map((cat) => {
        const catProducts = featured.filter(
          (p) => p.categorySlug === cat.slug
        );
        if (catProducts.length === 0) return null;
        return (
          <section key={cat.slug} className={cat.slug === "accessories" ? "" : "bg-white"}>
            <div className="max-w-7xl mx-auto px-4 py-12">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{cat.icon}</span>
                  <div>
                    <h2 className="text-xl font-extrabold text-slate-800">
                      {cat.name}
                    </h2>
                    <p className="text-slate-500 text-sm">
                      {cat.description}
                    </p>
                  </div>
                </div>
                <Link
                  href={`/category/${cat.slug}`}
                  className="flex items-center gap-1 text-sky-600 hover:text-sky-700 font-medium text-sm transition-colors"
                >
                  عرض المزيد
                  <ChevronLeft size={16} />
                </Link>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {catProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
