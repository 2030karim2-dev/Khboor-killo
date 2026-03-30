type BadgeVariant = "success" | "warning" | "info" | "danger" | "neutral";

const variantStyles: Record<BadgeVariant, string> = {
  success: "bg-emerald-50 text-emerald-600",
  warning: "bg-amber-50 text-amber-600",
  info: "bg-sky-50 text-sky-600",
  danger: "bg-red-50 text-red-500",
  neutral: "bg-slate-100 text-slate-600",
};

export default function Badge({
  children,
  variant = "neutral",
  className = "",
}: {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}) {
  return (
    <span
      className={`text-xs font-medium px-2 py-1 rounded-full ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
