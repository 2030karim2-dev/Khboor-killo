import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { BreadcrumbItem } from "@/lib/types";

export default function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6 flex-wrap">
      {items.map((item, index) => (
        <span key={index} className="flex items-center gap-2">
          {index > 0 && <ChevronLeft size={14} />}
          {item.href ? (
            <Link
              href={item.href}
              className="hover:text-sky-600 transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-slate-800 font-medium">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
