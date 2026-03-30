"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Search,
  ShoppingCart,
  User,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";
import { useCart } from "@/lib/CartContext";
import { categories } from "@/lib/data";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const { totalItems } = useCart();

  return (
    <header className="sticky top-0 z-50 glass border-b border-slate-200">
      {/* Top bar */}
      <div className="gradient-primary text-white text-sm py-1.5">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <span>شحن مجاني للطلبات فوق 200 ر.س</span>
          <div className="hidden md:flex gap-4 items-center">
            <span>📱 تطبيق خبور متاح الآن</span>
            <span>|</span>
            <span>📞 920001234</span>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center text-white font-bold text-xl">
              خ
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-slate-800">خبور</h1>
              <p className="text-xs text-slate-500 -mt-0.5">كل شيء في مكان واحد</p>
            </div>
          </Link>

          {/* Search */}
          <div className="flex-1 max-w-2xl hidden md:block">
            <form action="/search" className="relative">
              <input
                type="text"
                name="q"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ابحث عن منتجات..."
                className="w-full py-2.5 pr-12 pl-4 rounded-xl border-2 border-slate-200 focus:border-sky-500 focus:outline-none transition-colors bg-white text-right"
              />
              <button
                type="submit"
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-sky-500 text-white p-1.5 rounded-lg hover:bg-sky-600 transition-colors"
              >
                <Search size={18} />
              </button>
            </form>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/cart"
              className="relative p-2 rounded-xl hover:bg-slate-100 transition-colors"
            >
              <ShoppingCart size={22} className="text-slate-700" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {totalItems}
                </span>
              )}
            </Link>
            <Link
              href="/login"
              className="hidden sm:flex items-center gap-1.5 p-2 rounded-xl hover:bg-slate-100 transition-colors text-slate-700"
            >
              <User size={22} />
              <span className="text-sm">تسجيل الدخول</span>
            </Link>
            <Link
              href="/sell"
              className="hidden md:inline-flex btn-secondary text-sm py-2"
            >
              بيع منتج
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl hover:bg-slate-100 transition-colors"
            >
              {mobileMenuOpen ? (
                <X size={24} className="text-slate-700" />
              ) : (
                <Menu size={24} className="text-slate-700" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile search */}
        <div className="md:hidden mt-3">
          <form action="/search" className="relative">
            <input
              type="text"
              name="q"
              placeholder="ابحث عن منتجات..."
              className="w-full py-2 pr-12 pl-4 rounded-xl border-2 border-slate-200 focus:border-sky-500 focus:outline-none transition-colors bg-white text-right text-sm"
            />
            <button
              type="submit"
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-sky-500 text-white p-1.5 rounded-lg"
            >
              <Search size={16} />
            </button>
          </form>
        </div>
      </div>

      {/* Navigation */}
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
                onClick={() => setCategoriesOpen(!categoriesOpen)}
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
                      onClick={() => setCategoriesOpen(false)}
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

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white animate-slide-up">
          <div className="p-4 space-y-2">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-3 rounded-xl hover:bg-sky-50 transition-colors font-medium"
            >
              الرئيسية
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-sky-50 transition-colors"
              >
                <span className="text-xl">{cat.icon}</span>
                <span>{cat.name}</span>
              </Link>
            ))}
            <hr className="my-2" />
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-4 py-3 rounded-xl hover:bg-sky-50 transition-colors"
            >
              <User size={18} />
              <span>تسجيل الدخول</span>
            </Link>
            <Link
              href="/sell"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-3 rounded-xl bg-orange-500 text-white text-center font-medium"
            >
              بيع منتج
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
