"use client";

import { use } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Star,
  ShoppingCart,
  Heart,
  Share2,
} from "lucide-react";
import { getProductById, getProductsByCategory, formatPrice } from "@/lib";
import { useCart } from "@/lib/CartContext";
import ProductCard from "@/components/ProductCard";
import { Breadcrumb, QuantityStepper, TrustBar } from "@/components/ui";
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
  const [quantity, setQuantity] = useState(1);
  const [liked, setLiked] = useState(false);

  if (!product) notFound();

  const related = getProductsByCategory(product.categorySlug)
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
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
            {product.discount && (
              <span className="absolute top-4 right-4 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-lg">
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
          </div>

          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-800 mb-3">
            {product.name}
          </h1>

          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className={
                    i < Math.floor(product.rating)
                      ? "fill-amber-400 text-amber-400"
                      : "fill-slate-200 text-slate-200"
                  }
                />
              ))}
            </div>
            <span className="font-bold text-slate-700">{product.rating}</span>
            <span className="text-slate-400">({product.reviews} تقييم)</span>
          </div>

          <div className="bg-slate-50 rounded-xl p-4 mb-6">
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
              onClick={() => {
                for (let i = 0; i < quantity; i++) addToCart(product);
              }}
              className="flex-1 btn-primary py-3 text-base justify-center"
            >
              <ShoppingCart size={20} />
              أضف للسلة
            </button>
            <button
              onClick={() => setLiked(!liked)}
              className={`p-3 rounded-xl border-2 transition-colors ${
                liked
                  ? "border-red-500 bg-red-50 text-red-500"
                  : "border-slate-200 hover:border-red-300"
              }`}
            >
              <Heart size={20} className={liked ? "fill-red-500" : ""} />
            </button>
            <button className="p-3 rounded-xl border-2 border-slate-200 hover:border-sky-300 transition-colors">
              <Share2 size={20} />
            </button>
          </div>

          <TrustBar compact />
        </div>
      </div>

      {related.length > 0 && (
        <section>
          <h2 className="text-xl font-extrabold text-slate-800 mb-6">
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
  );
}
