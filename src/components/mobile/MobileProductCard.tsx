"use client";

import Link from "next/link";
import Image from "next/image";
import { Star, ShoppingCart, Heart } from "lucide-react";
import { Product, formatPrice } from "@/lib";
import { useCart } from "@/lib/CartContext";
import { useWishlist } from "@/lib/WishlistContext";
import { useToast } from "@/lib/ToastContext";

export default function MobileProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { success, info } = useToast();
  const liked = isInWishlist(product.id);

  return (
    <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden animate-fade-in active:scale-[0.98] transition-transform">
      <Link href={`/product/${product.id}`} className="flex gap-3 p-3">
        {/* Image */}
        <div className="w-24 h-24 relative rounded-xl overflow-hidden shrink-0">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="96px"
            className="object-cover"
          />
          {product.discount && (
            <span className="absolute top-1 right-1 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-md">
              -{product.discount}%
            </span>
          )}
          {!product.inStock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="text-white text-[10px] font-bold">نفد</span>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-800 line-clamp-2 leading-tight mb-1">
              {product.name}
            </h3>
            <div className="flex items-center gap-1 mb-1">
              <Star size={12} className="fill-amber-400 text-amber-400" />
              <span className="text-[11px] text-slate-500">{product.rating}</span>
            </div>
          </div>
          <div>
            <p className="text-base font-extrabold text-slate-900">
              {formatPrice(product.price)}
            </p>
            {product.originalPrice && (
              <p className="text-[11px] text-slate-400 line-through">
                {formatPrice(product.originalPrice)}
              </p>
            )}
          </div>
        </div>
      </Link>

      {/* Actions */}
      <div className="flex items-center border-t border-slate-100">
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product);
            info(liked ? "تم الإزالة" : "تمت الإضافة للمفضلة");
          }}
          className="flex-1 py-2.5 flex items-center justify-center gap-1.5 text-xs text-slate-500 active:bg-slate-50 transition-colors"
        >
          <Heart size={15} className={liked ? "fill-red-500 text-red-500" : ""} />
          <span>مفضلة</span>
        </button>
        <div className="w-px h-6 bg-slate-100" />
        <button
          onClick={(e) => {
            e.preventDefault();
            addToCart(product);
            success("تمت الإضافة للسلة");
          }}
          disabled={!product.inStock}
          className="flex-1 py-2.5 flex items-center justify-center gap-1.5 text-xs text-sky-600 font-medium active:bg-sky-50 transition-colors disabled:opacity-40"
        >
          <ShoppingCart size={15} />
          <span>أضف للسلة</span>
        </button>
      </div>
    </div>
  );
}
