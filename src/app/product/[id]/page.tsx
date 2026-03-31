import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProductById, getProductsByCategory } from "@/lib";
import { Breadcrumb } from "@/components/ui";
import ProductJsonLd from "@/components/seo/JsonLd";
import ReviewList from "@/components/product/ReviewList";
import ReviewForm from "@/components/product/ReviewForm";
import ProductCard from "@/components/ProductCard";
import { ProductActionsDesktop, ProductActionsMobile } from "@/components/product/ProductActions";
import ProductViewTracker from "@/components/product/ProductViewTracker";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) return { title: "المنتج غير موجود" };

  return {
    title: `${product.name} - خبور`,
    description: product.description,
    openGraph: {
      title: `${product.name} | خبور`,
      description: product.description,
      images: [product.image],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) notFound();

  const related = getProductsByCategory(product.categorySlug)
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  return (
    <div>
      <ProductJsonLd product={product} />
      <ProductViewTracker product={product} />

      {/* Mobile View */}
      <ProductActionsMobile product={product} />

      {/* Desktop View */}
      <div className="hidden md:block max-w-7xl mx-auto px-4 py-8">
        <Breadcrumb
          items={[
            { label: "الرئيسية", href: "/" },
            { label: product.category, href: `/category/${product.categorySlug}` },
            { label: product.name },
          ]}
        />

        <ProductActionsDesktop product={product} />

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <ReviewForm productId={product.id} />
          <ReviewList productId={product.id} />
        </div>

        {related.length > 0 && (
          <section>
            <h2 className="text-xl font-extrabold text-slate-800 mb-6">منتجات مشابهة</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Mobile Related & Reviews */}
      <div className="md:hidden px-4 pb-32 space-y-6">
        <ReviewForm productId={product.id} />
        <ReviewList productId={product.id} />
        {related.length > 0 && (
          <section>
            <h2 className="text-lg font-extrabold text-slate-800 mb-4">منتجات مشابهة</h2>
            <div className="grid grid-cols-2 gap-2.5">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
