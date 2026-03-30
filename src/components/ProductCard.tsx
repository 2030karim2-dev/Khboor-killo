"use client";

import Link from "next/link";
import { Star, ShoppingCart, Heart } from "lucide-react";
import { Product, formatPrice } from "@/lib/data";
import { useCart } from "@/lib/CartContext";
import { useState } from "react";

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [liked, setLiked] = useState(false);

  return (
    <div className="card group animate-fade-in">
      {/* Image */}
      <div className="relative overflow-hidden aspect-[4/3]">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {product.discount && (
          <span className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-lg">
            -{product.discount}%
          </span>
        )}
        {product.featured && (
          <span className="absolute top-3 left-3 bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded-lg">
            مميز
          </span>
        )}
        <button
          onClick={() => setLiked(!liked)}
          className="absolute bottom-3 left-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur flex items-center justify-center hover:bg-red-50 transition-colors"
        >
          <Heart
            size={18}
            className={liked ? "fill-red-500 text-red-500" : "text-slate-400"}
          />
        </button>
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-sky-600 bg-sky-50 px-2 py-0.5 rounded-full font-medium">
            {product.category}
          </span>
          <div className="flex items-center gap-1">
            <Star size={14} className="fill-amber-400 text-amber-400" />
            <span className="text-xs text-slate-600 font-medium">
              {product.rating}
            </span>
            <span className="text-xs text-slate-400">
              ({product.reviews})
            </span>
          </div>
        </div>

        <Link href={`/product/${product.id}`}>
          <h3 className="font-bold text-slate-800 mb-1 hover:text-sky-600 transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm text-slate-500 mb-3 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-lg font-bold text-slate-900">
              {formatPrice(product.price)}
            </p>
            {product.originalPrice && (
              <p className="text-sm text-slate-400 line-through">
                {formatPrice(product.originalPrice)}
              </p>
            )}
          </div>
          <button
            onClick={() => addToCart(product)}
            className="p-2.5 rounded-xl bg-sky-500 text-white hover:bg-sky-600 transition-colors hover:scale-105 active:scale-95"
          >
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
