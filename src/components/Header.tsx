"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { ShoppingCart, User, LogOut, Heart } from "lucide-react";
import { useCart } from "@/lib/CartContext";
import { useAuth } from "@/lib/AuthContext";
import { TopBar, SearchBar, DesktopNav, MobileMenu } from "@/components/layout";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { totalItems } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

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
              aria-label={`سلة التسوق${totalItems > 0 ? ` (${totalItems} منتجات)` : ""}`}
            >
              <ShoppingCart size={22} className="text-slate-700" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {totalItems}
                </span>
              )}
            </Link>

            {isAuthenticated ? (
              <div className="hidden sm:block relative" ref={userMenuRef}>
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-1.5 p-2 rounded-xl hover:bg-slate-100 transition-colors text-slate-700"
                  aria-expanded={userMenuOpen}
                  aria-haspopup="true"
                  aria-label="قائمة المستخدم"
                >
                  <User size={22} />
                  <span className="text-sm max-w-[80px] truncate">{user?.firstName}</span>
                </button>
                {userMenuOpen && (
                  <div className="absolute top-full left-0 mt-1 bg-white rounded-xl shadow-xl border border-slate-200 py-2 min-w-[180px] animate-fade-in z-50">
                    <Link
                      href="/account"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2 px-4 py-2.5 hover:bg-sky-50 text-sm"
                    >
                      <User size={16} />
                      حسابي
                    </Link>
                    <Link
                      href="/wishlist"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2 px-4 py-2.5 hover:bg-sky-50 text-sm"
                    >
                      <Heart size={16} />
                      المفضلة
                    </Link>
                    <hr className="my-1" />
                    <button
                      onClick={() => { logout(); setUserMenuOpen(false); }}
                      className="flex items-center gap-2 px-4 py-2.5 hover:bg-red-50 text-sm text-red-600 w-full text-right"
                    >
                      <LogOut size={16} />
                      تسجيل الخروج
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="hidden sm:flex items-center gap-1.5 p-2 rounded-xl hover:bg-slate-100 transition-colors text-slate-700"
              >
                <User size={22} />
                <span className="text-sm">تسجيل الدخول</span>
              </Link>
            )}

            <Link href="/sell" className="hidden md:inline-flex btn-secondary text-sm py-2">
              بيع منتج
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl hover:bg-slate-100 transition-colors"
              aria-label={mobileMenuOpen ? "إغلاق القائمة" : "فتح القائمة"}
              aria-expanded={mobileMenuOpen}
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

      {mobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/30 z-40 md:hidden"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
          <div className="fixed inset-y-0 right-0 w-72 bg-white z-50 md:hidden overflow-y-auto animate-slide-in-right shadow-2xl">
            <MobileMenu
              onClose={() => setMobileMenuOpen(false)}
              isAuthenticated={isAuthenticated}
              userName={user?.firstName}
              onLogout={logout}
            />
          </div>
        </>
      )}
    </header>
  );
}
