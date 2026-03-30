"use client";

import Link from "next/link";
import { useState } from "react";
import { ShoppingCart, User } from "lucide-react";
import { useCart } from "@/lib/CartContext";
import { TopBar, SearchBar, DesktopNav, MobileMenu } from "@/components/layout";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const { totalItems } = useCart();

  return (
    <header className="sticky top-0 z-50 glass border-b border-slate-200">
      <TopBar />

      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center text-white font-bold text-xl">
              خ
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-slate-800">خبور</h1>
              <p className="text-xs text-slate-500 -mt-0.5">كل شيء في مكان واحد</p>
            </div>
          </Link>

          <SearchBar className="flex-1 max-w-2xl hidden md:block" />

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
                <span className="text-slate-700 text-xl">✕</span>
              ) : (
                <span className="text-slate-700 text-xl">☰</span>
              )}
            </button>
          </div>
        </div>

        <div className="md:hidden mt-3">
          <SearchBar />
        </div>
      </div>

      <DesktopNav
        categoriesOpen={categoriesOpen}
        onToggleCategories={() => setCategoriesOpen(!categoriesOpen)}
      />

      {mobileMenuOpen && <MobileMenu onClose={() => setMobileMenuOpen(false)} />}
    </header>
  );
}
