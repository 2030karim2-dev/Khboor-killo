export interface Coupon {
  code: string;
  type: "percentage" | "fixed";
  value: number;
  minOrder?: number;
  description: string;
}

export const coupons: Coupon[] = [
  { code: "WELCOME10", type: "percentage", value: 10, description: "خصم 10% للعملاء الجدد" },
  { code: "SAVE50", type: "fixed", value: 50, minOrder: 200, description: "خصم 50 ر.ي على الطلبات فوق 200" },
  { code: "FREESHIP", type: "fixed", value: 25, description: "شحن مجاني" },
  { code: "RAMADAN20", type: "percentage", value: 20, minOrder: 100, description: "خصم 20% بمناسبة رمضان" },
];

export function validateCoupon(code: string, totalPrice: number): { valid: boolean; coupon?: Coupon; error?: string } {
  const coupon = coupons.find((c) => c.code === code.toUpperCase());
  if (!coupon) return { valid: false, error: "كود الخصم غير صحيح" };
  if (coupon.minOrder && totalPrice < coupon.minOrder) {
    return { valid: false, error: `الحد الأدنى للطلب ${coupon.minOrder} ر.ي` };
  }
  return { valid: true, coupon };
}

export function calculateDiscount(coupon: Coupon, totalPrice: number): number {
  if (coupon.type === "percentage") {
    return Math.round((totalPrice * coupon.value) / 100);
  }
  return Math.min(coupon.value, totalPrice);
}
