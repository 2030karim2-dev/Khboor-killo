import { Review } from "../types";

export const mockReviews: Review[] = [
  {
    id: "1",
    author: "محمد أحمد",
    rating: 5,
    comment: "منتج ممتاز وخدمة توصيل سريعة. أنصح به بشدة!",
    date: "2025-12-15",
    helpful: 12,
  },
  {
    id: "2",
    author: "فاطمة علي",
    rating: 4,
    comment: "جودة جيدة جداً والسعر مناسب. التوصيل كان في الوقت المحدد.",
    date: "2025-12-10",
    helpful: 8,
  },
  {
    id: "3",
    author: "عبدالله محمد",
    rating: 5,
    comment: "منتج أصلي كما هو موصوف. تجربة شراء ممتازة.",
    date: "2025-12-05",
    helpful: 15,
  },
];
