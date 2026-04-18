"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  User,
  Package,
  Heart,
  MapPin,
  LogOut,
  Settings,
  Gift,
  Bell,
  ChevronRight,
  CreditCard,
  Star,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/contexts/ToastContext";
import { useReferral } from "@/contexts/ReferralContext";
import { useNotifications } from "@/contexts/NotificationsContext";
import { useOrders } from "@/contexts/OrderContext";

interface NavSection {
  id: string;
  title: string;
  items: NavItem[];
  badge?: number;
  defaultOpen?: boolean;
}

interface NavItem {
  label: string;
  href: string;
  icon: typeof User;
  badge?: number;
}

const accountSections: NavSection[] = [
  {
    id: "account",
    title: "حسابي",
    items: [
      { label: "معلوماتي", href: "/account", icon: User },
      { label: "طلباتي", href: "/account/orders", icon: Package },
      { label: "المفضلة", href: "/wishlist", icon: Heart },
      { label: "العناوين", href: "/account/addresses", icon: MapPin },
    ],
  },
  {
    id: "rewards",
    title: "مكافآتي",
    defaultOpen: true,
    items: [
      { label: "نقاطي", href: "/account/points", icon: Gift },
      { label: "سجل الشراء", href: "/account/points", icon: CreditCard },
    ],
  },
  {
    id: "settings",
    title: "الإعدادات",
    items: [
      { label: "الإعدادات", href: "/account/settings", icon: Settings },
      { label: "تقييماتي", href: "/account/reviews", icon: Star },
    ],
  },
];

export default function AccountSidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const { success } = useToast();
  const { stats: referralStats } = useReferral();
  const { notifications } = useNotifications();
  const { orders } = useOrders();
  
  const loyaltyPoints = referralStats.totalPointsEarned || 350;
  const pendingOrders = orders.filter((o) => o.status === "pending" || o.status === "confirmed").length;
  const unreadNotifications = notifications.filter((n) => !n.read).length;

  const isActive = (href: string) => pathname === href;
  const isActiveSection = (hrefs: string[]) => hrefs.includes(pathname);

  const handleLogout = () => {
    logout();
    success("تم تسجيل الخروج بنجاح");
  };

  return (
    <div className="card p-4 h-fit dark:bg-slate-800">
      {/* Profile Header */}
      <div className="text-center pb-4 border-b border-slate-100 dark:border-slate-700 mb-4">
        <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-sky-100 to-purple-100 flex items-center justify-center mx-auto mb-3 overflow-hidden">
          {user?.avatar ? (
            <Image
              src={user.avatar}
              alt={user.firstName}
              fill
              className="object-cover"
            />
          ) : (
            <User size={36} className="text-sky-600" aria-hidden="true" />
          )}
        </div>
        <h2 className="font-bold text-slate-800 dark:text-white">
          {user?.firstName} {user?.lastName}
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">{user?.email}</p>
        
        {/* Loyalty Points Badge - Dynamic */}
        <Link 
          href="/account/points"
          className="mt-3 inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/30 dark:to-orange-900/30 rounded-full hover:from-amber-100 hover:to-orange-100 dark:hover:from-amber-900/50 dark:hover:to-orange-900/50 transition-colors"
        >
          <Gift size={14} className="text-amber-500" />
          <span className="text-sm font-bold text-amber-700 dark:text-amber-400">
            {loyaltyPoints} نقطة
          </span>
          <ChevronRight size={12} className="text-amber-400" />
        </Link>
      </div>

      {/* Navigation Sections */}
      <nav className="space-y-2" aria-label="التنقل في الحساب">
        {accountSections.map((section) => (
          <div key={section.id}>
            <h3 className="px-2 py-2 text-xs font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wider">
              {section.title}
            </h3>
            <div className="space-y-1">
              {section.items.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${
                      active
                        ? "bg-gradient-to-r from-sky-50 to-transparent dark:from-sky-900/30 text-sky-600 dark:text-sky-400 font-medium"
                        : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-slate-800 dark:hover:text-slate-200"
                    }`}
                  >
                    <item.icon 
                      size={18} 
                      className={active ? "text-sky-500" : "text-slate-400"}
                      aria-hidden="true" 
                    />
                    <span className="flex-1">{item.label}</span>
                    {item.label === "طلباتي" && pendingOrders > 0 && (
                      <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold min-w-[20px] text-center">
                        {pendingOrders}
                      </span>
                    )}
                    {item.label === "الإعدادات" && unreadNotifications > 0 && (
                      <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold min-w-[20px] text-center">
                        {unreadNotifications}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 mt-4 rounded-xl text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors border-t border-slate-100 dark:border-slate-700 pt-4"
        >
          <LogOut size={18} aria-hidden="true" />
          تسجيل الخروج
        </button>
      </nav>
    </div>
  );
}