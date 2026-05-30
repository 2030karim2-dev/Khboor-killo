"use client";

import { useState } from "react";
import { Star, ThumbsUp } from "lucide-react";
import { Review } from "@/types/product";

interface ReviewCardProps {
  review: Review;
}

export default function ReviewCard({ review }: ReviewCardProps) {
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