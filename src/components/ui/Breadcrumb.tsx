import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { BreadcrumbItem } from "@/lib/types";

export default function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="مسار التنقل">
      <ol className="flex items-center gap-2 text-sm text-slate-500 mb-6 flex-wrap list-none p-0 m-0">
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-2">
            {index > 0 && (
              <ChevronLeft size={14} className="text-slate-400" aria-hidden="true" />
            )}
            {item.href ? (
              <Link href={item.href} className="hover:text-sky-600 transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className="text-slate-800 font-medium" aria-current="page">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
