import { Review } from "../types/product";

const allReviews: Review[] = [
  { id: "r1", author: "محمد أحمد", rating: 5, comment: "منتج ممتاز وخدمة توصيل سريعة. أنصح به بشدة!", date: "2026-01-15", helpful: 12, productId: "car-1" },
  { id: "r2", author: "فاطمة علي", rating: 4, comment: "جودة جيدة جداً والسعر مناسب. التوصيل كان في الوقت المحدد.", date: "2026-01-10", helpful: 8, productId: "car-2" },
  { id: "r3", author: "عبدالله محمد", rating: 5, comment: "منتج أصلي كما هو موصوف. تجربة شراء ممتازة.", date: "2026-01-05", helpful: 15, productId: "car-3" },
  { id: "r4", author: "سارة خالد", rating: 4, comment: "قطعة غيار متوافقة تماماً مع سيارتي. شكراً!", date: "2026-02-01", helpful: 6, productId: "part-1" },
  { id: "r5", author: "أحمد ناصر", rating: 5, comment: "جودة عالية وسعر تنافسي. سأطلب مرة أخرى.", date: "2026-02-05", helpful: 10, productId: "part-2" },
  { id: "r6", author: "نورة عبدالله", rating: 3, comment: "المنتج جيد لكن التوصيل تأخر قليلاً.", date: "2026-02-10", helpful: 3, productId: "cloth-1" },
  { id: "r7", author: "خالد يوسف", rating: 5, comment: "ملابس بجودة ممتازة وقماش مريح. أنصح بها!", date: "2026-02-15", helpful: 14, productId: "cloth-2" },
  { id: "r8", author: "مريم حسن", rating: 4, comment: "مادة بناء عالية الجودة. تلبيسة الاحتياجات.", date: "2026-03-01", helpful: 7, productId: "build-1" },
  { id: "r9", author: "ياسر علي", rating: 5, comment: "إكسسوار أنيق ومتين. يشبه الصورة تماماً.", date: "2026-03-05", helpful: 9, productId: "acc-1" },
  { id: "r10", author: "ريم سالم", rating: 4, comment: "تصميم جميل وجودة جيدة. وصل بسرعة.", date: "2026-03-10", helpful: 5, productId: "acc-2" },
  { id: "r11", author: "طارق محمد", rating: 5, comment: "سيارة بحالة ممتازة كما هو موصوف. شكراً خبور!", date: "2026-03-15", helpful: 18, productId: "car-1" },
  { id: "r12", author: "هند عبدالرحمن", rating: 4, comment: "المنتج مطابق للوصف. أنصح بالتعامل مع هذا البائع.", date: "2026-03-20", helpful: 11, productId: "cloth-1" },
];

export function getReviewsByProductId(productId: string): Review[] {
  return allReviews.filter((r) => r.productId === productId);
}

export const mockReviews: Review[] = allReviews;
