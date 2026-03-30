"use client";

import { use, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { notFound } from "next/navigation";
import Image from "next/image";
import { useAdmin } from "@/lib/AdminContext";
import { useToast } from "@/lib/ToastContext";
import { ArrowRight, Save, Upload } from "lucide-react";

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { products, updateProduct, categories } = useAdmin();
  const { success } = useToast();
  const router = useRouter();
  const product = products.find((p) => p.id === id);

  if (!product) notFound();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    updateProduct(id, {
      name: form.get("name") as string,
      description: form.get("description") as string,
      price: Number(form.get("price")),
      originalPrice: form.get("originalPrice") ? Number(form.get("originalPrice")) : undefined,
      categorySlug: form.get("category") as string,
      category: categories.find((c) => c.slug === form.get("category"))?.name || product.category,
      inStock: form.get("inStock") === "on",
    });
    success("تم حفظ التعديلات");
    router.push("/admin/products");
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/admin/products" className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700">
          <ArrowRight size={20} />
        </Link>
        <div>
          <h1 className="text-xl font-extrabold text-slate-800 dark:text-white">تعديل المنتج</h1>
          <p className="text-sm text-slate-500">{product.id}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Image */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
          <h2 className="font-bold text-slate-800 dark:text-white mb-4">صورة المنتج</h2>
          <div className="flex items-center gap-4">
            <div className="w-24 h-24 relative rounded-xl overflow-hidden bg-slate-100">
              <Image src={product.image} alt={product.name} fill sizes="96px" className="object-cover" />
            </div>
            <div className="border-2 border-dashed border-slate-200 dark:border-slate-600 rounded-xl p-6 text-center cursor-pointer hover:border-sky-400 transition-colors flex-1">
              <Upload size={24} className="text-slate-400 mx-auto mb-2" />
              <p className="text-sm text-slate-500">انقر لتغيير الصورة</p>
            </div>
          </div>
        </div>

        {/* Basic Info */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
          <h2 className="font-bold text-slate-800 dark:text-white mb-4">المعلومات الأساسية</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1.5">اسم المنتج</label>
              <input name="name" defaultValue={product.name} required className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500 bg-transparent" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">الوصف</label>
              <textarea name="description" rows={4} defaultValue={product.description} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500 bg-transparent resize-none" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">القسم</label>
              <select name="category" defaultValue={product.categorySlug} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500 bg-transparent">
                {categories.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* Pricing */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
          <h2 className="font-bold text-slate-800 dark:text-white mb-4">الأسعار</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1.5">السعر (ر.س)</label>
              <input name="price" type="number" defaultValue={product.price} required className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500 bg-transparent" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">السعر قبل الخصم</label>
              <input name="originalPrice" type="number" defaultValue={product.originalPrice} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500 bg-transparent" />
            </div>
          </div>
        </div>

        {/* Stock */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
          <label className="flex items-center justify-between cursor-pointer">
            <div><p className="font-bold text-slate-800 dark:text-white">متوفر في المخزون</p><p className="text-sm text-slate-500">هل المنتج متاح للبيع؟</p></div>
            <input type="checkbox" name="inStock" defaultChecked={product.inStock} className="accent-sky-500 w-5 h-5" />
          </label>
        </div>

        <div className="flex gap-3 justify-end">
          <Link href="/admin/products" className="btn-outline">إلغاء</Link>
          <button type="submit" className="btn-primary"><Save size={16} /> حفظ التعديلات</button>
        </div>
      </form>
    </div>
  );
}
