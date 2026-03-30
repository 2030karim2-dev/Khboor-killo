import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { categories } from "@/lib/categories";

export default function DesktopNav({
  categoriesOpen,
  onToggleCategories,
}: {
  categoriesOpen: boolean;
  onToggleCategories: () => void;
}) {
  return (
    <nav className="hidden md:block border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4">
        <ul className="flex items-center gap-1 text-sm">
          <li>
            <Link
              href="/"
              className="block px-4 py-2.5 hover:bg-sky-50 hover:text-sky-600 rounded-t-lg transition-colors font-medium"
            >
              الرئيسية
            </Link>
          </li>
          <li className="relative">
            <button
              onClick={onToggleCategories}
              className="flex items-center gap-1 px-4 py-2.5 hover:bg-sky-50 hover:text-sky-600 rounded-t-lg transition-colors font-medium"
            >
              الأقسام
              <ChevronDown
                size={16}
                className={`transition-transform ${categoriesOpen ? "rotate-180" : ""}`}
              />
            </button>
            {categoriesOpen && (
              <div className="absolute top-full right-0 bg-white rounded-xl shadow-xl border border-slate-200 py-2 min-w-[200px] animate-fade-in">
                {categories.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/category/${cat.slug}`}
                    onClick={onToggleCategories}
                    className="flex items-center gap-3 px-4 py-2.5 hover:bg-sky-50 transition-colors"
                  >
                    <span className="text-xl">{cat.icon}</span>
                    <span>{cat.name}</span>
                  </Link>
                ))}
              </div>
            )}
          </li>
          {categories.map((cat) => (
            <li key={cat.slug}>
              <Link
                href={`/category/${cat.slug}`}
                className="block px-4 py-2.5 hover:bg-sky-50 hover:text-sky-600 rounded-t-lg transition-colors"
              >
                {cat.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
