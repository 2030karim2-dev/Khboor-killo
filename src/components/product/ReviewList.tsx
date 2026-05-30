"use client";

import { useState } from "react";
import { Star, Filter } from "lucide-react";
import { getReviewsByProductId, mockReviews } from "@/data/reviews";
import { Review } from "@/types/product";
import ReviewCard from "./ReviewCard";
import ReviewForm from "./ReviewForm";
import RatingFilter from "./RatingFilter";

type SortOption = "newest" | "oldest" | "highest" | "lowest";

export default function ReviewList({ productId }: { productId: string }) {
  const reviews = getReviewsByProductId(productId);
  const displayReviews = reviews.length > 0 ? reviews : mockReviews.slice(0, 2);
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [filterRating, setFilterRating] = useState<number | null>(null);
  const [showAddReview, setShowAddReview] = useState(false);

  const sortedReviews = [...displayReviews].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      case "oldest":
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      case "highest":
        return b.rating - a.rating;
      case "lowest":
        return a.rating - b.rating;
      default:
        return 0;
    }
  });

  const filteredReviews = filterRating
    ? sortedReviews.filter((r) => r.rating === filterRating)
    : sortedReviews;

  const ratingDistribution = displayReviews.reduce(
    (acc, review) => {
      acc[review.rating] = (acc[review.rating] || 0) + 1;
      return acc;
    },
    {} as Record<number, number>
  );

  const averageRating =
    displayReviews.length > 0
      ? displayReviews.reduce((sum, r) => sum + r.rating, 0) / displayReviews.length
      : 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-800 dark:text-white">
          التقييمات ({displayReviews.length})
        </h2>
        <button
          onClick={() => setShowAddReview(!showAddReview)}
          className="px-4 py-2 bg-sky-500 text-white rounded-lg text-sm font-medium hover:bg-sky-600 transition-colors"
        >
          إضافة تقييم
        </button>
      </div>

      {showAddReview && (
        <ReviewForm productId={productId} onClose={() => setShowAddReview(false)} />
      )}

      <div className="grid md:grid-cols-3 gap-6">
        <div className="card p-6 text-center">
          <div className="text-4xl font-bold text-slate-800 dark:text-white mb-2">
            {averageRating.toFixed(1)}
          </div>
          <div className="flex justify-center gap-1 mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={18}
                className={
                  star <= Math.round(averageRating)
                    ? "fill-amber-400 text-amber-400"
                    : "fill-slate-200 text-slate-200"
                }
              />
            ))}
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            ({displayReviews.length} تقييم)
          </p>
        </div>

        <RatingFilter
          filterRating={filterRating}
          setFilterRating={setFilterRating}
          ratingDistribution={ratingDistribution}
          totalReviews={displayReviews.length}
        />
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter size={16} className="text-slate-500" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="text-sm border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-1.5 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300"
          >
            <option value="newest">الأحدث</option>
            <option value="oldest">الأقدم</option>
            <option value="highest">الأعلى تقييم</option>
            <option value="lowest">الأقل تقييم</option>
          </select>
        </div>
        {filterRating && (
          <button
            onClick={() => setFilterRating(null)}
            className="text-sm text-sky-600 dark:text-sky-400 hover:underline"
          >
            إزالة الفلتر
          </button>
        )}
      </div>

      {filteredReviews.length === 0 ? (
        <div className="card p-6 text-center">
          <p className="text-slate-500 dark:text-slate-400">
            لا توجد تقييمات بعد. كن أول من يقيّم هذا المنتج!
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredReviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      )}
    </div>
  );
}