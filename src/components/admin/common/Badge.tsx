"use client";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "success" | "warning" | "danger" | "info";
  size?: "sm" | "md";
  className?: string;
}

export function Badge({
  children,
  variant = "default",
  size = "md",
  className = "",
}: BadgeProps) {
  const variantClasses = {
    default: "bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300",
    success: "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20",
    warning: "bg-amber-50 text-amber-600 dark:bg-amber-900/20",
    danger: "bg-red-50 text-red-600 dark:bg-red-900/20",
    info: "bg-sky-50 text-sky-600 dark:bg-sky-900/20",
  };

  const sizeClasses = {
    sm: "text-[10px] px-1.5 py-0.5",
    md: "text-xs px-2.5 py-1",
  };

  return (
    <span
      className={`inline-flex items-center justify-center font-medium rounded-full ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    >
      {children}
    </span>
  );
}