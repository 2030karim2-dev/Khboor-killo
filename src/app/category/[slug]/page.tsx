import { notFound } from "next/navigation";
import Image from "next/image";
import { SlidersHorizontal, Grid3X3, List } from "lucide-react";
import {
  getCategoryBySlug,
  getProductsByCategory,
  categories,
  SORT_OPTIONS,
} from "@/lib";
import { Breadcrumb, EmptyState, ProductGrid } from "@/components/ui";

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
      <Breadcrumb
        items={[
          { label: "الرئيسية", href: "/" },
          { label: category.name },
        ]}
      />

      <div className="relative rounded-2xl overflow-hidden mb-8">
        <Image
          src={category.image}
          alt={category.name}
          width={1200}
          height={400}
          className="w-full h-48 md:h-64 object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-l from-black/70 to-black/30" />
        <div className="absolute inset-0 flex items-center justify-end p-8">
          <div className="text-white text-right">
            <div className="flex items-center gap-2 mb-2 justify-end">
              <span className="text-4xl" aria-hidden="true">{category.icon}</span>
              <h1 className="text-3xl md:text-4xl font-extrabold">{category.name}</h1>
            </div>
            <p className="text-white/80 mb-2">{category.description}</p>
            <p className="text-white/60 text-sm">{products.length} منتج متاح</p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mb-6 bg-white rounded-xl p-4 border border-slate-200">
        <div className="flex items-center gap-3">
          <button
            className="flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-200 hover:bg-sky-50 transition-colors text-sm"
            aria-label="فلترة المنتجات"
          >
            <SlidersHorizontal size={16} aria-hidden="true" />
            <span>فلترة</span>
          </button>
          <select
            aria-label="ترتيب المنتجات"
            className="px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-sky-500 bg-white"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-lg bg-sky-50 text-sky-600" aria-label="عرض شبكي">
            <Grid3X3 size={18} aria-hidden="true" />
          </button>
          <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-400" aria-label="عرض قائمة">
            <List size={18} aria-hidden="true" />
          </button>
        </div>
      </div>

      {products.length > 0 ? (
        <ProductGrid products={products} />
      ) : (
        <EmptyState
          icon="📦"
          title="لا توجد منتجات في هذا القسم"
          description="تحقق من الأقسام الأخرى أو عد لاحقاً"
          actionLabel="العودة للرئيسية"
          actionHref="/"
        />
      )}
    </div>
  );
}
