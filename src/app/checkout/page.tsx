"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { useCart } from "@/lib/CartContext";
import { Breadcrumb, OrderSummary, EmptyState } from "@/components/ui";
import ShippingForm from "@/components/checkout/ShippingForm";
import PaymentForm from "@/components/checkout/PaymentForm";

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const [submitted, setSubmitted] = useState(false);
  const [orderId] = useState(() =>
    Math.random().toString(36).slice(2, 10).toUpperCase()
  );

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
        <p className="text-slate-500 mb-8">رقم الطلب: #KH{orderId}</p>
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
      <div className="max-w-2xl mx-auto px-4 py-16">
        <EmptyState
          icon="🛒"
          title="لا توجد منتجات للدفع"
          description="أضف منتجات إلى سلة التسوق أولاً"
          actionLabel="تصفح المنتجات"
          actionHref="/"
        />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Breadcrumb
        items={[
          { label: "الرئيسية", href: "/" },
          { label: "سلة التسوق", href: "/cart" },
          { label: "إتمام الشراء" },
        ]}
      />

      <h1 className="text-2xl font-extrabold text-slate-800 mb-8">
        إتمام الشراء
      </h1>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <ShippingForm />
          <PaymentForm />
        </div>

        <OrderSummary
          items={items}
          totalPrice={totalPrice}
          shipping={shipping}
          actionLabel="تأكيد الطلب والدفع"
          onAction={() => {
            clearCart();
            setSubmitted(true);
          }}
        />
      </div>
    </div>
  );
}
