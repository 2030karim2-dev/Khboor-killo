"use client";

import Link from "next/link";
import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/lib/CartContext";
import { useAuth } from "@/lib/AuthContext";
import { TopBar, SearchBar, DesktopNav, MobileMenu, NotificationBell } from "@/components/layout";
import UserMenuDropdown from "@/components/layout/UserMenuDropdown";
import { MobileSearchTrigger } from "@/components/mobile";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const { totalItems } = useCart();
  const { isAuthenticated } = useAuth();

  return (
    <header className="sticky top-0 z-50 glass border-b border-slate-200">
      <TopBar />

      <div className="max-w-7xl mx-auto px-4 py-2">
        <div className="flex items-center justify-between gap-3">
          <Link href="/" className="flex items-center gap-1.5 shrink-0">
            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center text-white font-bold text-sm">خ</div>
            <div className="hidden sm:block">
              <h1 className="text-base font-bold text-slate-800 leading-tight">خبور</h1>
              <p className="text-[10px] text-slate-500 -mt-0.5">كل شيء في مكان واحد</p>
            </div>
          </Link>

          <SearchBar className="flex-1 max-w-2xl hidden md:block" />

          <div className="flex items-center gap-2 sm:gap-3">
            <Link href="/cart" className="relative p-2 rounded-xl hover:bg-slate-100 transition-colors" aria-label={`سلة التسوق${totalItems > 0 ? ` (${totalItems} منتجات)` : ""}`}>
              <ShoppingCart size={22} className="text-slate-700" />
              {totalItems > 0 && <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">{totalItems}</span>}
            </Link>

            {isAuthenticated && <NotificationBell />}

            {isAuthenticated ? (
              <UserMenuDropdown />
            ) : (
              <Link href="/login" className="hidden sm:flex items-center gap-1.5 p-2 rounded-xl hover:bg-slate-100 transition-colors text-slate-700">
                <span className="text-sm">تسجيل الدخول</span>
              </Link>
            )}

            <Link href="/sell" className="hidden md:inline-flex btn-secondary text-sm py-2">بيع منتج</Link>

            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 rounded-xl hover:bg-slate-100 transition-colors" aria-label={mobileMenuOpen ? "إغلاق القائمة" : "فتح القائمة"} aria-expanded={mobileMenuOpen}>
              {mobileMenuOpen ? <span className="text-slate-700 text-xl">✕</span> : <span className="text-slate-700 text-xl">☰</span>}
            </button>
          </div>
        </div>

        <div className="md:hidden mt-3">
          <MobileSearchTrigger />
        </div>
      </div>

      <DesktopNav categoriesOpen={categoriesOpen} onToggleCategories={() => setCategoriesOpen(!categoriesOpen)} />

      {mobileMenuOpen && (
        <>
          <div className="fixed inset-0 bg-black/30 z-40 md:hidden" onClick={() => setMobileMenuOpen(false)} aria-hidden="true" />
          <div className="fixed inset-y-0 right-0 w-72 bg-white z-50 md:hidden overflow-y-auto animate-slide-in-right shadow-2xl">
            <MobileMenu onClose={() => setMobileMenuOpen(false)} isAuthenticated={isAuthenticated} onLogout={() => setMobileMenuOpen(false)} />
          </div>
        </>
      )}
    </header>
  );
}
