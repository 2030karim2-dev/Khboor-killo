"use client";

import { useState } from "react";
import { Loader2, Briefcase } from "lucide-react";
import { categories } from "@/lib";
import { useToast } from "@/lib/ToastContext";

const serviceCategories = categories.find((c) => c.slug === "services")?.subcategories || [];

export default function NewServiceForm() {
  const { success, error } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const title = form.get("title") as string;
    const category = form.get("category") as string;
    const description = form.get("description") as string;
    const price = form.get("price") as string;
    const location = form.get("location") as string;

    if (!title || !category || !description || !price || !location) {
      error("يرجى ملء جميع الحقول المطلوبة");
      return;
    }

    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1200));
    setIsSubmitting(false);
    success("تم نشر الخدمة بنجاح!");
    (e.target as HTMLFormElement).reset();
  };

  return (
    <div className="card p-6 md:p-8 animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center">
          <Briefcase size={20} className="text-orange-600" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-800">إضافة خدمة / مهنة جديدة</h2>
          <p className="text-sm text-slate-500">اعرض خدماتك ومهاراتك للعملاء</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="service-title" className="block text-sm font-medium text-slate-700 mb-1.5">
            عنوان الخدمة <span className="text-red-500">*</span>
          </label>
          <input
            id="service-title"
            name="title"
            type="text"
            required
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-sky-500 focus:outline-none transition-colors text-right"
            placeholder="مثال: سباك محترف - إصلاح جميع الأعطال"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="service-category" className="block text-sm font-medium text-slate-700 mb-1.5">
              التخصص <span className="text-red-500">*</span>
            </label>
            <select
              id="service-category"
              name="category"
              required
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-sky-500 focus:outline-none transition-colors bg-white"
            >
              <option value="">اختر التخصص</option>
              {serviceCategories.map((sub) => (
                <option key={sub.slug} value={sub.slug}>
                  {sub.icon} {sub.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="service-location" className="block text-sm font-medium text-slate-700 mb-1.5">
              الموقع <span className="text-red-500">*</span>
            </label>
            <input
              id="service-location"
              name="location"
              type="text"
              required
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-sky-500 focus:outline-none transition-colors text-right"
              placeholder="مثال: صنعاء - حي الحصبة"
            />
          </div>
        </div>

        <div>
          <label htmlFor="service-description" className="block text-sm font-medium text-slate-700 mb-1.5">
            وصف الخدمة <span className="text-red-500">*</span>
          </label>
          <textarea
            id="service-description"
            name="description"
            rows={4}
            required
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-sky-500 focus:outline-none transition-colors text-right resize-none"
            placeholder="اكتب وصفاً تفصيلياً عن خدماتك وخبراتك..."
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="service-price" className="block text-sm font-medium text-slate-700 mb-1.5">
              سعر الخدمة (ر.ي) <span className="text-red-500">*</span>
            </label>
            <input
              id="service-price"
              name="price"
              type="number"
              required
              min="1"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-sky-500 focus:outline-none transition-colors"
              placeholder="مثال: 5000"
            />
          </div>
          <div>
            <label htmlFor="service-phone" className="block text-sm font-medium text-slate-700 mb-1.5">
              رقم التواصل <span className="text-red-500">*</span>
            </label>
            <input
              id="service-phone"
              name="phone"
              type="tel"
              required
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-sky-500 focus:outline-none transition-colors"
              placeholder="77xxxxxxxx"
              dir="ltr"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">نوع التسعير</label>
          <div className="flex gap-4">
            {[
              { value: "fixed", label: "سعر ثابت" },
              { value: "hourly", label: "بالساعة" },
              { value: "daily", label: "باليوم" },
              { value: "negotiable", label: "قابل للتفاوض" },
            ].map((option) => (
              <label key={option.value} className="flex items-center gap-2 cursor-pointer text-sm">
                <input
                  type="radio"
                  name="pricing"
                  value={option.value}
                  defaultChecked={option.value === "fixed"}
                  className="accent-sky-500"
                />
                <span>{option.label}</span>
              </label>
            ))}
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
              "نشر الخدمة"
            )}
          </button>
          <button type="button" className="btn-outline py-3 text-base">
            حفظ كمسودة
          </button>
        </div>
      </form>
    </div>
  );
}
