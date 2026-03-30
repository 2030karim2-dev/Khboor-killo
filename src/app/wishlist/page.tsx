"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import { useCart } from "@/lib/CartContext";
import { useWishlist } from "@/lib/WishlistContext";
import { useToast } from "@/lib/ToastContext";
import { formatPrice } from "@/lib";
import { Breadcrumb, EmptyState } from "@/components/ui";

export default function WishlistPage() {
  const { products, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { success } = useToast();

  const moveToCart = (product: typeof products[0]) => {
    addToCart(product);
    removeFromWishlist(product.id);
    success(`تم نقل "${product.name}" إلى السلة`);
  };

  if (products.length === 0) {
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
          المفضلة ({products.length} منتجات)
        </h1>
        <button onClick={clearWishlist} className="text-sm text-red-500 hover:text-red-600 font-medium">
          إفراغ القائمة
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
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
                onClick={() => {
                  removeFromWishlist(product.id);
                  success("تم إزالة المنتج من المفضلة");
                }}
                className="absolute top-3 left-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur flex items-center justify-center hover:bg-red-50 transition-colors z-10"
                aria-label={`إزالة ${product.name} من المفضلة`}
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
              <p className="text-lg font-bold text-slate-900 mb-3">{formatPrice(product.price)}</p>
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
