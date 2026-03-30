"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { categories } from "@/lib";

export default function DesktopNav({
  categoriesOpen,
  onToggleCategories,
}: {
  categoriesOpen: boolean;
  onToggleCategories: () => void;
}) {
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    if (!categoriesOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        onToggleCategories();
      }
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onToggleCategories();
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [categoriesOpen, onToggleCategories]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <nav className="hidden md:block border-t border-slate-100" aria-label="التنقل الرئيسي">
      <div className="max-w-7xl mx-auto px-4">
        <ul className="flex items-center gap-0.5 text-xs list-none p-0 m-0">
          <li>
            <Link
              href="/"
              aria-current={pathname === "/" ? "page" : undefined}
              className={`block px-3 py-1.5 rounded-t-lg transition-colors font-medium ${
                pathname === "/" ? "bg-sky-50 text-sky-600" : "hover:bg-sky-50 hover:text-sky-600"
              }`}
            >
              الرئيسية
            </Link>
          </li>
          <li className="relative" ref={dropdownRef}>
            <button
              onClick={onToggleCategories}
              aria-expanded={categoriesOpen}
              aria-haspopup="true"
              className="flex items-center gap-1 px-3 py-1.5 hover:bg-sky-50 hover:text-sky-600 rounded-t-lg transition-colors font-medium"
            >
              الأقسام
              <ChevronDown
                size={16}
                aria-hidden="true"
                className={`transition-transform ${categoriesOpen ? "rotate-180" : ""}`}
              />
            </button>
            {categoriesOpen && (
              <div
                role="menu"
                className="absolute top-full right-0 bg-white rounded-xl shadow-xl border border-slate-200 py-2 min-w-[200px] animate-fade-in z-50"
              >
                {categories.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/category/${cat.slug}`}
                    role="menuitem"
                    onClick={onToggleCategories}
                    className="flex items-center gap-3 px-4 py-2.5 hover:bg-sky-50 transition-colors"
                  >
                    <span className="text-xl" aria-hidden="true">{cat.icon}</span>
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
                aria-current={isActive(`/category/${cat.slug}`) ? "page" : undefined}
                className={`block px-3 py-1.5 rounded-t-lg transition-colors ${
                  isActive(`/category/${cat.slug}`) ? "bg-sky-50 text-sky-600 font-medium" : "hover:bg-sky-50 hover:text-sky-600"
                }`}
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
