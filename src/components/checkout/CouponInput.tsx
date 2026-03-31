"use client";

import { useState } from "react";
import { Tag, X, Check } from "lucide-react";
import { validateCoupon, calculateDiscount, type Coupon } from "@/lib/coupons";
import { formatPrice } from "@/lib";

interface Props {
  totalPrice: number;
  onApply: (coupon: Coupon | null, discount: number) => void;
}

export default function CouponInput({ totalPrice, onApply }: Props) {
  const [code, setCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [error, setError] = useState("");

  const handleApply = () => {
    if (!code.trim()) return;
    const result = validateCoupon(code, totalPrice);
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
      <div className="flex items-center gap-2 p-3 bg-emerald-50 border border-emerald-200 rounded-xl">
        <Check size={16} className="text-emerald-600 shrink-0" />
        <div className="flex-1">
          <p className="text-sm font-medium text-emerald-800">{appliedCoupon.code}</p>
          <p className="text-xs text-emerald-600">{appliedCoupon.description}</p>
        </div>
        <span className="text-sm font-bold text-emerald-700">
          -{formatPrice(calculateDiscount(appliedCoupon, totalPrice))}
        </span>
        <button
          onClick={handleRemove}
          className="p-1 hover:bg-emerald-100 rounded-lg transition-colors"
          aria-label="إزالة الكوبون"
        >
          <X size={14} className="text-emerald-600" />
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Tag size={16} className="absolute end-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            placeholder="أدخل كود الخصم"
            className="w-full py-2.5 pe-10 ps-4 rounded-xl border border-slate-200 focus:border-sky-500 focus:outline-none transition-colors text-sm"
          />
        </div>
        <button
          onClick={handleApply}
          disabled={!code.trim()}
          className="px-4 py-2.5 bg-slate-800 text-white rounded-xl text-sm font-medium hover:bg-slate-700 transition-colors disabled:opacity-50"
        >
          تطبيق
        </button>
      </div>
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}
