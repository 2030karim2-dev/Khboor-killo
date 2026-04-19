"use client";

import { useState } from "react";
import { Paintbrush, Upload, MessageSquare, Check, ChevronRight, Send } from "lucide-react";
import { Breadcrumb } from "@/components/ui";

const categories = [
  { id: "auto", name: "قطع غيار مخصصة", icon: "🔧" },
  { id: "clothing", name: "ملابس مطبوعة", icon: "👕" },
  { id: "accessories", name: "إكسسوارات", icon: "💎" },
  { id: "other", name: "أخرى", icon: "✨" },
];

const processSteps = [
  { num: 1, title: "اختر الفئة", desc: "اختر نوع المنتج المخصص" },
  { num: 2, title: "ارفع التصميم", desc: "شارك مواصفات منتجك" },
  { num: 3, title: "العقد والسعر", desc: "سيتم التواصل معك" },
  { num: 4, title: "التنفيذ والتوصيل", desc: "صنع وتسليم المنتج" },
];

export default function CustomOrdersPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    category: "",
    productName: "",
    description: "",
    quantity: "",
    file: null as File | null,
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Breadcrumb items={[{ label: "الرئيسية", href: "/" }, { label: "طلبات مخصصة" }]} />

      {/* Header */}
      <div className="text-center mb-12">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center mx-auto mb-4">
          <Paintbrush size={40} className="text-white" />
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800 mb-2">طلبات مخصصة</h1>
        <p className="text-slate-500">
          هل تحتاج منتجاً محدداً؟ ارسل طلبك وسنعمل على تنفيذه according to your requirements.
        </p>
      </div>

      {/* Process Steps */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {processSteps.map((step) => (
          <div key={step.num} className="text-center">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sky-500 to-purple-500 flex items-center justify-center text-white font-bold mx-auto mb-2">
              {step.num}
            </div>
            <h3 className="font-bold text-slate-800 text-sm mb-1">{step.title}</h3>
            <p className="text-xs text-slate-500">{step.desc}</p>
          </div>
        ))}
      </div>

      {submitted ? (
        <div className="card p-8 text-center">
          <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
            <Check size={32} className="text-emerald-600" />
          </div>
          <h2 className="text-xl font-bold text-slate-800 mb-2">تم استلام طلبك!</h2>
          <p className="text-slate-500 mb-4">
            سيتواصل معك فريقنا خلال 24 hour للتأكد من التفاصيل
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="text-sky-600 hover:underline"
          >
            تقديم طلب آخر
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="card p-6 md:p-8">
          <h2 className="text-xl font-bold text-slate-800 mb-6">قدم طلبك</h2>

          {/* Category Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-700 mb-3">اختر الفئة</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    setFormData((prev) => ({ ...prev, category: cat.id }));
                  }}
                  className={`p-4 rounded-xl border-2 text-center transition-all ${
                    selectedCategory === cat.id
                      ? "border-sky-500 bg-sky-50 dark:bg-sky-900/20"
                      : "border-slate-200 dark:border-slate-700 hover:border-slate-300"
                  }`}
                >
                  <span className="text-2xl mb-2 block">{cat.icon}</span>
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{cat.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Product Name */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-700 mb-2">اسم المنتج</label>
            <input
              type="text"
              value={formData.productName}
              onChange={(e) => setFormData((prev) => ({ ...prev, productName: e.target.value }))}
              placeholder="مثال: فلتر زيت مطبوع بالشعار"
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 focus:border-sky-500 dark:focus:border-sky-400 focus:outline-none"
            />
          </div>

          {/* Description */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-700 mb-2">التفاصيل والمواصفات</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              placeholder="صف المنتج بالتفاصيل: الحجم، اللون، المواد، إلخ..."
              rows={4}
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 focus:border-sky-500 dark:focus:border-sky-400 focus:outline-none resize-none"
            />
          </div>

          {/* Quantity */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-700 mb-2">الكمية المطلوبة</label>
            <input
              type="number"
              value={formData.quantity}
              onChange={(e) => setFormData((prev) => ({ ...prev, quantity: e.target.value }))}
              placeholder="أقل طلب: 50 وحدة"
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 focus:border-sky-500 dark:focus:border-sky-400 focus:outline-none"
            />
          </div>

          {/* File Upload */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-700 mb-2">ملف التصميم (اختياري)</label>
            <div className="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl p-6 text-center">
              <Upload size={32} className="mx-auto mb-2 text-slate-400" />
              <p className="text-sm text-slate-500 mb-2">اسحب وأفلت الملف هنا أو</p>
              <label className="inline-block px-4 py-2 bg-slate-100 dark:bg-slate-700 rounded-lg text-sm cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">
                اختر ملف
                <input type="file" className="hidden" accept=".jpg,.png,.pdf,.ai,.psd" />
              </label>
              <p className="text-xs text-slate-400 mt-2">PNG, JPG, PDF, AI, PSD (max 10MB)</p>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-sky-500 to-purple-500 text-white rounded-xl font-bold hover:from-sky-600 hover:to-purple-600 transition-colors flex items-center justify-center gap-2"
          >
            <Send size={18} />
            إرسال الطلب
          </button>
        </form>
      )}
    </div>
  );
}