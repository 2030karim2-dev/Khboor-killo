"use client";

import Link from "next/link";
import {
  User,
  Package,
  Heart,
  MapPin,
  LogOut,
  Settings,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/contexts/ToastContext";

const navItems = [
  { icon: User, label: "معلوماتي", href: "/account" },
  { icon: Package, label: "طلباتي", href: "/account/orders" },
  { icon: Heart, label: "المفضلة", href: "/wishlist" },
  { icon: MapPin, label: "العناوين", href: "/account/addresses" },
  { icon: Settings, label: "الإعدادات", href: "/account/settings" },
];

export default function AccountSidebar() {
  const { user, logout } = useAuth();
  const { success } = useToast();

  const handleLogout = () => {
    logout();
    success("تم تسجيل الخروج بنجاح");
  };

  return (
    <div className="card p-4 h-fit">
      <div className="text-center pb-4 border-b border-slate-100 mb-4">
        <div className="w-16 h-16 rounded-full bg-sky-100 flex items-center justify-center mx-auto mb-3">
          <User size={28} className="text-sky-600" aria-hidden="true" />
        </div>
        <h2 className="font-bold text-slate-800">{user?.firstName} {user?.lastName}</h2>
        <p className="text-sm text-slate-500">{user?.email}</p>
      </div>

      <nav className="space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-slate-600 hover:bg-sky-50 hover:text-sky-600 transition-colors"
          >
            <item.icon size={18} aria-hidden="true" />
            {item.label}
          </Link>
        ))}
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-red-500 hover:bg-red-50 transition-colors"
        >
          <LogOut size={18} aria-hidden="true" />
          تسجيل الخروج
        </button>
      </nav>
    </div>
  );
}
