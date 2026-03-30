"use client";

import { Upload } from "lucide-react";
import { categories } from "@/lib/categories";

export default function NewProductForm() {
  return (
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

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            صور المنتج
          </label>
          <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center hover:border-sky-400 transition-colors cursor-pointer">
            <Upload size={32} className="text-slate-400 mx-auto mb-3" />
            <p className="text-slate-600 font-medium">
              اسحب الصور هنا أو انقر للتحميل
            </p>
            <p className="text-sm text-slate-400 mt-1">PNG, JPG حتى 5MB</p>
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
  );
}
