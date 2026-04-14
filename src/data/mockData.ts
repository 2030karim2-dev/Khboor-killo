interface SellerStat {
  label: string;
  value: string;
}

interface SellerListing {
  name: string;
  price: string;
  status: string;
  views: number;
}

interface RecentOrder {
  id: string;
  date: string;
  total: string;
  status: string;
}

export const mockSellerStats: SellerStat[] = [
  { label: "منتج نشط", value: "12" },
  { label: "إجمالي المبيعات", value: "4,520 ر.ي" },
  { label: "طلب هذا الشهر", value: "28" },
];

export const mockSellerListings: SellerListing[] = [
  { name: "تويوتا كامري 2024", price: "125,000", status: "نشط", views: 234 },
  { name: "طقم فرامل أصلي", price: "450", status: "نشط", views: 89 },
  { name: "بطارية سيارة 100 أمبير", price: "380", status: "قيد المراجعة", views: 45 },
];

export const mockRecentOrders: RecentOrder[] = [
  { id: "KH12345678", date: "2024-01-15", total: "1,450 ر.ي", status: "تم التوصيل" },
  { id: "KH12345677", date: "2024-01-10", total: "380 ر.ي", status: "قيد الشحن" },
  { id: "KH12345676", date: "2024-01-05", total: "599 ر.ي", status: "جاري التجهيز" },
];
