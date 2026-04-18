"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Package, ShoppingCart, ArrowRight, Percent } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/contexts/ToastContext";
import type { Product } from "@/types/product";

interface BundleProduct {
  id: string;
  name: string;
  image: string;
  originalPrice: number;
}

interface BundleDeal {
  id: string;
  name: string;
  description: string;
  products: BundleProduct[];
  bundlePrice: number;
  discountPercent: number;
}

const bundleDeals: BundleDeal[] = [
  {
    id: "bundle-1",
    name: "باقة تغيير الزيت الكاملة",
    description: "كل ما تحتاجه لصيانة محركك",
    products: [
      { id: "p1", name: "فلتر الزيت", image: "https://images.unsplash.com/photo-1566144697402-45329b311b6b?w=200&h=200&fit=crop", originalPrice: 150 },
      { id: "p2", name: "فلتر الهواء", image: "https://images.unsplash.com/photo-1566144697402-45329b311b6b?w=200&h=200&fit=crop", originalPrice: 120 },
      { id: "p3", name: "فلتر البنزين", image: "https://images.unsplash.com/photo-1566144697402-45329b311b6b?w=200&h=200&fit=crop", originalPrice: 180 },
    ],
    bundlePrice: 380,
    discountPercent: 20,
  },
  {
    id: "bundle-2",
    name: "باقة إطاراتVier Jahreszeiten",
    description: "إطارات لكل المواسم",
    products: [
      { id: "p4", name: "إطارات Michelin صيفية", image: "https://images.unsplash.com/photo-1569391572574-0f8d2cbe5d72?w=200&h=200&fit=crop", originalPrice: 1200 },
      { id: "p5", name: "إطارات Michelin شتوية", image: "https://images.unsplash.com/photo-1569391572574-0f8d2cbe5d72?w=200&h=200&fit=crop", originalPrice: 1400 },
    ],
    bundlePrice: 2200,
    discountPercent: 15,
  },
  {
    id: "bundle-3",
    name: "باقة أدوات السلامة",
    description: "معدات السلامة الأساسية",
    products: [
      { id: "p6", name: "حقيبة إسعافات أولية", image: "https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=200&h=200&fit=crop", originalPrice: 250 },
      { id: "p7", name: "مثلث تحذير", image: "https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=200&h=200&fit=crop", originalPrice: 80 },
      { id: "p8", name: "طفاية حريق", image: "https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=200&h=200&fit=crop", originalPrice: 350 },
    ],
    bundlePrice: 550,
    discountPercent: 25,
  },
];

export default function BundleDeals() {
  const { addToCart, items } = useCart();
  const { addToast } = useToast();

  const originalTotal = useMemo(() => 
    bundleDeals.reduce((sum, b) => sum + b.products.reduce((s, p) => s + p.originalPrice, 0), 0),
    []
  );
  const bundleTotal = useMemo(() => 
    bundleDeals.reduce((sum, b) => sum + b.bundlePrice, 0),
    []
  );
  const totalSavings = originalTotal - bundleTotal;

  const isInBundle = (productId: string) => items.some((item) => item.product.id === productId);

  const handleAddBundle = (bundle: BundleDeal) => {
    bundle.products.forEach((product) => {
      if (!isInBundle(product.id)) {
        addToCart(product as unknown as Product);
      }
    });
    addToast("success", `تمت إضافة ${bundle.name} للسلة`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
            <Package size={20} className="text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-800 dark:text-white">عروضBundles</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">وفّر أكثر عند الشراء معاً</p>
          </div>
        </div>
        {totalSavings > 0 && (
          <div className="flex items-center gap-2 px-4 py-2 bg-green-50 dark:bg-green-900/20 rounded-full">
            <Percent size={16} className="text-green-500" />
            <span className="text-sm font-bold text-green-600 dark:text-green-400">
              وفّر {totalSavings} ر.ي
            </span>
          </div>
        )}
      </div>

      {/* Bundles Grid */}
      <div className="space-y-4">
        {bundleDeals.map((bundle) => (
            <div
              key={bundle.id}
              className="card overflow-hidden group"
            >
              <div className="p-4">
                <div className="flex items-start gap-4">
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0">
                    <img
                      src={bundle.products[0].image}
                      alt={bundle.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-purple-500 text-white text-xs font-bold flex items-center justify-center rounded-full">
                      {bundle.products.length}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-bold text-slate-800 dark:text-white mb-1">
                          {bundle.name}
                        </h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-1">
                          {bundle.description}
                        </p>
                      </div>
                      <div className="shrink-0 text-right">
                        <div className="flex items-center gap-1">
                          <span className="text-lg font-bold text-purple-600 dark:text-purple-400">
                            {bundle.bundlePrice} ر.ي
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-xs text-slate-400 line-through">
                            {bundle.products.reduce((s, p) => s + p.originalPrice, 0)} ر.ي
                          </span>
                          <span className="text-xs font-bold text-green-500">
                            -{bundle.discountPercent}%
                          </span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => handleAddBundle(bundle)}
                      className="mt-2 flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg text-sm font-medium hover:bg-purple-600 transition-colors"
                    >
                      <ShoppingCart size={16} />
                      إضافة للسلة
                    </button>
                  </div>
                </div>
              </div>
            </div>
        ))}
      </div>

      <Link
        href="/search?featured=bundles"
        className="flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-bold hover:from-purple-600 hover:to-pink-600 transition-colors"
      >
        عرض كل الباقات
        <ArrowRight size={18} />
      </Link>
    </div>
  );
}