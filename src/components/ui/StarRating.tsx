import { Star } from "lucide-react";

export default function StarRating({
  rating,
  max = 5,
  size = 16,
  showValue = true,
  reviews,
}: {
  rating: number;
  max?: number;
  size?: number;
  showValue?: boolean;
  reviews?: number;
}) {
  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center gap-0.5">
        {[...Array(max)].map((_, i) => (
          <Star
            key={i}
            size={size}
            className={
              i < Math.floor(rating)
                ? "fill-amber-400 text-amber-400"
                : "fill-slate-200 text-slate-200"
            }
          />
        ))}
      </div>
      {showValue && (
        <span className="font-bold text-slate-700">{rating}</span>
      )}
      {reviews !== undefined && (
        <span className="text-slate-400 text-sm">({reviews} تقييم)</span>
      )}
    </div>
  );
}
