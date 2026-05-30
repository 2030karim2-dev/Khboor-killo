"use client";

import { Star } from "lucide-react";

interface RatingFilterProps {
  filterRating: number | null;
  setFilterRating: (rating: number | null) => void;
  ratingDistribution: Record<number, number>;
  totalReviews: number;
}

export default function RatingFilter({
  filterRating,
  setFilterRating,
  ratingDistribution,
  totalReviews,
}: RatingFilterProps) {
  return (
    <div className="md:col-span-2 space-y-2">
      {[5, 4, 3, 2, 1].map((rating) => {
        const count = ratingDistribution[rating] || 0;
        const percentage =
          totalReviews > 0
            ? (count / totalReviews) * 100
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
  );
}