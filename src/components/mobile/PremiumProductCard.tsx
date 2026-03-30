"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Star, ShoppingCart, Heart, Eye, Zap } from "lucide-react";
import { Product, formatPrice } from "@/lib";
import { useCart } from "@/lib/CartContext";
import { useWishlist } from "@/lib/WishlistContext";
import { useToast } from "@/lib/ToastContext";

export default function PremiumProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { success, info } = useToast();
  const liked = isInWishlist(product.id);
  const [pressed, setPressed] = useState(false);

  return (
    <div
      className="group relative bg-white dark:bg-slate-800 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-700 animate-fade-in"
      style={{ animationDelay: `${index * 60}ms` }}
      onTouchStart={() => setPressed(true)}
      onTouchEnd={() => setPressed(false)}
    >
      {/* Image */}
      <Link href={`/product/${product.id}`} className="block relative overflow-hidden">
        <div className="aspect-square relative">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, 25vw"
            className={`object-cover transition-transform duration-700 ${pressed ? "scale-105" : "group-hover:scale-110"}`}
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Badges */}
          <div className="absolute top-2.5 right-2.5 flex flex-col gap-1.5">
            {product.discount && (
              <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-lg shadow-lg flex items-center gap-0.5">
                <Zap size={10} /> -{product.discount}%
              </span>
            )}
            {product.featured && (
              <span className="bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-lg shadow-lg">
                ⭐ مميز
              </span>
            )}
          </div>

          {/* Out of stock overlay */}
          {!product.inStock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center backdrop-blur-sm">
              <span className="bg-white dark:bg-slate-800 text-slate-800 dark:text-white font-bold px-4 py-1.5 rounded-full text-sm shadow-lg">
                نفد المخزون
              </span>
            </div>
          )}

          {/* Quick action buttons (appear on hover) */}
          <div className="absolute bottom-2 left-2 right-2 flex gap-1.5 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
            <button
              onClick={(e) => {
                e.preventDefault();
                addToCart(product);
                success("تمت الإضافة للسلة");
              }}
              disabled={!product.inStock}
              className="flex-1 py-2 bg-white/95 dark:bg-slate-800/95 backdrop-blur rounded-xl text-xs font-bold text-sky-600 flex items-center justify-center gap-1 hover:bg-sky-500 hover:text-white transition-colors disabled:opacity-50 disabled:hover:bg-white/95 disabled:hover:text-sky-600"
            >
              <ShoppingCart size={14} /> أضف للسلة
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                toggleWishlist(product);
                info(liked ? "تم الإزالة" : "تمت الإضافة");
              }}
              className={`w-10 rounded-xl backdrop-blur flex items-center justify-center transition-colors ${
                liked ? "bg-red-500 text-white" : "bg-white/95 dark:bg-slate-800/95 text-slate-600 hover:bg-red-50"
              }`}
            >
              <Heart size={16} className={liked ? "fill-white" : ""} />
            </button>
          </div>
        </div>
      </Link>

      {/* Content */}
      <div className="p-3">
        {/* Category + Rating */}
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[10px] text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-900/30 px-1.5 py-0.5 rounded-md font-medium">
            {product.category}
          </span>
          <div className="flex items-center gap-0.5">
            <Star size={11} className="fill-amber-400 text-amber-400" />
            <span className="text-[10px] text-slate-600 dark:text-slate-400 font-medium">{product.rating}</span>
            <span className="text-[10px] text-slate-400">({product.reviews})</span>
          </div>
        </div>

        {/* Name */}
        <Link href={`/product/${product.id}`}>
          <h3 className="text-[13px] font-bold text-slate-800 dark:text-white line-clamp-2 leading-snug mb-2 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors min-h-[2.5rem]">
            {product.name}
          </h3>
        </Link>

        {/* Price + Cart */}
        <div className="flex items-end justify-between">
          <div>
            <p className="text-[15px] font-extrabold text-slate-900 dark:text-white leading-none">
              {formatPrice(product.price)}
            </p>
            {product.originalPrice && (
              <div className="flex items-center gap-1.5 mt-0.5">
                <p className="text-[11px] text-slate-400 line-through">
                  {formatPrice(product.originalPrice)}
                </p>
                <span className="text-[10px] font-bold text-red-500 bg-red-50 dark:bg-red-900/30 px-1 py-0.5 rounded">
                  وفر {(product.originalPrice - product.price).toLocaleString()}
                </span>
              </div>
            )}
          </div>
          <button
            onClick={() => {
              addToCart(product);
              success("تمت الإضافة");
            }}
            disabled={!product.inStock}
            className="w-9 h-9 rounded-xl bg-sky-500 text-white flex items-center justify-center hover:bg-sky-600 active:scale-90 transition-all disabled:opacity-40 disabled:active:scale-100 shadow-md shadow-sky-500/20"
            aria-label={`إضافة ${product.name} للسلة`}
          >
            <ShoppingCart size={16} />
          </button>
        </div>
      </div>

      {/* Pressed ripple effect */}
      {pressed && (
        <div className="absolute inset-0 bg-sky-500/5 pointer-events-none animate-fade-in" />
      )}
    </div>
  );
}
