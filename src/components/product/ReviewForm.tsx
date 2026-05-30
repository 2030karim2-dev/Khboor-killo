"use client";

import { useState } from "react";
import { Star } from "lucide-react";

interface ReviewFormProps {
  productId: string;
  onClose?: () => void;
}

const ratingLabels: Record<number, string> = {
  5: "ممتاز",
  4: "جيد جداً",
  3: "جيد",
  2: "مقبول",
  1: "ضعيف",
};

export default function ReviewForm({ productId, onClose }: ReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0 || comment.trim() === "") return;

    setIsSubmitting(true);

    console.log("Submitting review:", { productId, rating, comment });

    setTimeout(() => {
      setIsSubmitting(false);
      onClose?.();
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="card p-5 dark:bg-slate-800">
      <h3 className="font-bold text-slate-800 dark:text-white mb-4">
        إضافة تقييم جديد
      </h3>

      <div className="mb-4">
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
          التقييم
        </label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              className="p-1 transition-transform hover:scale-110"
            >
              <Star
                size={24}
                className={
                  star <= (hoverRating || rating)
                    ? "fill-amber-400 text-amber-400"
                    : "fill-slate-200 text-slate-200"
                }
              />
            </button>
          ))}
        </div>
        {rating > 0 && (
          <p className="text-sm text-slate-500 mt-1">
            {ratingLabels[rating]}
          </p>
        )}
      </div>

      <div className="mb-4">
        <label
          htmlFor="review-comment"
          className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
        >
          تعليقك
        </label>
        <textarea
          id="review-comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="اكتب تجربتك مع هذا المنتج..."
          rows={4}
          className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 focus:border-sky-500 dark:focus:border-sky-400 focus:outline-none transition-colors resize-none"
          required
        />
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={rating === 0 || comment.trim() === "" || isSubmitting}
          className="flex-1 py-2.5 bg-sky-500 text-white rounded-xl font-medium hover:bg-sky-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "جاري الإرسال..." : "إرسال التقييم"}
        </button>
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2.5 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-xl font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
        >
          إلغاء
        </button>
      </div>
    </form>
  );
}