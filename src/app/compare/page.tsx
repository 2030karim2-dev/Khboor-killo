"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { X, ShoppingCart, Heart, ArrowRight, Scale } from "lucide-react";
import { useCompare } from "@/contexts/CompareContext";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { useToast } from "@/contexts/ToastContext";
import { useFormatPrice } from "@/hooks/useFormatPrice";
import { Product } from "@/types/product";

export default function ComparePage() {
  const { items, removeItem, clearAll } = useCompare();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { success, info } = useToast();
  const { format: formatCurrency } = useFormatPrice();
  const [addedToCart, setAddedToCart] = useState<string[]>([]);

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    setAddedToCart((prev) => [...prev, product.id]);
    success(`تمت إضافة "${product.name}" للسلة`);
    setTimeout(() => {
      setAddedToCart((prev) => prev.filter((id) => id !== product.id));
    }, 2000);
  };

  const handleToggleWishlist = (product: Product) => {
    toggleWishlist(product);
    info(isInWishlist(product.id) ? "تمت إزالة المنتج من المفضلة" : "تمت إضافة المنتج للمفضلة");
  };

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <Scale size={64} className="text-slate-300 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">
          لم تقم بإضافة منتجات للمقارنة
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mb-8">
          أضف منتجات للمقارنة من صفحات المنتجات
        </p>
        <Link href="/search" className="btn-primary inline-flex items-center gap-2">
          تصفح المنتجات
          <ArrowRight size={18} />
        </Link>
      </div>
    );
  }

  const specs = [
    { label: "السعر", key: "price", render: (p: Product) => formatCurrency(p.price) },
    { label: "السعر الأصلي", key: "originalPrice", render: (p: Product) => p.originalPrice ? formatCurrency(p.originalPrice) : "-" },
    { label: "الخصم", key: "discount", render: (p: Product) => p.discount ? `${p.discount}%` : "-" },
    { label: "التقييم", key: "rating", render: (p: Product) => `${p.rating} / 5` },
    { label: "عدد التقييمات", key: "reviews", render: (p: Product) => p.reviews },
    { label: "التصنيف", key: "category", render: (p: Product) => p.category },
    { label: "الحالة", key: "inStock", render: (p: Product) => p.inStock ? "متوفر" : "نفد المخزون" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
          <Scale size={28} className="text-sky-500" />
          مقارنة المنتجات ({items.length})
        </h1>
        <button
          onClick={clearAll}
          className="text-sm text-red-500 hover:text-red-600 font-medium"
        >
          مسح الكل
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px]">
          <thead>
            <tr>
              <th className="p-4 text-right text-slate-500 dark:text-slate-400 font-medium w-32"></th>
              {items.map((product) => (
                <th key={product.id} className="p-4 w-64">
                  <div className="relative card p-0 overflow-hidden">
                    <button
                      onClick={() => removeItem(product.id)}
                      className="absolute top-2 left-2 z-10 w-8 h-8 rounded-full bg-white/90 dark:bg-slate-800/90 flex items-center justify-center shadow-md hover:bg-red-50 hover:text-red-500 transition-colors"
                      aria-label="إزالة من المقارنة"
                    >
                      <X size={16} />
                    </button>
                    <Link href={`/product/${product.id}`}>
                      <div className="relative aspect-square">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          sizes="256px"
                          className="object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-slate-800 dark:text-white line-clamp-2 mb-2">
                          {product.name}
                        </h3>
                      </div>
                    </Link>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {specs.map((spec) => (
              <tr key={spec.key} className="border-t border-slate-100 dark:border-slate-700">
                <td className="p-4 font-medium text-slate-600 dark:text-slate-300">
                  {spec.label}
                </td>
                {items.map((product) => (
                  <td key={product.id} className="p-4 text-center">
                    <span className="text-slate-800 dark:text-white font-medium">
                      {spec.render(product)}
                    </span>
                  </td>
                ))}
              </tr>
            ))}
            <tr className="border-t border-slate-100 dark:border-slate-700">
              <td className="p-4 font-medium text-slate-600 dark:text-slate-300">
                الإجراءات
              </td>
              {items.map((product) => (
                <td key={product.id} className="p-4">
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => handleAddToCart(product)}
                      disabled={!product.inStock || addedToCart.includes(product.id)}
                      className="w-full py-2 px-4 bg-sky-500 text-white rounded-lg font-medium hover:bg-sky-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      <ShoppingCart size={16} />
                      {addedToCart.includes(product.id) ? "تمت الإضافة" : product.inStock ? "أضف للسلة" : "غير متوفر"}
                    </button>
                    <button
                      onClick={() => handleToggleWishlist(product)}
                      className="w-full py-2 px-4 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-lg font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center justify-center gap-2"
                    >
                      <Heart
                        size={16}
                        className={isInWishlist(product.id) ? "fill-red-500 text-red-500" : ""}
                      />
                      {isInWishlist(product.id) ? "في المفضلة" : "إضافة للمفضلة"}
                    </button>
                  </div>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      {items.length > 0 && items.length < 2 && (
        <div className="mt-8 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl text-amber-800 dark:text-amber-200 text-center">
          أضف منتج آخر للمقارنة (حد أقصى 4 منتجات)
        </div>
      )}
    </div>
  );
}