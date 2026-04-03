"use client";

import { useState } from "react";
import { Loader2, Upload } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { categories } from "@/lib";
import { useToast } from "@/lib/ToastContext";
import { FormTextarea, FormSelect, FormActions } from "@/components/ui/FormElements";
import { productSchema } from "@/lib/validations";
import type { ProductInput } from "@/lib/validations";

export default function NewProductForm() {
  const { success, error: showError } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductInput>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      description: "",
      price: "",
      originalPrice: "",
      category: "",
    },
  });

  const onSubmit = async (data: ProductInput) => {
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1200));
    setIsSubmitting(false);
    success("تم نشر المنتج بنجاح!");
  };

  const onError = () => {
    showError("يرجى تصحيح الأخطاء في النموذج");
  };

  return (
    <div className="card p-6 md:p-8 animate-fade-in">
      <h2 className="text-xl font-bold text-slate-800 mb-6">إضافة منتج جديد</h2>
      <form onSubmit={handleSubmit(onSubmit, onError)} noValidate className="space-y-5">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1.5">
            اسم المنتج <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            type="text"
            {...register("name")}
            placeholder="أدخل اسم المنتج"
            aria-invalid={!!errors.name}
            className={`w-full px-4 py-2.5 rounded-xl border transition-colors text-right focus:outline-none ${
              errors.name ? "border-red-300 bg-red-50/50" : "border-slate-200 focus:border-sky-500"
            }`}
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-slate-700 mb-1.5">
            القسم <span className="text-red-500">*</span>
          </label>
          <select
            id="category"
            {...register("category")}
            aria-invalid={!!errors.category}
            className={`w-full px-4 py-2.5 rounded-xl border transition-colors focus:outline-none bg-white ${
              errors.category ? "border-red-300 bg-red-50/50" : "border-slate-200 focus:border-sky-500"
            }`}
          >
            <option value="">اختر القسم</option>
            {categories.map((c) => (
              <option key={c.slug} value={c.slug}>{c.icon} {c.name}</option>
            ))}
          </select>
          {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category.message}</p>}
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-slate-700 mb-1.5">
            الوصف <span className="text-red-500">*</span>
          </label>
          <textarea
            id="description"
            rows={4}
            {...register("description")}
            placeholder="اكتب وصفاً تفصيلياً للمنتج..."
            aria-invalid={!!errors.description}
            className={`w-full px-4 py-2.5 rounded-xl border transition-colors text-right resize-none focus:outline-none ${
              errors.description ? "border-red-300 bg-red-50/50" : "border-slate-200 focus:border-sky-500"
            }`}
          />
          {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-slate-700 mb-1.5">
              السعر (ر.ي) <span className="text-red-500">*</span>
            </label>
            <input
              id="price"
              type="number"
              {...register("price")}
              placeholder="0.00"
              aria-invalid={!!errors.price}
              className={`w-full px-4 py-2.5 rounded-xl border transition-colors focus:outline-none ${
                errors.price ? "border-red-300 bg-red-50/50" : "border-slate-200 focus:border-sky-500"
              }`}
            />
            {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price.message}</p>}
          </div>
          <div>
            <label htmlFor="originalPrice" className="block text-sm font-medium text-slate-700 mb-1.5">
              السعر قبل الخصم (اختياري)
            </label>
            <input
              id="originalPrice"
              type="number"
              {...register("originalPrice")}
              placeholder="0.00"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-sky-500 focus:outline-none transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">صور المنتج</label>
          <div
            className="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center hover:border-sky-400 transition-colors cursor-pointer"
            role="button"
            tabIndex={0}
            aria-label="تحميل صور المنتج"
          >
            <Upload size={32} className="text-slate-400 mx-auto mb-3" />
            <p className="text-slate-600 font-medium">اسحب الصور هنا أو انقر للتحميل</p>
            <p className="text-sm text-slate-400 mt-1">PNG, JPG حتى 5MB</p>
          </div>
        </div>

        <FormActions
          submitLabel="نشر المنتج"
          cancelLabel="حفظ كمسودة"
          isSubmitting={isSubmitting}
          loadingLabel="جاري النشر..."
        />
      </form>
    </div>
  );
}