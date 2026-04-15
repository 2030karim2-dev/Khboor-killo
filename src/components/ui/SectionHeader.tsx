import Link from "next/link";
import { ChevronRight } from "lucide-react";

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
    <div className="flex items-end justify-between mb-6 pb-4 border-b border-slate-200 dark:border-slate-700">
      <div className="flex-1">
        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 dark:text-white">{title}</h2>
        {subtitle && (
          <p className="text-slate-500 dark:text-slate-400 text-base mt-1.5">{subtitle}</p>
        )}
      </div>
      {viewAllHref && (
        <Link
          href={viewAllHref}
          className="hidden md:flex items-center gap-2 text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 font-semibold text-sm transition-all hover:gap-3"
        >
          {viewAllLabel}
          <ChevronRight size={18} />
        </Link>
      )}
    </div>
  );
}
