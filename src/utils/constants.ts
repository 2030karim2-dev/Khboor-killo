export const FREE_SHIPPING_THRESHOLD = 200;
export const DEFAULT_SHIPPING_COST = 25;
export const RETURN_DAYS = 14;
export const SITE_NAME = "خبور";
export const SITE_TAGLINE = "كل شيء في مكان واحد";
export const CONTACT_PHONE = "+967 779 816 860";
export const CONTACT_EMAIL = "alkarime0@gmail.com";
export const CURRENCY = "ر.ي";
export const CURRENCY_CODE = "YER";
export const CITIES = [
  "صنعاء",
  "عدن",
  "تعز",
  "الحديدة",
  "إب",
  "المكلا",
  "ذمار",
  "عمران",
] as const;

export const SORT_OPTIONS = [
  { value: "newest", label: "الأحدث" },
  { value: "price-asc", label: "السعر: من الأقل للأعلى" },
  { value: "price-desc", label: "السعر: من الأعلى للأقل" },
  { value: "rating", label: "الأعلى تقييماً" },
] as const;
