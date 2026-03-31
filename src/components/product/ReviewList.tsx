"use client";

import { Star } from "lucide-react";
import { mockReviews } from "@/lib/data/reviews";

export default function ReviewList({ productId }: { productId: string }) {
  return (
    <div>
      <h2 className="text-xl font-bold text-slate-800 mb-6">
        التقييمات ({mockReviews.length})
      </h2>

      <div className="space-y-4">
        {mockReviews.map((review) => (
          <div key={review.id} className="card p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-sky-100 flex items-center justify-center">
                  <span className="text-sky-600 font-bold text-sm">{review.author.charAt(0)}</span>
                </div>
                <div>
                  <p className="font-bold text-slate-800">{review.author}</p>
                  <p className="text-xs text-slate-500">{new Date(review.date).toLocaleDateString("ar-YE")}</p>
                </div>
              </div>
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className={i < review.rating ? "fill-amber-400 text-amber-400" : "fill-slate-200 text-slate-200"} aria-hidden="true" />
                ))}
              </div>
            </div>
            <p className="text-slate-600 leading-relaxed">{review.comment}</p>
            <div className="mt-3">
              <button className="text-sm text-slate-500 hover:text-sky-600 transition-colors">👍 مفيد ({review.helpful})</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
