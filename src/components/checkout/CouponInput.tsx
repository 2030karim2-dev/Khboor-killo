"use client";

import { useState } from "react";
import { Tag, X, Check, ChevronDown, Gift } from "lucide-react";
import { coupons, validateCoupon, calculateDiscount, getCouponLabel, type Coupon } from "@/data/coupons";
import { useFormatPrice } from "@/hooks/useFormatPrice";

interface Props {
  totalPrice: number;
  onApply: (coupon: Coupon | null, discount: number) => void;
}

export default function CouponInput({ totalPrice, onApply }: Props) {
  const [code, setCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const { format: formatCurrency } = useFormatPrice();
  const [error, setError] = useState("");
  const [showAvailable, setShowAvailable] = useState(false);

  const availableCoupons = coupons.filter((c) => {
    if (c.expiresAt && new Date(c.expiresAt) < new Date()) return false;
    if (c.usageLimit && (c.usedCount || 0) >= c.usageLimit) return false;
    return true;
  });

  const handleApply = (couponCode?: string) => {
    const codeToUse = couponCode || code;
    if (!codeToUse.trim()) return;
    const result = validateCoupon(codeToUse, totalPrice);
    if (!result.valid) {
      setError(result.error || "كود غير صحيح");
      return;
    }
    const discount = calculateDiscount(result.coupon!, totalPrice);
    setAppliedCoupon(result.coupon!);
    setError("");
    onApply(result.coupon!, discount);
  };

  const handleRemove = () => {
    setAppliedCoupon(null);
    setCode("");
    setError("");
    onApply(null, 0);
  };

  if (appliedCoupon) {
    return (
      <div className="flex items-center gap-2 p-3 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-xl">
        <Check size={16} className="text-emerald-600 dark:text-emerald-400 shrink-0" />
        <div className="flex-1">
          <p className="text-sm font-bold text-emerald-800 dark:text-emerald-300">{appliedCoupon.code}</p>
          <p className="text-xs text-emerald-600 dark:text-emerald-400">{appliedCoupon.description}</p>
        </div>
        <span className="text-sm font-bold text-emerald-700 dark:text-emerald-300">
          -{formatCurrency(calculateDiscount(appliedCoupon, totalPrice))}
        </span>
        <button
          onClick={handleRemove}
          className="p-1 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 rounded-lg transition-colors"
          aria-label="إزالة الكوبون"
        >
          <X size={14} className="text-emerald-600 dark:text-emerald-400" />
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Tag size={16} className="absolute end-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            placeholder="أدخل كود الخصم"
            className="w-full py-2.5 pe-10 ps-4 rounded-xl border border-slate-200 dark:border-slate-700 focus:border-sky-500 dark:focus:border-sky-400 focus:outline-none transition-colors text-sm bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200"
          />
        </div>
        <button
          onClick={() => handleApply()}
          disabled={!code.trim()}
          className="px-4 py-2.5 bg-sky-500 text-white rounded-xl text-sm font-medium hover:bg-sky-600 transition-colors disabled:opacity-50"
        >
          تطبيق
        </button>
      </div>
      
      {error && <p className="text-xs text-red-500">{error}</p>}

      {/* Available Coupons */}
      <div className="relative">
        <button
          onClick={() => setShowAvailable(!showAvailable)}
          className="flex items-center gap-2 text-sm text-sky-600 dark:text-sky-400 hover:underline"
        >
          <Gift size={14} />
          <span>كوبونات متاحة</span>
          <ChevronDown size={14} className={`transition-transform ${showAvailable ? "rotate-180" : ""}`} />
        </button>

        {showAvailable && (
          <div className="absolute top-full mt-2 left-0 right-0 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg z-10 max-h-48 overflow-y-auto">
            {availableCoupons.length === 0 ? (
              <p className="p-3 text-sm text-slate-500 text-center">لا توجد كوبونات متاحة</p>
            ) : (
              availableCoupons.map((coupon) => (
                <button
                  key={coupon.code}
                  onClick={() => {
                    setCode(coupon.code);
                    handleApply(coupon.code);
                    setShowAvailable(false);
                  }}
                  className="w-full p-3 text-right hover:bg-slate-50 dark:hover:bg-slate-700 border-b border-slate-100 dark:border-slate-700 last:border-0"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sky-600 dark:text-sky-400">{coupon.code}</span>
                    <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">{getCouponLabel(coupon)}</span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{coupon.description}</p>
                  {coupon.minOrder && (
                    <p className="text-xs text-amber-600 dark:text-amber-400 mt-1">الحد الأدنى: {coupon.minOrder} ر.ي</p>
                  )}
                </button>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
