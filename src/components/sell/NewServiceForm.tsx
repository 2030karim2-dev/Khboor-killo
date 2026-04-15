"use client";

import { useState } from "react";
import { Loader2, Briefcase } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { categories } from "@/data/categories";
import { useToast } from "@/contexts/ToastContext";
import { serviceSchema } from "@/utils/validations";
import type { ServiceInput } from "@/utils/validations";

const serviceCategories = categories.find((c) => c.slug === "services")?.subcategories || [];

export default function NewServiceForm() {
  const { success, error: showError } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ServiceInput>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      title: "",
      category: "",
      description: "",
      price: "",
      location: "",
      phone: "",
      pricingType: "fixed",
    },
  });

  const onSubmit = async (data: ServiceInput) => {
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1200));
    setIsSubmitting(false);
    success("تم نشر الخدمة بنجاح!");
  };

  const onError = () => {
    showError("يرجى تصحيح الأخطاء في النموذج");
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

      <form onSubmit={handleSubmit(onSubmit, onError)} noValidate className="space-y-5">
        <div>
          <label htmlFor="service-title" className="block text-sm font-medium text-slate-700 mb-1.5">
            عنوان الخدمة <span className="text-red-500">*</span>
          </label>
          <input
            id="service-title"
            type="text"
            {...register("title")}
            aria-invalid={!!errors.title}
            className={`w-full px-4 py-2.5 rounded-xl border transition-colors text-right focus:outline-none ${
              errors.title ? "border-red-300 bg-red-50/50" : "border-slate-200 focus:border-sky-500"
            }`}
            placeholder="مثال: سباك محترف - إصلاح جميع الأعطال"
          />
          {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="service-category" className="block text-sm font-medium text-slate-700 mb-1.5">
              التخصص <span className="text-red-500">*</span>
            </label>
            <select
              id="service-category"
              {...register("category")}
              aria-invalid={!!errors.category}
              className={`w-full px-4 py-2.5 rounded-xl border transition-colors focus:outline-none bg-white ${
                errors.category ? "border-red-300 bg-red-50/50" : "border-slate-200 focus:border-sky-500"
              }`}
            >
              <option value="">اختر التخصص</option>
              {serviceCategories.map((sub) => (
                <option key={sub.slug} value={sub.slug}>
                  {sub.icon} {sub.name}
                </option>
              ))}
            </select>
            {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category.message}</p>}
          </div>
          <div>
            <label htmlFor="service-location" className="block text-sm font-medium text-slate-700 mb-1.5">
              الموقع <span className="text-red-500">*</span>
            </label>
            <input
              id="service-location"
              type="text"
              {...register("location")}
              aria-invalid={!!errors.location}
              className={`w-full px-4 py-2.5 rounded-xl border transition-colors text-right focus:outline-none ${
                errors.location ? "border-red-300 bg-red-50/50" : "border-slate-200 focus:border-sky-500"
              }`}
              placeholder="مثال: صنعاء - حي الحصبة"
            />
            {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location.message}</p>}
          </div>
        </div>

        <div>
          <label htmlFor="service-description" className="block text-sm font-medium text-slate-700 mb-1.5">
            وصف الخدمة <span className="text-red-500">*</span>
          </label>
          <textarea
            id="service-description"
            rows={4}
            {...register("description")}
            aria-invalid={!!errors.description}
            className={`w-full px-4 py-2.5 rounded-xl border transition-colors text-right resize-none focus:outline-none ${
              errors.description ? "border-red-300 bg-red-50/50" : "border-slate-200 focus:border-sky-500"
            }`}
            placeholder="اكتب وصفاً تفصيلياً عن خدماتك وخبراتك..."
          />
          {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="service-price" className="block text-sm font-medium text-slate-700 mb-1.5">
              سعر الخدمة (ر.ي) <span className="text-red-500">*</span>
            </label>
            <input
              id="service-price"
              type="number"
              {...register("price")}
              aria-invalid={!!errors.price}
              className={`w-full px-4 py-2.5 rounded-xl border transition-colors focus:outline-none ${
                errors.price ? "border-red-300 bg-red-50/50" : "border-slate-200 focus:border-sky-500"
              }`}
              placeholder="مثال: 5000"
            />
            {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price.message}</p>}
          </div>
          <div>
            <label htmlFor="service-phone" className="block text-sm font-medium text-slate-700 mb-1.5">
              رقم التواصل <span className="text-red-500">*</span>
            </label>
            <input
              id="service-phone"
              type="tel"
              {...register("phone")}
              dir="ltr"
              aria-invalid={!!errors.phone}
              className={`w-full px-4 py-2.5 rounded-xl border transition-colors focus:outline-none ${
                errors.phone ? "border-red-300 bg-red-50/50" : "border-slate-200 focus:border-sky-500"
              }`}
              placeholder="77xxxxxxxx"
            />
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">نوع التسعير</label>
          <div className="flex gap-4 flex-wrap">
            {[
              { value: "fixed" as const, label: "سعر ثابت" },
              { value: "hourly" as const, label: "بالساعة" },
              { value: "daily" as const, label: "باليوم" },
              { value: "negotiable" as const, label: "قابل للتفاوض" },
            ].map((option) => (
              <label key={option.value} className="flex items-center gap-2 cursor-pointer text-sm">
                <input
                  type="radio"
                  {...register("pricingType")}
                  value={option.value}
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