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
    <div className="flex items-center justify-between mb-8">
      <div>
        <h2 className="text-2xl font-extrabold text-slate-800">{title}</h2>
        {subtitle && (
          <p className="text-slate-500 mt-1">{subtitle}</p>
        )}
      </div>
      {viewAllHref && (
        <Link
          href={viewAllHref}
          className="flex items-center gap-1 text-sky-600 hover:text-sky-700 font-medium text-sm transition-colors"
        >
          {viewAllLabel}
          <ChevronLeft size={16} />
        </Link>
      )}
    </div>
  );
}
