"use client";

interface StatCardProps {
  label: string;
  value: string | number;
  color?: "emerald" | "sky" | "purple" | "red" | "amber" | "slate";
  icon?: React.ReactNode;
  subLabel?: string;
}

export default function StatCard({
  label,
  value,
  color = "slate",
  icon,
  subLabel,
}: StatCardProps) {
  const colorClasses = {
    emerald: "text-emerald-600",
    sky: "text-sky-600",
    purple: "text-purple-600",
    red: "text-red-600",
    amber: "text-amber-500",
    slate: "text-slate-800 dark:text-white",
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700">
      {icon}
      <p className="text-sm text-slate-500 mb-1">{label}</p>
      <p className={`text-2xl font-extrabold ${colorClasses[color]}`}>
        {typeof value === "number" ? value.toLocaleString("en") : value}
      </p>
      {subLabel && <span className="text-xs text-slate-400">{subLabel}</span>}
    </div>
  );
}