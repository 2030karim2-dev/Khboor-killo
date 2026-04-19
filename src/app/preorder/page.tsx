"use client";

import { useState } from "react";
import { Clock, Check, Bell, Calendar, AlertCircle } from "lucide-react";
import { Breadcrumb } from "@/components/ui";

interface PreOrderProduct {
  id: string;
  name: string;
  image: string;
  regularPrice: number;
  preOrderPrice: number;
  discount: number;
  availableDate: string;
  limited: boolean;
  stock?: number;
}

const preOrderProducts: PreOrderProduct[] = [
  {
    id: "po-1",
    name: "Toyota Camry 2026",
    image: "https://images.unsplash.com/photo-1621003227383-b72d27b73fde?w=400&h=300&fit=crop",
    regularPrice: 150000,
    preOrderPrice: 135000,
    discount: 10,
    availableDate: "2026-06-01",
    limited: true,
    stock: 10,
  },
  {
    id: "po-2",
    name: "Michelin Pilot Sport 4S",
    image: "https://images.unsplash.com/photo-1569391572574-0f8d2cbe5d72?w=400&h=300&fit=crop",
    regularPrice: 1200,
    preOrderPrice: 950,
    discount: 21,
    availableDate: "2026-05-15",
    limited: true,
    stock: 50,
  },
  {
    id: "po-3",
    name: "Bosch Battery 100Ah",
    image: "https://images.unsplash.com/photo-1608088830948-76c61e0e8e23?w=400&h=300&fit=crop",
    regularPrice: 450,
    preOrderPrice: 380,
    discount: 15,
    availableDate: "2026-05-01",
    limited: false,
  },
];

export default function PreOrderPage() {
  const [notifiedProducts, setNotifiedProducts] = useState<Set<string>>(new Set());

  const handleNotify = (productId: string) => {
    setNotifiedProducts((prev) => new Set(prev).add(productId));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Breadcrumb items={[{ label: "الرئيسية", href: "/" }, { label: "الطلبات المسبقة" }]} />

      {/* Header */}
      <div className="text-center mb-12">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center mx-auto mb-4">
          <Clock size={40} className="text-white" />
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800 mb-2">الطلبات المسبقة</h1>
        <p className="text-slate-500 max-w-2xl mx-auto">
          احجز منتجاتك قبل وصولها واستفد من خصومات حصرية. 
          ادفع جزءاً بسيطاً وتأخذ المنتج عند وصوله.
        </p>
      </div>

      {/* How It Works */}
      <div className="grid md:grid-cols-3 gap-4 mb-12">
        <div className="card p-5 text-center">
          <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center mx-auto mb-3">
            <Calendar size={24} className="text-amber-600" />
          </div>
          <h3 className="font-bold text-slate-800 mb-1">1. احجز الآن</h3>
          <p className="text-sm text-slate-500">حدد المنتج وأضف العربة</p>
        </div>
        <div className="card p-5 text-center">
          <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center mx-auto mb-3">
            <Bell size={24} className="text-orange-600" />
          </div>
          <h3 className="font-bold text-slate-800 mb-1">2.انتظر الإشعار</h3>
          <p className="text-sm text-slate-500">سنخطرك عند وصول المنتج</p>
        </div>
        <div className="card p-5 text-center">
          <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center mx-auto mb-3">
            <Check size={24} className="text-emerald-600" />
          </div>
          <h3 className="font-bold text-slate-800 mb-1">3. استلم منتجك</h3>
          <p className="text-sm text-slate-500">ادفع الفرق واستلم المنتج</p>
        </div>
      </div>

      {/* Pre-Order Products */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">منتجات متاحة للحجز المسبق</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {preOrderProducts.map((product) => (
            <div key={product.id} className="card overflow-hidden group">
              <div className="relative h-48">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 end-3 bg-amber-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                  -{product.discount}%
                </div>
                {product.limited && product.stock && (
                  <div className="absolute top-3 start-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                   剩余: {product.stock}
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-bold text-slate-800 mb-2">{product.name}</h3>
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="text-xl font-bold text-emerald-600">{product.preOrderPrice} ر.ي</span>
                  <span className="text-sm text-slate-400 line-through">{product.regularPrice} ر.ي</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
                  <Clock size={14} />
                  <span>متاح من: {product.availableDate}</span>
                </div>
                {notifiedProducts.has(product.id) ? (
                  <button
                    disabled
                    className="w-full py-2.5 bg-emerald-100 text-emerald-600 rounded-xl text-sm font-medium flex items-center justify-center gap-2"
                  >
                    <Check size={16} />
                    تم الإشعار
                  </button>
                ) : (
                  <button
                    onClick={() => handleNotify(product.id)}
                    className="w-full py-2.5 bg-amber-500 text-white rounded-xl text-sm font-medium hover:bg-amber-600 transition-colors flex items-center justify-center gap-2"
                  >
                    <Bell size={16} />
                    أريد إشعاراً
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Notice */}
      <div className="card p-5 bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800">
        <div className="flex gap-4">
          <AlertCircle size={24} className="text-amber-500 shrink-0" />
          <div>
            <h3 className="font-bold text-amber-800 dark:text-amber-300 mb-1">مهم</h3>
            <p className="text-sm text-amber-700 dark:text-amber-400">
              - يمكنك إلغاء الطلب المسبق في أي وقت واسترداد العربون
              <br />
              - السعر المعلن نهائي عند الدفع الكامل
              <br />
              - مدة الانتظار قد تصل إلى 30 يوماً
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}