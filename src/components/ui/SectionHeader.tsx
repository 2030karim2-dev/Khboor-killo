import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function SectionHeader({
  title,
  subtitle,
  viewAllHref,
  viewAllLabel = "عرض المزيد",
}: {
  title: string;
  subtitle?: string;
  viewAllHref?: string;
  viewAllLabel?: string;
}) {
  return (
    <div className="flex items-center justify-between mb-5">
      <div>
        <h2 className="text-lg font-extrabold text-slate-800">{title}</h2>
        {subtitle && (
          <p className="text-slate-500 text-xs mt-0.5">{subtitle}</p>
        )}
      </div>
      {viewAllHref && (
        <Link
          href={viewAllHref}
          className="flex items-center gap-1 text-sky-600 hover:text-sky-700 font-medium text-xs transition-colors"
        >
          {viewAllLabel}
          <ChevronLeft size={14} />
        </Link>
      )}
    </div>
  );
}
