"use client";

import Link from "next/link";
import { useState } from "react";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useCart } from "@/lib/CartContext";
import { useAuth } from "@/lib/AuthContext";
import { TopBar, SearchBar, DesktopNav, MobileMenu, NotificationBell } from "@/components/layout";
import UserMenuDropdown from "@/components/layout/UserMenuDropdown";
import SettingsDropdown from "@/components/layout/SettingsDropdown";
import { MobileSearchTrigger } from "@/components/mobile";
import FocusTrap from "@/components/ui/FocusTrap";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const { totalItems } = useCart();
  const { isAuthenticated } = useAuth();

  return (
    <header className="sticky top-0 z-50 glass-strong border-b border-slate-200/50 dark:border-slate-700/50">
      <div className="border-b border-slate-100 dark:border-slate-800">
        <TopBar />
      </div>

      <div className="max-w-7xl mx-auto px-3 md:px-4 py-2.5">
        <div className="flex items-center justify-between gap-3">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-sky-500/30">
              خ
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-extrabold text-slate-800 dark:text-white leading-tight">
                خبور
              </h1>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 -mt-0.5">كل شيء في مكان واحد</p>
            </div>
          </Link>

          <SearchBar className="flex-1 max-w-xl hidden md:block" />

          <div className="flex items-center gap-1.5 md:gap-2">
            <SettingsDropdown />
            
            <Link 
              href="/cart" 
              className="relative p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all group"
              aria-label={`سلة التسوق${totalItems > 0 ? ` (${totalItems} منتجات)` : ""}`}
            >
              <div className="relative">
                <ShoppingCart size={22} className="text-slate-700 dark:text-slate-300 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors" />
                {totalItems > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-gradient-to-r from-red-500 to-orange-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-lg">
                    {totalItems}
                  </span>
                )}
              </div>
            </Link>

            {isAuthenticated && <NotificationBell />}

            {isAuthenticated ? (
              <UserMenuDropdown />
            ) : (
              <Link 
                href="/login" 
                className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-sky-100 dark:hover:bg-sky-900/30 transition-colors text-slate-700 dark:text-slate-300 font-medium text-sm"
              >
                <span>تسجيل دخول</span>
              </Link>
            )}

            <Link 
              href="/sell" 
              className="hidden lg:inline-flex btn-secondary text-sm py-2.5 px-5"
            >
              بيع منتج
            </Link>

            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
              className="md:hidden p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label={mobileMenuOpen ? "إغلاق القائمة" : "فتح القائمة"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X size={24} className="text-slate-700 dark:text-slate-300" />
              ) : (
                <Menu size={24} className="text-slate-700 dark:text-slate-300" />
              )}
            </button>
          </div>
        </div>

        <div className="md:hidden mt-3">
          <MobileSearchTrigger />
        </div>
      </div>

      <DesktopNav 
        categoriesOpen={categoriesOpen} 
        onToggleCategories={() => setCategoriesOpen(!categoriesOpen)} 
      />

      {mobileMenuOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden animate-fade-in" 
            onClick={() => setMobileMenuOpen(false)} 
            aria-hidden="true" 
          />
          <FocusTrap active={mobileMenuOpen} onEscape={() => setMobileMenuOpen(false)}>
            <div 
              className="fixed inset-y-0 right-0 w-80 bg-white dark:bg-slate-900 z-50 md:hidden overflow-y-auto animate-slide-in-right shadow-2xl border-r border-slate-200 dark:border-slate-800"
              aria-modal="true" 
              role="dialog" 
              aria-label="القائمة"
            >
              <MobileMenu 
                onClose={() => setMobileMenuOpen(false)} 
                isAuthenticated={isAuthenticated} 
                onLogout={() => setMobileMenuOpen(false)} 
              />
            </div>
          </FocusTrap>
        </>
      )}
    </header>
  );
}