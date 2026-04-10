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

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
    success(`تمت إضافة "${product.name}" للسلة`);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleWishlist(product);
    info(liked ? "تم إزالة المنتج من المفضلة" : "تمت إضافة المنتج للمفضلة");
  };

  return (
    <Link 
      href={`/product/${product.id}`} 
      className="group block animate-fade-in"
      aria-label={`عرض تفاصيل ${product.name}`}
    >
      <div className="product-card">
        <div className="relative overflow-hidden aspect-[4/3]">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover"
          />
          
          {/* Overlay gradient on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
          
          {!product.inStock && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-10">
              <span className="bg-white/95 backdrop-blur-sm text-slate-800 font-bold px-4 py-1.5 rounded-full text-sm shadow-lg">
                نفد المخزون
              </span>
            </div>
          )}
          
          {/* Badges */}
          <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
            {product.discount && (
              <span className="bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-lg">
                -{product.discount}%
              </span>
            )}
            {product.featured && (
              <span className="bg-amber-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-lg">
                مميز
              </span>
            )}
          </div>
          
          {/* Wishlist button */}
          <button
            onClick={handleToggleWishlist}
            className="absolute top-3 left-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white hover:scale-110 transition-all duration-300 z-10 shadow-md"
            aria-label={liked ? "إزالة من المفضلة" : "إضافة للمفضلة"}
            aria-pressed={liked}
          >
            <Heart
              size={18}
              className={`transition-all duration-300 ${liked ? "fill-red-500 text-red-500 scale-110" : "text-slate-400 group-hover:text-red-400"}`}
            />
          </button>
          
          {/* Quick add button */}
          <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 z-10">
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className="w-full py-2.5 rounded-xl bg-white/95 backdrop-blur-sm text-slate-800 font-semibold text-sm shadow-lg hover:bg-sky-500 hover:text-white transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ShoppingCart size={16} />
              {product.inStock ? "أضف للسلة" : "غير متوفر"}
            </button>
          </div>
        </div>

        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-sky-600 bg-sky-50 dark:bg-sky-900/30 dark:text-sky-400 px-2.5 py-1 rounded-full font-semibold">
              {product.category}
            </span>
            <div className="flex items-center gap-1">
              <Star size={14} className="fill-amber-400 text-amber-400" aria-hidden="true" />
              <span className="text-sm text-slate-700 dark:text-slate-300 font-semibold">{product.rating}</span>
              <span className="text-xs text-slate-400">({product.reviews})</span>
            </div>
          </div>

          <h3 className="font-bold text-base text-slate-800 dark:text-white mb-1.5 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors line-clamp-2">
            {product.name}
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-3 line-clamp-2">{product.description}</p>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg font-bold text-slate-900 dark:text-white">{formatPrice(product.price)}</p>
              {product.originalPrice && (
                <p className="text-xs text-slate-400 line-through">
                  {formatPrice(product.originalPrice)}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
