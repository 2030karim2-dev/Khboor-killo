"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, Upload, Plus, Package, DollarSign, TrendingUp } from "lucide-react";
import { categories } from "@/lib/data";

export default function SellPage() {
  const [activeTab, setActiveTab] = useState<"new" | "listings">("new");

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6">
        <Link href="/" className="hover:text-sky-600 transition-colors">
          الرئيسية
        </Link>
        <ChevronLeft size={14} />
        <span className="text-slate-800 font-medium">لوحة البائع</span>
      </nav>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="card p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-sky-50 flex items-center justify-center shrink-0">
            <Package size={22} className="text-sky-600" />
          </div>
          <div>
            <p className="text-2xl font-extrabold text-slate-800">12</p>
            <p className="text-sm text-slate-500">منتج نشط</p>
          </div>
        </div>
        <div className="card p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
            <DollarSign size={22} className="text-emerald-600" />
          </div>
          <div>
            <p className="text-2xl font-extrabold text-slate-800">4,520 ر.س</p>
            <p className="text-sm text-slate-500">إجمالي المبيعات</p>
          </div>
        </div>
        <div className="card p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center shrink-0">
            <TrendingUp size={22} className="text-orange-600" />
          </div>
          <div>
            <p className="text-2xl font-extrabold text-slate-800">28</p>
            <p className="text-sm text-slate-500">طلب هذا الشهر</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setActiveTab("new")}
          className={`px-5 py-2.5 rounded-xl font-medium text-sm transition-colors ${
            activeTab === "new"
              ? "bg-sky-500 text-white"
              : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
          }`}
        >
          <Plus size={16} className="inline-block ml-1" />
          إضافة منتج جديد
        </button>
        <button
          onClick={() => setActiveTab("listings")}
          className={`px-5 py-2.5 rounded-xl font-medium text-sm transition-colors ${
            activeTab === "listings"
              ? "bg-sky-500 text-white"
              : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
          }`}
        >
          <Package size={16} className="inline-block ml-1" />
          منتجاتي
        </button>
      </div>

      {activeTab === "new" ? (
        <div className="card p-6 md:p-8 animate-fade-in">
          <h2 className="text-xl font-bold text-slate-800 mb-6">
            إضافة منتج جديد
          </h2>
          <form className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                اسم المنتج
              </label>
              <input
                type="text"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-sky-500 focus:outline-none transition-colors text-right"
                placeholder="أدخل اسم المنتج"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                القسم
              </label>
              <select className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-sky-500 focus:outline-none transition-colors bg-white">
                <option value="">اختر القسم</option>
                {categories.map((cat) => (
                  <option key={cat.slug} value={cat.slug}>
                    {cat.icon} {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                الوصف
              </label>
              <textarea
                rows={4}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-sky-500 focus:outline-none transition-colors text-right resize-none"
                placeholder="اكتب وصفاً تفصيلياً للمنتج..."
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  السعر (ر.س)
                </label>
                <input
                  type="number"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-sky-500 focus:outline-none transition-colors"
                  placeholder="0.00"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  السعر قبل الخصم (اختياري)
                </label>
                <input
                  type="number"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-sky-500 focus:outline-none transition-colors"
                  placeholder="0.00"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                الكمية المتوفرة
              </label>
              <input
                type="number"
                className="w-full md:w-1/2 px-4 py-2.5 rounded-xl border border-slate-200 focus:border-sky-500 focus:outline-none transition-colors"
                placeholder="1"
              />
            </div>

            {/* Image upload */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                صور المنتج
              </label>
              <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center hover:border-sky-400 transition-colors cursor-pointer">
                <Upload
                  size={32}
                  className="text-slate-400 mx-auto mb-3"
                />
                <p className="text-slate-600 font-medium">
                  اسحب الصور هنا أو انقر للتحميل
                </p>
                <p className="text-sm text-slate-400 mt-1">
                  PNG, JPG حتى 5MB
                </p>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button type="submit" className="btn-primary py-3 text-base">
                نشر المنتج
              </button>
              <button type="button" className="btn-outline py-3 text-base">
                حفظ كمسودة
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="space-y-4 animate-fade-in">
          <h2 className="text-xl font-bold text-slate-800 mb-4">
            منتجاتي المعروضة
          </h2>
          {[
            { name: "تويوتا كامري 2024", price: "125,000", status: "نشط", views: 234 },
            { name: "طقم فرامل أصلي", price: "450", status: "نشط", views: 89 },
            { name: "بطارية سيارة 100 أمبير", price: "380", status: "قيد المراجعة", views: 45 },
          ].map((item, i) => (
            <div key={i} className="card p-4 flex items-center gap-4">
              <div className="w-16 h-16 bg-slate-100 rounded-xl shrink-0 flex items-center justify-center text-2xl">
                📦
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-slate-800">{item.name}</h3>
                <p className="text-sm text-slate-500">{item.price} ر.س</p>
              </div>
              <div className="text-left">
                <span
                  className={`text-xs font-medium px-2 py-1 rounded-full ${
                    item.status === "نشط"
                      ? "bg-emerald-50 text-emerald-600"
                      : "bg-amber-50 text-amber-600"
                  }`}
                >
                  {item.status}
                </span>
                <p className="text-xs text-slate-400 mt-1">
                  {item.views} مشاهدة
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
