"use client";

import Link from "next/link";
import Image from "next/image";
import { Star, ShoppingCart, Heart } from "lucide-react";
import { Product } from "@/lib";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { useToast } from "@/contexts/ToastContext";
import { useFormatPrice } from "@/hooks/useFormatPrice";

export default function MobileProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { success, info } = useToast();
  const { format: formatCurrency } = useFormatPrice();
  const liked = isInWishlist(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
    success("تمت إضافة المنتج للسلة");
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleWishlist(product);
    info(liked ? "تمت إزالة من المفضلة" : "تمت إضافة للمفضلة");
  };

  return (
    <Link 
      href={`/product/${product.id}`} 
      className="block bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 overflow-hidden hover:shadow-lg transition-all active:scale-[0.99]"
    >
      <div className="flex gap-3 p-3">
        {/* Image */}
        <div className="w-24 h-24 relative rounded-xl overflow-hidden shrink-0 bg-slate-100">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="96px"
            className="object-cover"
          />
          {/* Badges */}
          <div className="absolute top-1 right-1 flex flex-col gap-1">
            {product.discount && (
              <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-md shadow">
                -{product.discount}%
              </span>
            )}
            {product.featured && (
              <span className="bg-amber-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-md shadow">
                مميز
              </span>
            )}
          </div>
          {!product.inStock && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <span className="bg-white/90 text-slate-800 text-[10px] font-bold px-2 py-1 rounded-full">
               نفد المخزون
              </span>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
          <div>
            <h3 className="text-sm font-bold text-slate-800 dark:text-white line-clamp-2 leading-tight mb-1.5">
              {product.name}
            </h3>
            <div className="flex items-center gap-1 mb-1">
              <Star size={12} className="fill-amber-400 text-amber-400" />
              <span className="text-xs text-slate-600 dark:text-slate-400 font-medium">{product.rating}</span>
              <span className="text-[10px] text-slate-400">({product.reviews})</span>
            </div>
          </div>
          <div>
            <p className="text-base font-extrabold text-slate-900 dark:text-white">
              {formatCurrency(product.price)}
            </p>
            {product.originalPrice && (
              <p className="text-xs text-slate-400 line-through">
                {formatCurrency(product.originalPrice)}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center border-t border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
        <button
          onClick={handleToggleWishlist}
          className="flex-1 py-2.5 flex items-center justify-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 hover:text-red-500 active:bg-slate-100 dark:active:bg-slate-700 transition-colors"
        >
          <Heart size={16} className={liked ? "fill-red-500 text-red-500" : ""} />
          <span>مفضلة</span>
        </button>
        <div className="w-px h-6 bg-slate-200 dark:bg-slate-600" />
        <button
          onClick={handleAddToCart}
          disabled={!product.inStock}
          className="flex-1 py-2.5 flex items-center justify-center gap-1.5 text-xs text-sky-600 dark:text-sky-400 font-semibold active:bg-sky-100 dark:active:bg-sky-900/30 transition-colors disabled:opacity-40"
        >
          <ShoppingCart size={16} />
          <span>أضف للسلة</span>
        </button>
      </div>
    </Link>
  );
}