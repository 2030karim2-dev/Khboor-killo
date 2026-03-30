"use client";

import Link from "next/link";
import Image from "next/image";
import { Star, ShoppingCart, Heart } from "lucide-react";
import { Product, formatPrice } from "@/lib";
import { useCart } from "@/lib/CartContext";
import { useWishlist } from "@/lib/WishlistContext";
import { useToast } from "@/lib/ToastContext";

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { success, info } = useToast();
  const liked = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product);
    success(`تمت إضافة "${product.name}" للسلة`);
  };

  const handleToggleWishlist = () => {
    toggleWishlist(product);
    info(liked ? "تم إزالة المنتج من المفضلة" : "تمت إضافة المنتج للمفضلة");
  };

  return (
    <div className="card group animate-fade-in">
      <div className="relative overflow-hidden aspect-[4/3]">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
            <span className="bg-white text-slate-800 font-bold px-3 py-1 rounded-lg text-sm">
              نفد المخزون
            </span>
          </div>
        )}
        {product.discount && (
          <span className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-lg z-10">
            -{product.discount}%
          </span>
        )}
        {product.featured && (
          <span className="absolute top-3 left-3 bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded-lg z-10">
            مميز
          </span>
        )}
        <button
          onClick={handleToggleWishlist}
          className="absolute bottom-2 left-2 w-7 h-7 rounded-full bg-white/90 backdrop-blur flex items-center justify-center hover:bg-red-50 transition-colors z-10"
          aria-label={liked ? "إزالة من المفضلة" : "إضافة للمفضلة"}
          aria-pressed={liked}
        >
          <Heart
            size={14}
            className={liked ? "fill-red-500 text-red-500" : "text-slate-400"}
          />
        </button>
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-[5]" />
      </div>

      <div className="p-3">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[10px] text-sky-600 bg-sky-50 px-1.5 py-0.5 rounded-full font-medium">
            {product.category}
          </span>
          <div className="flex items-center gap-0.5">
            <Star size={12} className="fill-amber-400 text-amber-400" aria-hidden="true" />
            <span className="text-[10px] text-slate-600 font-medium">{product.rating}</span>
            <span className="text-[10px] text-slate-400">({product.reviews})</span>
          </div>
        </div>

        <Link href={`/product/${product.id}`} aria-label={`عرض تفاصيل ${product.name}`}>
          <h3 className="font-bold text-sm text-slate-800 mb-0.5 hover:text-sky-600 transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>
        <p className="text-xs text-slate-500 mb-2 line-clamp-1">{product.description}</p>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-base font-bold text-slate-900">{formatPrice(product.price)}</p>
            {product.originalPrice && (
              <p className="text-[10px] text-slate-400 line-through">
                {formatPrice(product.originalPrice)}
              </p>
            )}
          </div>
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className="p-2 rounded-lg bg-sky-500 text-white hover:bg-sky-600 transition-colors hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            aria-label={`إضافة ${product.name} للسلة`}
          >
            <ShoppingCart size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
