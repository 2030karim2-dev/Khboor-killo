"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, ShoppingCart, User, Heart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

const navItems = [
  { href: "/", icon: Home, label: "الرئيسية" },
  { href: "/search", icon: Search, label: "بحث" },
  { href: "/wishlist", icon: Heart, label: "المفضلة" },
  { href: "/cart", icon: ShoppingCart, label: "السلة", badge: true },
  { href: "/account", icon: User, label: "حسابي" },
];

export default function BottomNav() {
  const pathname = usePathname();
  const { totalItems } = useCart();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white border-t border-slate-200 safe-area-bottom"
      aria-label="التنقل السفلي"
    >
      <div className="flex items-center justify-around py-1.5">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-colors min-w-[56px] ${
              isActive(item.href) ? "text-sky-600" : "text-slate-400"
            }`}
            aria-label={item.label}
            aria-current={isActive(item.href) ? "page" : undefined}
          >
            <div className="relative">
              <item.icon size={22} aria-hidden="true" />
              {item.badge && totalItems > 0 && (
                <span className="absolute -top-1.5 -right-2.5 bg-orange-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {totalItems > 9 ? "9+" : totalItems}
                </span>
              )}
            </div>
            <span className="text-[10px] font-medium">{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
