import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, SlidersHorizontal, Grid3X3, List } from "lucide-react";
import {
  getCategoryBySlug,
  getProductsByCategory,
  categories,
} from "@/lib/data";
import ProductCard from "@/components/ProductCard";

export function generateStaticParams() {
  return categories.map((cat) => ({ slug: cat.slug }));
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  const products = getProductsByCategory(slug);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6">
        <Link href="/" className="hover:text-sky-600 transition-colors">
          الرئيسية
        </Link>
        <ChevronLeft size={14} />
        <span className="text-slate-800 font-medium">{category.name}</span>
      </nav>

      {/* Header */}
      <div className="relative rounded-2xl overflow-hidden mb-8">
        <img
          src={category.image}
          alt={category.name}
          className="w-full h-48 md:h-64 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-black/70 to-black/30" />
        <div className="absolute inset-0 flex items-center justify-end p-8">
          <div className="text-white text-right">
            <div className="flex items-center gap-2 mb-2 justify-end">
              <span className="text-4xl">{category.icon}</span>
              <h1 className="text-3xl md:text-4xl font-extrabold">
                {category.name}
              </h1>
            </div>
            <p className="text-white/80 mb-2">{category.description}</p>
            <p className="text-white/60 text-sm">
              {products.length} منتج متاح
            </p>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between mb-6 bg-white rounded-xl p-4 border border-slate-200">
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-200 hover:bg-sky-50 transition-colors text-sm">
            <SlidersHorizontal size={16} />
            <span>فلترة</span>
          </button>
          <select className="px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-sky-500 bg-white">
            <option>الأحدث</option>
            <option>السعر: من الأقل للأعلى</option>
            <option>السعر: من الأعلى للأقل</option>
            <option>الأعلى تقييماً</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-lg bg-sky-50 text-sky-600">
            <Grid3X3 size={18} />
          </button>
          <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-400">
            <List size={18} />
          </button>
        </div>
      </div>

      {/* Products grid */}
      {products.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product, i) => (
            <div key={product.id} style={{ animationDelay: `${i * 50}ms` }}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-6xl mb-4">📦</p>
          <h3 className="text-xl font-bold text-slate-800 mb-2">
            لا توجد منتجات في هذا القسم
          </h3>
          <p className="text-slate-500 mb-4">
            تحقق من الأقسام الأخرى أو عد لاحقاً
          </p>
          <Link href="/" className="btn-primary">
            العودة للرئيسية
          </Link>
        </div>
      )}
    </div>
  );
}
