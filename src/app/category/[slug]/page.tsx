import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import {
  getCategoryBySlug,
  getProductsByCategory,
  categories,
} from "@/lib";
import { Breadcrumb, EmptyState, ProductGrid } from "@/components/ui";
import CategoryToolbar from "@/components/category/CategoryToolbar";

export function generateStaticParams() {
  return categories.map((cat) => ({ slug: cat.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return { title: "القسم غير موجود" };

  return {
    title: `${category.name} - تسوّق الآن`,
    description: category.description,
    openGraph: {
      title: `${category.name} | خبور`,
      description: category.description,
      images: [category.image],
    },
  };
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ sort?: string; min?: string; max?: string }>;
}) {
  const { slug } = await params;
  const sp = await searchParams;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  let products = getProductsByCategory(slug);

  const minPrice = sp.min ? Number(sp.min) : undefined;
  const maxPrice = sp.max ? Number(sp.max) : undefined;
  if (minPrice !== undefined) products = products.filter((p) => p.price >= minPrice);
  if (maxPrice !== undefined) products = products.filter((p) => p.price <= maxPrice);

  if (sp.sort === "price-asc") products = [...products].sort((a, b) => a.price - b.price);
  else if (sp.sort === "price-desc") products = [...products].sort((a, b) => b.price - a.price);
  else if (sp.sort === "rating") products = [...products].sort((a, b) => b.rating - a.rating);

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

      <CategoryToolbar categorySlug={slug} currentSort={sp.sort} />

      {/* Subcategories */}
      {category.subcategories.length > 0 && (
        <div className="flex gap-2 overflow-x-auto scrollbar-hide -mx-4 px-4 pb-4 mb-4">
          {category.subcategories.map((sub) => (
            <button
              key={sub.slug}
              className="shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm hover:border-sky-400 hover:bg-sky-50 dark:hover:bg-sky-900/20 transition-colors"
            >
              <span className="text-base">{sub.icon}</span>
              <span className="font-medium text-slate-700 dark:text-slate-300">{sub.name}</span>
              <span className="text-[10px] text-slate-400 bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 rounded-full">{sub.productCount}</span>
            </button>
          ))}
        </div>
      )}

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
