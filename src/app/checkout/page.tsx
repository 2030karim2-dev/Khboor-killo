"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, CreditCard, Banknote, CheckCircle } from "lucide-react";
import { useCart } from "@/lib/CartContext";
import { formatPrice } from "@/lib/data";

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const [submitted, setSubmitted] = useState(false);
  const [orderId] = useState(() => Math.random().toString(36).slice(2, 10).toUpperCase());

  const shipping = totalPrice >= 200 ? 0 : 25;

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center animate-fade-in">
        <CheckCircle size={80} className="text-emerald-500 mx-auto mb-6" />
        <h1 className="text-3xl font-extrabold text-slate-800 mb-3">
          تم الطلب بنجاح!
        </h1>
        <p className="text-slate-500 mb-2">
          شكراً لك! تم استلام طلبك وسيتم تجهيزه قريباً.
        </p>
        <p className="text-slate-500 mb-8">
          رقم الطلب: #KH{orderId}
        </p>
        <div className="flex gap-3 justify-center">
          <Link href="/" className="btn-primary">
            العودة للرئيسية
          </Link>
          <Link href="/account" className="btn-outline">
            تتبع الطلب
          </Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <p className="text-6xl mb-4">🛒</p>
        <h1 className="text-2xl font-bold text-slate-800 mb-2">
          لا توجد منتجات للدفع
        </h1>
        <p className="text-slate-500 mb-4">أضف منتجات إلى سلة التسوق أولاً</p>
        <Link href="/" className="btn-primary">
          تصفح المنتجات
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6">
        <Link href="/" className="hover:text-sky-600 transition-colors">
          الرئيسية
        </Link>
        <ChevronLeft size={14} />
        <Link href="/cart" className="hover:text-sky-600 transition-colors">
          سلة التسوق
        </Link>
        <ChevronLeft size={14} />
        <span className="text-slate-800 font-medium">إتمام الشراء</span>
      </nav>

      <h1 className="text-2xl font-extrabold text-slate-800 mb-8">
        إتمام الشراء
      </h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Shipping */}
          <div className="card p-6">
            <h2 className="text-lg font-bold text-slate-800 mb-4">
              معلومات الشحن
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  الاسم الأول
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-sky-500 focus:outline-none transition-colors text-right"
                  placeholder="أدخل اسمك الأول"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  الاسم الأخير
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-sky-500 focus:outline-none transition-colors text-right"
                  placeholder="أدخل اسمك الأخير"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  رقم الجوال
                </label>
                <input
                  type="tel"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-sky-500 focus:outline-none transition-colors text-right"
                  placeholder="05xxxxxxxx"
                  dir="ltr"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  المدينة
                </label>
                <select className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-sky-500 focus:outline-none transition-colors bg-white">
                  <option>الرياض</option>
                  <option>جدة</option>
                  <option>الدمام</option>
                  <option>مكة المكرمة</option>
                  <option>المدينة المنورة</option>
                  <option>أبها</option>
                  <option>تبوك</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  العنوان التفصيلي
                </label>
                <textarea
                  rows={3}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-sky-500 focus:outline-none transition-colors text-right resize-none"
                  placeholder="الحي، الشارع، رقم المبنى..."
                />
              </div>
            </div>
          </div>

          {/* Payment */}
          <div className="card p-6">
            <h2 className="text-lg font-bold text-slate-800 mb-4">
              طريقة الدفع
            </h2>
            <div className="space-y-3">
              <label className="flex items-center gap-3 p-4 rounded-xl border-2 border-sky-500 bg-sky-50 cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  defaultChecked
                  className="accent-sky-500"
                />
                <CreditCard size={20} className="text-sky-600" />
                <div>
                  <p className="font-medium text-slate-800">بطاقة ائتمانية</p>
                  <p className="text-xs text-slate-500">فيزا / ماستركارد</p>
                </div>
              </label>
              <label className="flex items-center gap-3 p-4 rounded-xl border-2 border-slate-200 hover:border-sky-300 cursor-pointer transition-colors">
                <input
                  type="radio"
                  name="payment"
                  className="accent-sky-500"
                />
                <Banknote size={20} className="text-slate-600" />
                <div>
                  <p className="font-medium text-slate-800">
                    الدفع عند الاستلام
                  </p>
                  <p className="text-xs text-slate-500">ادفع نقداً عند وصول طلبك</p>
                </div>
              </label>
            </div>

            {/* Card details */}
            <div className="mt-4 grid md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  رقم البطاقة
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-sky-500 focus:outline-none transition-colors"
                  placeholder="0000 0000 0000 0000"
                  dir="ltr"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  تاريخ الانتهاء
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-sky-500 focus:outline-none transition-colors"
                  placeholder="MM/YY"
                  dir="ltr"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  CVV
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-sky-500 focus:outline-none transition-colors"
                  placeholder="***"
                  dir="ltr"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="card p-6 h-fit sticky top-32">
          <h2 className="text-lg font-bold text-slate-800 mb-4">ملخص الطلب</h2>
          <div className="space-y-3 mb-4">
            {items.map((item) => (
              <div
                key={item.product.id}
                className="flex gap-3 items-center"
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-800 truncate">
                    {item.product.name}
                  </p>
                  <p className="text-xs text-slate-500">
                    الكمية: {item.quantity}
                  </p>
                </div>
                <p className="text-sm font-bold shrink-0">
                  {formatPrice(item.product.price * item.quantity)}
                </p>
              </div>
            ))}
          </div>
          <hr className="my-3" />
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-600">المجموع الفرعي</span>
              <span className="font-medium">{formatPrice(totalPrice)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">الشحن</span>
              <span className="font-medium">
                {shipping === 0 ? (
                  <span className="text-emerald-600">مجاني</span>
                ) : (
                  formatPrice(shipping)
                )}
              </span>
            </div>
            <hr className="my-2" />
            <div className="flex justify-between text-base">
              <span className="font-bold text-slate-800">الإجمالي</span>
              <span className="font-extrabold text-slate-900">
                {formatPrice(totalPrice + shipping)}
              </span>
            </div>
          </div>
          <button
            onClick={() => {
              clearCart();
              setSubmitted(true);
            }}
            className="btn-secondary w-full justify-center mt-6 py-3 text-base"
          >
            تأكيد الطلب والدفع
          </button>
        </div>
      </div>
    </div>
  );
}
