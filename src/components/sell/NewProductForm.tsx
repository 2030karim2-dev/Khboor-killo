"use client";

import { useState } from "react";
import { Loader2, Upload } from "lucide-react";
import { categories } from "@/lib";
import { useToast } from "@/lib/ToastContext";
import { FormTextarea, FormSelect, FormActions } from "@/components/ui/FormElements";
import FormField from "@/components/ui/FormField";

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
        <FormField label="اسم المنتج" name="name" required placeholder="أدخل اسم المنتج" />

        <FormSelect
          label="القسم"
          name="category"
          required
          options={categories.map((c) => ({ value: c.slug, label: `${c.icon} ${c.name}` }))}
        />

        <FormTextarea label="الوصف" name="description" rows={4} required placeholder="اكتب وصفاً تفصيلياً للمنتج..." />

        <div className="grid md:grid-cols-2 gap-4">
          <FormField label="السعر (ر.ي)" name="price" type="number" required placeholder="0.00" />
          <FormField label="السعر قبل الخصم (اختياري)" name="originalPrice" type="number" placeholder="0.00" />
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
