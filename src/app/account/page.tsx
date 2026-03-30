"use client";

import Link from "next/link";
import {
  ChevronLeft,
  User,
  Package,
  Heart,
  MapPin,
  CreditCard,
  LogOut,
  Settings,
} from "lucide-react";

export default function AccountPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6">
        <Link href="/" className="hover:text-sky-600 transition-colors">
          الرئيسية
        </Link>
        <ChevronLeft size={14} />
        <span className="text-slate-800 font-medium">حسابي</span>
      </nav>

      <div className="grid md:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="card p-4 h-fit">
          {/* User info */}
          <div className="text-center pb-4 border-b border-slate-100 mb-4">
            <div className="w-16 h-16 rounded-full bg-sky-100 flex items-center justify-center mx-auto mb-3">
              <User size={28} className="text-sky-600" />
            </div>
            <h2 className="font-bold text-slate-800">أحمد محمد</h2>
            <p className="text-sm text-slate-500">ahmed@email.com</p>
          </div>

          {/* Nav */}
          <nav className="space-y-1">
            {[
              { icon: User, label: "معلوماتي", active: true },
              { icon: Package, label: "طلباتي", active: false },
              { icon: Heart, label: "المفضلة", active: false },
              { icon: MapPin, label: "العناوين", active: false },
              { icon: CreditCard, label: "طرق الدفع", active: false },
              { icon: Settings, label: "الإعدادات", active: false },
            ].map((item) => (
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

        {/* Content */}
        <div className="md:col-span-3">
          <div className="card p-6 md:p-8">
            <h2 className="text-xl font-bold text-slate-800 mb-6">
              المعلومات الشخصية
            </h2>
            <form className="space-y-5">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    الاسم الأول
                  </label>
                  <input
                    type="text"
                    defaultValue="أحمد"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-sky-500 focus:outline-none transition-colors text-right"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    الاسم الأخير
                  </label>
                  <input
                    type="text"
                    defaultValue="محمد"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-sky-500 focus:outline-none transition-colors text-right"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  البريد الإلكتروني
                </label>
                <input
                  type="email"
                  defaultValue="ahmed@email.com"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-sky-500 focus:outline-none transition-colors"
                  dir="ltr"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  رقم الجوال
                </label>
                <input
                  type="tel"
                  defaultValue="0501234567"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-sky-500 focus:outline-none transition-colors"
                  dir="ltr"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  المدينة
                </label>
                <select className="w-full md:w-1/2 px-4 py-2.5 rounded-xl border border-slate-200 focus:border-sky-500 focus:outline-none transition-colors bg-white">
                  <option>الرياض</option>
                  <option>جدة</option>
                  <option>الدمام</option>
                </select>
              </div>
              <button type="submit" className="btn-primary">
                حفظ التغييرات
              </button>
            </form>
          </div>

          {/* Recent orders */}
          <div className="card p-6 md:p-8 mt-6">
            <h2 className="text-xl font-bold text-slate-800 mb-6">
              آخر الطلبات
            </h2>
            <div className="space-y-4">
              {[
                { id: "KH12345678", date: "2024-01-15", total: "1,450 ر.س", status: "تم التوصيل" },
                { id: "KH12345677", date: "2024-01-10", total: "380 ر.س", status: "قيد الشحن" },
                { id: "KH12345676", date: "2024-01-05", total: "599 ر.س", status: "جاري التجهيز" },
              ].map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between p-4 rounded-xl bg-slate-50"
                >
                  <div>
                    <p className="font-bold text-slate-800">#{order.id}</p>
                    <p className="text-sm text-slate-500">{order.date}</p>
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-slate-800">{order.total}</p>
                    <span
                      className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                        order.status === "تم التوصيل"
                          ? "bg-emerald-50 text-emerald-600"
                          : order.status === "قيد الشحن"
                            ? "bg-sky-50 text-sky-600"
                            : "bg-amber-50 text-amber-600"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
