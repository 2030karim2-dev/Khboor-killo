export interface Coupon {
  code: string;
  type: "percentage" | "fixed" | "free_shipping";
  value: number;
  minOrder?: number;
  maxDiscount?: number;
  description: string;
  expiresAt?: string;
  usageLimit?: number;
  usedCount?: number;
}

export const coupons: Coupon[] = [
  { code: "WELCOME10", type: "percentage", value: 10, minOrder: 0, description: "خصم 10% للعملاء الجدد", usageLimit: 1, usedCount: 0 },
  { code: "SAVE50", type: "fixed", value: 50, minOrder: 200, maxDiscount: 50, description: "خصم 50 ر.ي على الطلبات فوق 200", usageLimit: 100, usedCount: 45 },
  { code: "FREESHIP", type: "free_shipping", value: 25, description: "شحن مجاني", usageLimit: 200, usedCount: 120 },
  { code: "RAMADAN20", type: "percentage", value: 20, minOrder: 100, maxDiscount: 100, description: "خصم 20% بمناسبة رمضان", expiresAt: "2026-05-01", usageLimit: 500, usedCount: 230 },
  { code: "SUMMER30", type: "percentage", value: 30, minOrder: 300, description: "خصم صيفي 30%", expiresAt: "2026-06-30" },
];

export function validateCoupon(code: string, totalPrice: number): { valid: boolean; coupon?: Coupon; error?: string } {
  const coupon = coupons.find((c) => c.code === code.toUpperCase());
  if (!coupon) return { valid: false, error: "كود الخصم غير صحيح" };
  if (coupon.expiresAt && new Date(coupon.expiresAt) < new Date()) {
    return { valid: false, error: "انتهت صلاحية هذا الكوبون" };
  }
  if (coupon.usageLimit && (coupon.usedCount || 0) >= coupon.usageLimit) {
    return { valid: false, error: "تم استخدام جميع الكوبونات المتاحة" };
  }
  if (coupon.minOrder && totalPrice < coupon.minOrder) {
    return { valid: false, error: `الحد الأدنى للطلب ${coupon.minOrder} ر.ي` };
  }
  return { valid: true, coupon };
}

export function calculateDiscount(coupon: Coupon, totalPrice: number): number {
  if (coupon.type === "free_shipping") {
    return coupon.value;
  }
  if (coupon.type === "percentage") {
    let discount = (totalPrice * coupon.value) / 100;
    if (coupon.maxDiscount) {
      discount = Math.min(discount, coupon.maxDiscount);
    }
    return Math.round(discount);
  }
  return Math.min(coupon.value, totalPrice);
}

export function getCouponLabel(coupon: Coupon): string {
  if (coupon.type === "percentage") return `${coupon.value}%`;
  if (coupon.type === "free_shipping") return "شحن مجاني";
  return `${coupon.value} ر.ي`;
}
