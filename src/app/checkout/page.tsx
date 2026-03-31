"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { CheckCircle, Loader2 } from "lucide-react";
import { useCart } from "@/lib/CartContext";
import { useToast } from "@/lib/ToastContext";
import { useOrders } from "@/lib/OrderContext";
import { FREE_SHIPPING_THRESHOLD, DEFAULT_SHIPPING_COST } from "@/lib";
import { Breadcrumb, OrderSummary, EmptyState } from "@/components/ui";
import ShippingForm, { type ShippingData } from "@/components/checkout/ShippingForm";
import PaymentForm, { type PaymentData } from "@/components/checkout/PaymentForm";
import CouponInput from "@/components/checkout/CouponInput";
import { checkoutSchema } from "@/lib/validations";
import type { Coupon } from "@/lib/coupons";

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const { success, error } = useToast();
  const { addOrder } = useOrders();
  const [submitted, setSubmitted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [shippingErrors, setShippingErrors] = useState<Partial<Record<keyof ShippingData, string>>>({});
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);

  const [shipping, setShipping] = useState<ShippingData>({
    firstName: "",
    lastName: "",
    phone: "",
    city: "",
    address: "",
  });

  const [payment, setPayment] = useState<PaymentData>({
    method: "card",
    cardNumber: "",
    cardExpiry: "",
    cardCvv: "",
  });

  const shippingCost = totalPrice >= FREE_SHIPPING_THRESHOLD ? 0 : DEFAULT_SHIPPING_COST;
  const finalTotal = totalPrice - couponDiscount + shippingCost;

  const handleCouponApply = useCallback((coupon: Coupon | null, discount: number) => {
    setAppliedCoupon(coupon);
    setCouponDiscount(discount);
  }, []);

  const handleCheckout = useCallback(async () => {
    const result = checkoutSchema.safeParse({
      ...shipping,
      paymentMethod: payment.method,
      ...(payment.method === "card" ? {
        cardNumber: payment.cardNumber,
        cardExpiry: payment.cardExpiry,
        cardCvv: payment.cardCvv,
      } : {}),
    });

    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ShippingData, string>> = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof ShippingData;
        fieldErrors[field] = issue.message;
      }
      setShippingErrors(fieldErrors);
      error("يرجى تصحيح الأخطاء في النموذج");
      return;
    }

    setShippingErrors({});
    setIsProcessing(true);
    await new Promise((r) => setTimeout(r, 1500));

    const newOrderId = addOrder({
      items,
      totalPrice,
      shippingCost,
      shipping,
      paymentMethod: payment.method,
    });

    clearCart();
    setOrderId(newOrderId);
    setIsProcessing(false);
    setSubmitted(true);
    success("تم تأكيد طلبك بنجاح!");
  }, [shipping, payment, items, totalPrice, shippingCost, clearCart, addOrder, success, error]);

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center animate-fade-in">
        <CheckCircle size={80} className="text-emerald-500 mx-auto mb-6" />
        <h1 className="text-3xl font-extrabold text-slate-800 mb-3">تم الطلب بنجاح!</h1>
        <p className="text-slate-500 mb-2">شكراً لك! تم استلام طلبك وسيتم تجهيزه قريباً.</p>
        <p className="text-slate-500 mb-8">رقم الطلب: #KH{orderId}</p>
        <div className="flex gap-3 justify-center">
          <Link href="/" className="btn-primary">العودة للرئيسية</Link>
          <Link href="/account" className="btn-outline">تتبع الطلب</Link>
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
      <Breadcrumb items={[
        { label: "الرئيسية", href: "/" },
        { label: "سلة التسوق", href: "/cart" },
        { label: "إتمام الشراء" },
      ]} />

      <h1 className="text-2xl font-extrabold text-slate-800 mb-8">إتمام الشراء</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <ShippingForm data={shipping} onChange={setShipping} errors={shippingErrors} />
          <PaymentForm data={payment} onChange={setPayment} />
        </div>

        <div className="h-fit sticky top-32 space-y-4">
          <OrderSummary
            items={items}
            totalPrice={totalPrice}
            shipping={shippingCost}
            discount={couponDiscount}
          />
          <div className="card p-6">
            <CouponInput totalPrice={totalPrice} onApply={handleCouponApply} />
          </div>
          <button
            onClick={handleCheckout}
            disabled={isProcessing}
            className="btn-secondary w-full justify-center py-3 text-base disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isProcessing ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                جاري المعالجة...
              </>
            ) : (
              "تأكيد الطلب والدفع"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
