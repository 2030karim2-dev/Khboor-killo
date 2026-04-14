"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Star, ShoppingCart, Heart } from "lucide-react";
import { Product } from "@/lib";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { useToast } from "@/contexts/ToastContext";
import { useFormatPrice } from "@/hooks/useFormatPrice";

export default function PremiumProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { success, info } = useToast();
  const { format: formatCurrency } = useFormatPrice();
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

          {/* Discount badge - top right */}
          {product.discount && (
            <span className="absolute top-1.5 right-1.5 bg-red-500 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-md shadow-sm">
              -{product.discount}%
            </span>
          )}

          {/* Featured badge - top left */}
          {product.featured && (
            <span className="absolute top-1.5 left-1.5 bg-amber-500 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-md shadow-sm">
              مميز
            </span>
          )}

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
      <div className="p-2">
        {/* Rating only */}
        <div className="flex items-center gap-0.5 mb-1">
          <Star size={10} className="fill-amber-400 text-amber-400" />
          <span className="text-[9px] text-slate-500 font-medium">{product.rating}</span>
        </div>

        {/* Name */}
        <Link href={`/product/${product.id}`}>
          <h3 className="text-[11px] font-bold text-slate-800 dark:text-white line-clamp-2 leading-tight mb-1.5 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors min-h-[2.2rem]">
            {product.name}
          </h3>
        </Link>

        {/* Price + Cart */}
        <div className="flex items-end justify-between">
          <div>
            <p className="text-[13px] font-extrabold text-slate-900 dark:text-white leading-none">
              {formatCurrency(product.price)}
            </p>
            {product.originalPrice && (
              <p className="text-[9px] text-slate-400 line-through mt-0.5">
                {formatCurrency(product.originalPrice)}
              </p>
            )}
          </div>
          <button
            onClick={() => {
              addToCart(product);
              success("تمت الإضافة");
            }}
            disabled={!product.inStock}
            className="w-7 h-7 rounded-lg bg-sky-500 text-white flex items-center justify-center hover:bg-sky-600 active:scale-90 transition-all disabled:opacity-40 shadow-md shadow-sky-500/20"
            aria-label={`إضافة ${product.name} للسلة`}
          >
            <ShoppingCart size={13} />
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
