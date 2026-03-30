"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, Heart, ShoppingCart, User } from "lucide-react";
import { useCart } from "@/lib/CartContext";

const navItems = [
  { href: "/", icon: Home, label: "الرئيسية" },
  { href: "/search", icon: Search, label: "بحث" },
  { href: "/wishlist", icon: Heart, label: "المفضلة" },
  { href: "/cart", icon: ShoppingCart, label: "السلة", badge: true },
  { href: "/account", icon: User, label: "حسابي" },
];

export default function PremiumBottomNav() {
  const pathname = usePathname();
  const { totalItems } = useCart();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl border-t border-slate-200/50 dark:border-slate-700/50 safe-area-bottom"
      aria-label="التنقل السفلي"
    >
      <div className="flex items-center justify-around py-1">
        {navItems.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`relative flex flex-col items-center gap-0 px-4 py-1.5 rounded-2xl transition-all duration-200 min-w-[56px] ${
                active
                  ? "text-sky-600 dark:text-sky-400"
                  : "text-slate-400 dark:text-slate-500"
              }`}
              aria-label={item.label}
              aria-current={active ? "page" : undefined}
            >
              {/* Active indicator */}
              {active && (
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-sky-500 rounded-full" />
              )}

              <div className="relative">
                <item.icon
                  size={22}
                  strokeWidth={active ? 2.5 : 1.5}
                  aria-hidden="true"
                />
                {item.badge && totalItems > 0 && (
                  <span className="absolute -top-1.5 -right-2.5 bg-orange-500 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold shadow-sm">
                    {totalItems > 9 ? "9+" : totalItems}
                  </span>
                )}
              </div>
              <span
                className={`text-[10px] font-medium mt-0.5 ${
                  active ? "text-sky-600" : "text-slate-400"
                }`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
