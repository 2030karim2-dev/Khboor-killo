"use client";

import {
  User,
  Package,
  Heart,
  MapPin,
  CreditCard,
  LogOut,
  Settings,
} from "lucide-react";

const navItems = [
  { icon: User, label: "معلوماتي", active: true },
  { icon: Package, label: "طلباتي", active: false },
  { icon: Heart, label: "المفضلة", active: false },
  { icon: MapPin, label: "العناوين", active: false },
  { icon: CreditCard, label: "طرق الدفع", active: false },
  { icon: Settings, label: "الإعدادات", active: false },
];

export default function AccountSidebar() {
  return (
    <div className="card p-4 h-fit">
      <div className="text-center pb-4 border-b border-slate-100 mb-4">
        <div className="w-16 h-16 rounded-full bg-sky-100 flex items-center justify-center mx-auto mb-3">
          <User size={28} className="text-sky-600" />
        </div>
        <h2 className="font-bold text-slate-800">أحمد محمد</h2>
        <p className="text-sm text-slate-500">ahmed@email.com</p>
      </div>

      <nav className="space-y-1">
        {navItems.map((item) => (
          <button
            key={item.label}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition-colors ${
              item.active
                ? "bg-sky-50 text-sky-600 font-medium"
                : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            <item.icon size={18} />
            {item.label}
          </button>
        ))}
        <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-red-500 hover:bg-red-50 transition-colors">
          <LogOut size={18} />
          تسجيل الخروج
        </button>
      </nav>
    </div>
  );
}
