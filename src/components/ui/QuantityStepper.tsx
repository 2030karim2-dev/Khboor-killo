"use client";

import { Minus, Plus } from "lucide-react";

export default function QuantityStepper({
  value,
  onChange,
  min = 1,
  size = "md",
}: {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  size?: "sm" | "md";
}) {
  const buttonClass = size === "sm" ? "p-2" : "p-2.5";
  const textClass = size === "sm" ? "w-8 text-sm" : "w-12 text-base";

  return (
    <div className="flex items-center gap-0 border border-slate-200 rounded-xl overflow-hidden" role="group" aria-label="تحديد الكمية">
      <button
        onClick={() => onChange(Math.max(min, value - 1))}
        className={`${buttonClass} hover:bg-slate-100 transition-colors`}
        aria-label="نقصان الكمية"
      >
        <Minus size={size === "sm" ? 14 : 18} aria-hidden="true" />
      </button>
      <span className={`${textClass} text-center font-bold`} aria-label={`الكمية: ${value}`}>
        {value}
      </span>
      <button
        onClick={() => onChange(value + 1)}
        className={`${buttonClass} hover:bg-slate-100 transition-colors`}
        aria-label="زيادة الكمية"
      >
        <Plus size={size === "sm" ? 14 : 18} aria-hidden="true" />
      </button>
    </div>
  );
}
