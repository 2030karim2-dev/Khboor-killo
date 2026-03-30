"use client";

import { use } from "react";
import Image from "next/image";
import { ShoppingCart, Heart } from "lucide-react";
import { getProductById, getProductsByCategory, formatPrice } from "@/lib";
import { useCart } from "@/lib/CartContext";
import { useWishlist } from "@/lib/WishlistContext";
import { useToast } from "@/lib/ToastContext";
import ProductCard from "@/components/ProductCard";
import ShareButton from "@/components/product/ShareButton";
import ReviewList from "@/components/product/ReviewList";
import ReviewForm from "@/components/product/ReviewForm";
import { Breadcrumb, QuantityStepper, StarRating, TrustBar } from "@/components/ui";
import { MobileProductSticky, MobileProductCard } from "@/components/mobile";
import { useState } from "react";
import { notFound } from "next/navigation";

export default function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const product = getProductById(id);
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { success } = useToast();
  const [quantity, setQuantity] = useState(1);

  if (!product) notFound();
  const liked = isInWishlist(product.id);

  const related = getProductsByCategory(product.categorySlug)
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) addToCart(product);
    success(`تمت إضافة ${quantity} من "${product.name}" للسلة`);
  };

  return (
    <div>
      {/* Mobile Version */}
      <div className="md:hidden">
        <MobileProductSticky product={product} />

        <div className="px-4 pb-32">
          <div className="space-y-6 mb-8">
            <ReviewForm productId={product.id} />
            <ReviewList productId={product.id} />
          </div>

          {related.length > 0 && (
            <section aria-labelledby="related-heading-mobile">
              <h2 id="related-heading-mobile" className="text-lg font-extrabold text-slate-800 mb-4">منتجات مشابهة</h2>
              <div className="space-y-2.5">
                {related.map((p) => (
                  <MobileProductCard key={p.id} product={p} />
                ))}
              </div>
            </section>
          )}
        </div>
      </div>

      {/* Desktop Version */}
      <div className="hidden md:block max-w-7xl mx-auto px-4 py-8">
        <Breadcrumb
          items={[
            { label: "الرئيسية", href: "/" },
            { label: product.category, href: `/category/${product.categorySlug}` },
            { label: product.name },
          ]}
        />

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="card overflow-hidden">
          <div className="relative aspect-square">
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              priority
            />
            {!product.inStock && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
                <span className="bg-white text-slate-800 font-bold px-4 py-2 rounded-lg text-lg">
                  نفد المخزون
                </span>
              </div>
            )}
            {product.discount && (
              <span className="absolute top-4 right-4 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-lg z-10">
                خصم {product.discount}%
              </span>
            )}
          </div>
        </div>

        <div className="animate-slide-up">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-sm text-sky-600 bg-sky-50 px-3 py-1 rounded-full font-medium">
              {product.category}
            </span>
            {product.featured && (
              <span className="text-sm text-amber-600 bg-amber-50 px-3 py-1 rounded-full font-medium">
                مميز
              </span>
            )}
            {product.inStock ? (
              <span className="text-sm text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full font-medium">
                متوفر
              </span>
            ) : (
              <span className="text-sm text-red-600 bg-red-50 px-3 py-1 rounded-full font-medium">
                نفد المخزون
              </span>
            )}
          </div>

          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-800 mb-3">
            {product.name}
          </h1>

          <StarRating
            rating={product.rating}
            reviews={product.reviews}
            size={16}
          />

          <div className="bg-slate-50 rounded-xl p-4 my-4">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-extrabold text-slate-900">
                {product.price.toLocaleString("ar-SA")} ر.س
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-lg text-slate-400 line-through">
                    {product.originalPrice.toLocaleString("ar-SA")} ر.س
                  </span>
                  <span className="text-sm font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded-full">
                    وفر {(product.originalPrice - product.price).toLocaleString("ar-SA")} ر.س
                  </span>
                </>
              )}
            </div>
          </div>

          <p className="text-slate-600 leading-relaxed mb-6">{product.description}</p>

          <div className="flex items-center gap-4 mb-6">
            <span className="font-medium text-slate-700">الكمية:</span>
            <QuantityStepper value={quantity} onChange={setQuantity} />
          </div>

          <div className="flex gap-3 mb-8">
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className="flex-1 btn-primary py-3 text-base justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label={`إضافة ${product.name} للسلة`}
            >
              <ShoppingCart size={20} aria-hidden="true" />
              {product.inStock ? "أضف للسلة" : "غير متوفر"}
            </button>
            <button
              onClick={() => {
                toggleWishlist(product);
                success(liked ? "تم إزالة المنتج من المفضلة" : "تمت إضافة المنتج للمفضلة");
              }}
              className={`p-3 rounded-xl border-2 transition-colors ${
                liked
                  ? "border-red-500 bg-red-50 text-red-500"
                  : "border-slate-200 hover:border-red-300"
              }`}
              aria-label={liked ? "إزالة من المفضلة" : "إضافة للمفضلة"}
              aria-pressed={liked}
            >
              <Heart size={20} className={liked ? "fill-red-500" : ""} aria-hidden="true" />
            </button>
            <ShareButton title={product.name} text={product.description} />
          </div>

          <TrustBar compact />
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 mb-12">
        <ReviewForm productId={product.id} />
        <ReviewList productId={product.id} />
      </div>

      {related.length > 0 && (
        <section aria-labelledby="related-heading">
          <h2 id="related-heading" className="text-xl font-extrabold text-slate-800 mb-6">
            منتجات مشابهة
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
