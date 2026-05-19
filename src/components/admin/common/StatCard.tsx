"use client";

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  change?: number;
  changeLabel?: string;
  color?: "default" | "success" | "warning" | "danger" | "info" | "primary";
  className?: string;
}

const colorClasses = {
  default: "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700",
  success: "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800",
  warning: "bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800",
  danger: "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800",
  info: "bg-sky-50 dark:bg-sky-900/20 border-sky-200 dark:border-sky-800",
  primary: "gradient-primary text-white border-0",
};

export function StatCard({
  title,
  value,
  icon,
  change,
  changeLabel,
  color = "default",
  className = "",
}: StatCardProps) {
  return (
    <div
      className={`rounded-xl p-4 md:p-5 border transition-all duration-200 hover:shadow-md ${colorClasses[color]} ${className}`}
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className={`${color === "primary" ? "text-white/80" : "text-slate-500 dark:text-slate-400"} text-xs md:text-sm font-medium`}>
            {title}
          </p>
          <p className={`${color === "primary" ? "text-white" : "text-slate-800 dark:text-white"} text-xl md:text-2xl font-extrabold mt-1`}>
            {value}
          </p>
        </div>
        {icon && (
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${color === "primary" ? "bg-white/20" : "bg-slate-100 dark:bg-slate-700"}`}>
            {icon}
          </div>
        )}
      </div>
      {change !== undefined && changeLabel && (
        <div className="flex items-center gap-1 text-xs md:text-sm">
          <span className={`${change > 0 ? "text-emerald-600" : change < 0 ? "text-red-600" : "text-slate-500"} font-medium`}>
            {change > 0 ? "+" : ""}{change}%
          </span>
          <span className="text-slate-500 dark:text-slate-400">{changeLabel}</span>
        </div>
      )}
    </div>
  );
}