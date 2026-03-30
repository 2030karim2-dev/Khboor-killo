"use client";

import { useState } from "react";
import { Star, Loader2 } from "lucide-react";
import { useToast } from "@/lib/ToastContext";

export default function ReviewForm({ productId }: { productId: string }) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { success, error } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (rating === 0) {
      error("يرجى اختيار التقييم");
      return;
    }
    const form = new FormData(e.currentTarget);
    const comment = form.get("comment") as string;
    if (!comment || comment.length < 10) {
      error("يرجى كتابة مراجعة لا تقل عن 10 أحرف");
      return;
    }

    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 800));
    setIsSubmitting(false);
    success("تم إضافة تقييمك بنجاح!");
    setRating(0);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <div className="card p-6">
      <h3 className="font-bold text-slate-800 mb-4">أضف تقييمك</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <p className="text-sm font-medium text-slate-700 mb-2">التقييم</p>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                className="p-1 transition-transform hover:scale-110"
                aria-label={`${star} نجوم`}
              >
                <Star
                  size={24}
                  className={
                    star <= (hoveredRating || rating)
                      ? "fill-amber-400 text-amber-400"
                      : "fill-slate-200 text-slate-200"
                  }
                />
              </button>
            ))}
            {rating > 0 && (
              <span className="text-sm text-slate-500 mr-2">
                {rating === 5 ? "ممتاز" : rating === 4 ? "جيد جداً" : rating === 3 ? "جيد" : rating === 2 ? "مقبول" : "سيء"}
              </span>
            )}
          </div>
        </div>
        <div>
          <label htmlFor="review-comment" className="block text-sm font-medium text-slate-700 mb-1.5">
            مراجعتك <span className="text-red-500">*</span>
          </label>
          <textarea
            id="review-comment"
            name="comment"
            rows={4}
            required
            minLength={10}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-sky-500 focus:outline-none text-right resize-none"
            placeholder="شاركنا تجربتك مع هذا المنتج..."
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary disabled:opacity-60"
        >
          {isSubmitting ? (
            <><Loader2 size={16} className="animate-spin" /> جاري الإرسال...</>
          ) : (
            "إرسال التقييم"
          )}
        </button>
      </form>
    </div>
  );
}
