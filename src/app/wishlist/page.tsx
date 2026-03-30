"use client";

import { useState } from "react";
import Link from "next/link";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import { useCart } from "@/lib/CartContext";
import { useToast } from "@/lib/ToastContext";
import { Product, formatPrice, products } from "@/lib";
import { Breadcrumb, EmptyState } from "@/components/ui";
import Image from "next/image";

const WISHLIST_KEY = "khuboor_wishlist";

function loadWishlist(): Product[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(WISHLIST_KEY);
  if (stored) {
    try {
      const ids: string[] = JSON.parse(stored);
      return ids.map((id) => products.find((p) => p.id === id)).filter(Boolean) as Product[];
    } catch {
      localStorage.removeItem(WISHLIST_KEY);
    }
  }
  return [];
}

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState<Product[]>(loadWishlist);
  const { addToCart } = useCart();
  const { success, warning } = useToast();

  const removeItem = (id: string) => {
    setWishlist((prev) => {
      const updated = prev.filter((p) => p.id !== id);
      localStorage.setItem(WISHLIST_KEY, JSON.stringify(updated.map((p) => p.id)));
      return updated;
    });
    warning("تم إزالة المنتج من المفضلة");
  };

  const moveToCart = (product: Product) => {
    addToCart(product);
    removeItem(product.id);
    success(`تم نقل "${product.name}" إلى السلة`);
  };

  if (wishlist.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16">
        <Breadcrumb items={[{ label: "الرئيسية", href: "/" }, { label: "المفضلة" }]} />
        <EmptyState
          icon={<Heart size={48} className="text-slate-300 mx-auto" />}
          title="قائمة المفضلة فارغة"
          description="أضف منتجات للمفضلة بالضغط على أيكونة القلب"
          actionLabel="تصفح المنتجات"
          actionHref="/"
        />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Breadcrumb items={[{ label: "الرئيسية", href: "/" }, { label: "المفضلة" }]} />

      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-extrabold text-slate-800">
          المفضلة ({wishlist.length} منتجات)
        </h1>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {wishlist.map((product) => (
          <div key={product.id} className="card group animate-fade-in">
            <div className="relative overflow-hidden aspect-[4/3]">
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover"
              />
              <button
                onClick={() => removeItem(product.id)}
                className="absolute top-3 left-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur flex items-center justify-center hover:bg-red-50 transition-colors z-10"
                aria-label="إزالة من المفضلة"
              >
                <Trash2 size={16} className="text-red-500" />
              </button>
            </div>
            <div className="p-4">
              <Link href={`/product/${product.id}`}>
                <h3 className="font-bold text-slate-800 mb-1 hover:text-sky-600 transition-colors line-clamp-1">
                  {product.name}
                </h3>
              </Link>
              <p className="text-lg font-bold text-slate-900 mb-3">
                {formatPrice(product.price)}
              </p>
              <button
                onClick={() => moveToCart(product)}
                disabled={!product.inStock}
                className="btn-primary w-full justify-center py-2 text-sm disabled:opacity-50"
              >
                <ShoppingCart size={16} />
                نقل للسلة
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
