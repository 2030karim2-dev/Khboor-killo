"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { CheckCircle, Loader2 } from "lucide-react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCart } from "@/lib/CartContext";
import { useToast } from "@/lib/ToastContext";
import { useOrders } from "@/lib/OrderContext";
import { FREE_SHIPPING_THRESHOLD, DEFAULT_SHIPPING_COST } from "@/lib";
import { Breadcrumb, OrderSummary, EmptyState } from "@/components/ui";
import ShippingForm from "@/components/checkout/ShippingForm";
import PaymentForm from "@/components/checkout/PaymentForm";
import CouponInput from "@/components/checkout/CouponInput";
import { checkoutSchema } from "@/lib/validations";
import type { Coupon } from "@/lib/coupons";
import type { CheckoutInput } from "@/lib/validations";

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const { success, error: showError } = useToast();
  const { addOrder } = useOrders();
  const [submitted, setSubmitted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutInput>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      city: "",
      address: "",
      paymentMethod: "card",
      cardNumber: "",
      cardExpiry: "",
      cardCvv: "",
    },
  });

  const paymentMethod = useWatch({ control, name: "paymentMethod" });
  const shippingCost = totalPrice >= FREE_SHIPPING_THRESHOLD ? 0 : DEFAULT_SHIPPING_COST;
  const finalTotal = totalPrice - couponDiscount + shippingCost;

  const handleCouponApply = useCallback((coupon: Coupon | null, discount: number) => {
    setAppliedCoupon(coupon);
    setCouponDiscount(discount);
  }, []);

  const onSubmit = useCallback(async (data: CheckoutInput) => {
    setIsProcessing(true);
    await new Promise((r) => setTimeout(r, 1500));

    const newOrderId = addOrder({
      items,
      totalPrice: finalTotal,
      shippingCost,
      shipping: {
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        city: data.city,
        address: data.address,
      },
      paymentMethod: data.paymentMethod,
    });

    clearCart();
    setOrderId(newOrderId);
    setIsProcessing(false);
    setSubmitted(true);
    success("تم تأكيد طلبك بنجاح!");
  }, [items, finalTotal, shippingCost, clearCart, addOrder, success]);

  const onError = useCallback(() => {
    showError("يرجى تصحيح الأخطاء في النموذج");
  }, [showError]);

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

      <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <ShippingForm register={register} errors={errors} />
            <PaymentForm control={control} paymentMethod={paymentMethod} errors={errors} />
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
              type="submit"
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
      </form>
    </div>
  );
}
