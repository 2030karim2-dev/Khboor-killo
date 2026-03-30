"use client";

import { useState } from "react";
import { Upload, Loader2 } from "lucide-react";
import { categories } from "@/lib";
import { useToast } from "@/lib/ToastContext";

export default function NewProductForm() {
  const { success, error } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = form.get("name") as string;
    const category = form.get("category") as string;
    const description = form.get("description") as string;
    const price = form.get("price") as string;

    if (!name || !category || !description || !price) {
      error("يرجى ملء جميع الحقول المطلوبة");
      return;
    }

    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1200));
    setIsSubmitting(false);
    success("تم نشر المنتج بنجاح!");
    (e.target as HTMLFormElement).reset();
  };

  return (
    <div className="card p-6 md:p-8 animate-fade-in">
      <h2 className="text-xl font-bold text-slate-800 mb-6">إضافة منتج جديد</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="product-name" className="block text-sm font-medium text-slate-700 mb-1.5">
            اسم المنتج <span className="text-red-500">*</span>
          </label>
          <input
            id="product-name"
            name="name"
            type="text"
            required
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-sky-500 focus:outline-none transition-colors text-right"
            placeholder="أدخل اسم المنتج"
          />
        </div>

        <div>
          <label htmlFor="product-category" className="block text-sm font-medium text-slate-700 mb-1.5">
            القسم <span className="text-red-500">*</span>
          </label>
          <select
            id="product-category"
            name="category"
            required
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-sky-500 focus:outline-none transition-colors bg-white"
          >
            <option value="">اختر القسم</option>
            {categories.map((cat) => (
              <option key={cat.slug} value={cat.slug}>{cat.icon} {cat.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="product-description" className="block text-sm font-medium text-slate-700 mb-1.5">
            الوصف <span className="text-red-500">*</span>
          </label>
          <textarea
            id="product-description"
            name="description"
            rows={4}
            required
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-sky-500 focus:outline-none transition-colors text-right resize-none"
            placeholder="اكتب وصفاً تفصيلياً للمنتج..."
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="product-price" className="block text-sm font-medium text-slate-700 mb-1.5">
              السعر (ر.س) <span className="text-red-500">*</span>
            </label>
            <input
              id="product-price"
              name="price"
              type="number"
              required
              min="1"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-sky-500 focus:outline-none transition-colors"
              placeholder="0.00"
            />
          </div>
          <div>
            <label htmlFor="product-original-price" className="block text-sm font-medium text-slate-700 mb-1.5">
              السعر قبل الخصم (اختياري)
            </label>
            <input
              id="product-original-price"
              name="originalPrice"
              type="number"
              min="1"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-sky-500 focus:outline-none transition-colors"
              placeholder="0.00"
            />
          </div>
        </div>

        <div>
          <label htmlFor="product-quantity" className="block text-sm font-medium text-slate-700 mb-1.5">
            الكمية المتوفرة
          </label>
          <input
            id="product-quantity"
            name="quantity"
            type="number"
            min="1"
            defaultValue="1"
            className="w-full md:w-1/2 px-4 py-2.5 rounded-xl border border-slate-200 focus:border-sky-500 focus:outline-none transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">صور المنتج</label>
          <div
            className="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center hover:border-sky-400 transition-colors cursor-pointer"
            role="button"
            tabIndex={0}
            aria-label="تحميل صور المنتج"
          >
            <Upload size={32} className="text-slate-400 mx-auto mb-3" aria-hidden="true" />
            <p className="text-slate-600 font-medium">اسحب الصور هنا أو انقر للتحميل</p>
            <p className="text-sm text-slate-400 mt-1">PNG, JPG حتى 5MB</p>
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary py-3 text-base disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <><Loader2 size={18} className="animate-spin" /> جاري النشر...</>
            ) : (
              "نشر المنتج"
            )}
          </button>
          <button type="button" className="btn-outline py-3 text-base">حفظ كمسودة</button>
        </div>
      </form>
    </div>
  );
}
