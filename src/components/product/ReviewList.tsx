"use client";

import { useState } from "react";
import { Star, ThumbsUp, Filter, StarHalf } from "lucide-react";
import { getReviewsByProductId, mockReviews } from "@/data/reviews";
import { Review } from "@/types/product";

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

        <div className="md:col-span-2 space-y-2">
          {[5, 4, 3, 2, 1].map((rating) => {
            const count = ratingDistribution[rating] || 0;
            const percentage =
              displayReviews.length > 0
                ? (count / displayReviews.length) * 100
                : 0;
            return (
              <button
                key={rating}
                onClick={() =>
                  setFilterRating(filterRating === rating ? null : rating)
                }
                className={`w-full flex items-center gap-2 text-sm ${
                  filterRating === rating ? "bg-sky-50 dark:bg-sky-900/20 rounded-lg p-2" : ""
                }`}
              >
                <span className="w-8 text-slate-600 dark:text-slate-300">{rating}</span>
                <Star size={14} className="fill-amber-400 text-amber-400" />
                <div className="flex-1 h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-400 rounded-full transition-all"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="w-8 text-slate-500 dark:text-slate-400">
                  {count}
                </span>
              </button>
            );
          })}
        </div>
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

function ReviewCard({ review }: { review: Review }) {
  const [helpful, setHelpful] = useState(review.helpful);
  const [voted, setVoted] = useState(false);

  const handleHelpful = () => {
    if (!voted) {
      setHelpful(helpful + 1);
      setVoted(true);
    }
  };

  return (
    <div className="card p-5 dark:bg-slate-800">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-sky-100 dark:bg-sky-900/30 flex items-center justify-center">
            <span className="text-sky-600 dark:text-sky-400 font-bold text-sm">
              {review.author.charAt(0)}
            </span>
          </div>
          <div>
            <p className="font-bold text-slate-800 dark:text-white">
              {review.author}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {new Date(review.date).toLocaleDateString("ar-YE")}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-0.5">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={14}
              className={
                i < review.rating
                  ? "fill-amber-400 text-amber-400"
                  : "fill-slate-200 text-slate-200"
              }
              aria-hidden="true"
            />
          ))}
        </div>
      </div>
      <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
        {review.comment}
      </p>
      <div className="mt-3">
        <button
          onClick={handleHelpful}
          disabled={voted}
          className={`text-sm transition-colors ${
            voted
              ? "text-sky-500 cursor-default"
              : "text-slate-500 hover:text-sky-600 dark:text-slate-400 dark:hover:text-sky-400"
          }`}
        >
          <ThumbsUp size={14} className="inline ml-1" />
          مفيد ({helpful})
        </button>
      </div>
    </div>
  );
}

function ReviewForm({
  productId,
  onClose,
}: {
  productId: string;
  onClose: () => void;
}) {
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
      onClose();
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
            {rating === 5 && "ممتاز"}
            {rating === 4 && "جيد جداً"}
            {rating === 3 && "جيد"}
            {rating === 2 && "مقبول"}
            {rating === 1 && "ضعيف"}
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
