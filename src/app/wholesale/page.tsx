"use client";

import { useState } from "react";
import { Building2, Users, Truck, Shield, Check, ChevronDown, ChevronUp, FileText, Calculator } from "lucide-react";
import { Breadcrumb } from "@/components/ui";

interface Tier {
  name: string;
  minOrder: number;
  discount: number;
  features: string[];
}

const tiers: Tier[] = [
  {
    name: "برونزي",
    minOrder: 5000,
    discount: 5,
    features: ["خصم 5%", "دعم فني", "شحن مخفض"],
  },
  {
    name: "فضي",
    minOrder: 15000,
    discount: 10,
    features: ["خصم 10%", "أولوية التوصيل", "مدفوعات مرنة", "دعم مخصص"],
  },
  {
    name: "ذهبي",
    minOrder: 50000,
    discount: 15,
    features: ["خصم 15%", "توصيل مجاني", "مدفوعات آجلة 30 يوم", "مدير حساب مخصص"],
  },
  {
    name: "ماسي",
    minOrder: 100000,
    discount: 20,
    features: ["خصم 20%", "أولوية كاملة", "منتجات حصرية", "أسعار الجملة"],
  },
];

const requirements = [
  "سجل تجاري ساري المفعول",
  "بطاقة ضريبية",
  " هوية صاحب العلاقة",
  "عنوان تجاري موثق",
];

export default function WholesalePage() {
  const [expandedTier, setExpandedTier] = useState<string | null>(null);
  const [orderAmount, setOrderAmount] = useState(10000);

  const calculateDiscount = (amount: number) => {
    const tier = tiers.find((t) => amount >= t.minOrder) || tiers[0];
    return (amount * tier.discount) / 100;
  };

  const selectedTier = tiers.find((t) => orderAmount >= t.minOrder) || tiers[0];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Breadcrumb items={[{ label: "الرئيسية", href: "/" }, { label: "المبيعات بالجملة" }]} />

      {/* Header */}
      <div className="text-center mb-12">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-sky-500 to-purple-600 flex items-center justify-center mx-auto mb-4">
          <Building2 size={40} className="text-white" />
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800 mb-2">المبيعات بالجملة</h1>
        <p className="text-slate-500 max-w-2xl mx-auto">
          انضم لبرنامج الجملة واحصل على خصومات حصرية تصل إلى 20% على جميع المنتجات. 
          نحن نوفر حلول مخصصة для businesses.
        </p>
      </div>

      {/* Benefits */}
      <div className="grid md:grid-cols-4 gap-4 mb-12">
        <div className="card p-5 text-center">
          <div className="w-12 h-12 rounded-xl bg-sky-100 dark:bg-sky-900/30 flex items-center justify-center mx-auto mb-3">
            <Users size={24} className="text-sky-600" />
          </div>
          <h3 className="font-bold text-slate-800 mb-1">عملاء مخصصون</h3>
          <p className="text-sm text-slate-500">مدير حساب شخصي لكل عميل</p>
        </div>
        <div className="card p-5 text-center">
          <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mx-auto mb-3">
            <Truck size={24} className="text-purple-600" />
          </div>
          <h3 className="font-bold text-slate-800 mb-1">توصيل سريع</h3>
          <p className="text-sm text-slate-500">شحن مجاني للطلبات الكبيرة</p>
        </div>
        <div className="card p-5 text-center">
          <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mx-auto mb-3">
            <Shield size={24} className="text-emerald-600" />
          </div>
          <h3 className="font-bold text-slate-800 mb-1">منتجات أصلية</h3>
          <p className="text-sm text-slate-500">ضمان على جميع المنتجات</p>
        </div>
        <div className="card p-5 text-center">
          <div className="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mx-auto mb-3">
            <Calculator size={24} className="text-amber-600" />
          </div>
          <h3 className="font-bold text-slate-800 mb-1">أسعار خاصة</h3>
          <p className="text-sm text-slate-500">خصومات تصل لـ 20%</p>
        </div>
      </div>

      {/* Pricing Calculator */}
      <div className="card p-6 md:p-8 mb-12">
        <h2 className="text-xl font-bold text-slate-800 mb-6 text-center">احسب وفرك</h2>
        <div className="max-w-md mx-auto">
          <label className="block text-sm text-slate-600 mb-2">قيمة الطلب المتوقعة</label>
          <div className="relative">
            <input
              type="number"
              value={orderAmount}
              onChange={(e) => setOrderAmount(Number(e.target.value))}
              className="w-full py-3 px-4 rounded-xl border border-slate-200 dark:border-slate-700 focus:border-sky-500 dark:focus:border-sky-400 focus:outline-none text-lg font-bold"
            />
            <span className="absolute start-4 top-1/2 -translate-y-1/2 text-slate-400">ر.ي</span>
          </div>
          <div className="mt-6 p-4 bg-gradient-to-r from-sky-50 to-purple-50 dark:from-sky-900/20 dark:to-purple-900/20 rounded-xl">
            <div className="flex justify-between items-center mb-2">
              <span className="text-slate-600">مستوى الخصم:</span>
              <span className="font-bold text-sky-600">{selectedTier.name}</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-slate-600">نسبة الخصم:</span>
              <span className="font-bold text-emerald-600">{selectedTier.discount}%</span>
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-slate-200 dark:border-slate-700">
              <span className="font-bold text-slate-800">التوفير:</span>
              <span className="text-2xl font-extrabold text-emerald-600">
                {calculateDiscount(orderAmount).toLocaleString("en")}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Tiers */}
      <div className="mb-12">
        <h2 className="text-xl font-bold text-slate-800 mb-6 text-center">فئات الجملة</h2>
        <div className="grid md:grid-cols-4 gap-4">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`card p-5 transition-all ${
                selectedTier.name === tier.name
                  ? "ring-2 ring-sky-500 bg-sky-50 dark:bg-sky-900/20"
                  : ""
              }`}
            >
              <div className="text-center mb-4">
                <h3 className="font-bold text-lg text-slate-800">{tier.name}</h3>
                <p className="text-sm text-slate-500">أقل طلب: {tier.minOrder.toLocaleString("en")} ر.ي</p>
                <p className="text-3xl font-extrabold text-sky-600 mt-2">{tier.discount}%</p>
                <p className="text-xs text-slate-400">خصم</p>
              </div>
              <button
                onClick={() => setExpandedTier(expandedTier === tier.name ? null : tier.name)}
                className="w-full flex items-center justify-center gap-2 text-sm text-sky-600 hover:underline"
              >
                {expandedTier === tier.name ? "إخفاء" : "عرض"} المميزات
                {expandedTier === tier.name ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              </button>
              {expandedTier === tier.name && (
                <ul className="mt-4 space-y-2 animate-fade-in">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-slate-600">
                      <Check size={14} className="text-emerald-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Requirements */}
      <div className="card p-6 md:p-8 mb-12">
        <h2 className="text-xl font-bold text-slate-800 mb-6 text-center">المطلوبات للتسجيل</h2>
        <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto">
          {requirements.map((req) => (
            <div key={req} className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
              <FileText size={18} className="text-sky-500" />
              <span className="text-slate-700 dark:text-slate-300">{req}</span>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="card p-8 text-center bg-gradient-to-r from-sky-500 to-purple-600">
        <h2 className="text-2xl font-bold text-white mb-2">ابدأ الآن</h2>
        <p className="text-white/80 mb-6">سجل في برنامج الجملة واستفد من جميع المميزات</p>
        <a
          href="/sell"
          className="inline-flex items-center gap-2 px-8 py-3 bg-white text-sky-600 rounded-xl font-bold hover:bg-sky-50 transition-colors"
        >
          <Building2 size={20} />
          تقدم بطلب
        </a>
      </div>
    </div>
  );
}