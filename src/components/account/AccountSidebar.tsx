"use client";

import Link from "next/link";
import Image from "next/image";
import {
  User,
  Package,
  Heart,
  MapPin,
  LogOut,
  Settings,
  Gift,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/contexts/ToastContext";

const navItems = [
  { icon: User, label: "معلوماتي", href: "/account" },
  { icon: Package, label: "طلباتي", href: "/account/orders" },
  { icon: Heart, label: "المفضلة", href: "/wishlist" },
  { icon: MapPin, label: "العناوين", href: "/account/addresses" },
  { icon: Gift, label: "نقاطي", href: "/account/points" },
  { icon: Settings, label: "الإعدادات", href: "/account/settings" },
];

export default function AccountSidebar() {
  const { user, logout } = useAuth();
  const { success } = useToast();
  const loyaltyPoints = 350;

  const handleLogout = () => {
    logout();
    success("تم تسجيل الخروج بنجاح");
  };

  return (
    <div className="card p-4 h-fit dark:bg-slate-800">
      <div className="text-center pb-4 border-b border-slate-100 dark:border-slate-700 mb-4">
        <div className="relative w-20 h-20 rounded-full bg-sky-100 flex items-center justify-center mx-auto mb-3 overflow-hidden">
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
        
        {/* Loyalty Points Badge */}
        <div className="mt-3 inline-flex items-center gap-2 px-4 py-1.5 bg-amber-50 dark:bg-amber-900/30 rounded-full">
          <Gift size={14} className="text-amber-500" />
          <span className="text-sm font-bold text-amber-700 dark:text-amber-400">
            {loyaltyPoints} نقطة
          </span>
        </div>
      </div>

      <nav className="space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-slate-600 dark:text-slate-300 hover:bg-sky-50 dark:hover:bg-slate-700 hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
          >
            <item.icon size={18} aria-hidden="true" />
            {item.label}
          </Link>
        ))}
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
        >
          <LogOut size={18} aria-hidden="true" />
          تسجيل الخروج
        </button>
      </nav>
    </div>
  );
}
