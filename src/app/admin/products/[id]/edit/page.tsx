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
  const [imageUrl, setImageUrl] = useState(product?.image || "");
  const [saving, setSaving] = useState(false);

  if (!product) notFound();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    const form = new FormData(e.currentTarget);
    const price = Number(form.get("price"));
    const originalPrice = form.get("originalPrice") ? Number(form.get("originalPrice")) : undefined;

    if (price < 0) {
      setSaving(false);
      return;
    }
    if (originalPrice !== undefined && originalPrice < price) {
      setSaving(false);
      return;
    }

    updateProduct(id, {
      name: form.get("name") as string,
      description: form.get("description") as string,
      price,
      originalPrice,
      image: imageUrl,
      categorySlug: form.get("category") as string,
      category: categories.find((c) => c.slug === form.get("category"))?.name || product.category,
      inStock: form.get("inStock") === "on",
      featured: form.get("featured") === "on",
      discount: originalPrice && originalPrice > price ? Math.round(((originalPrice - price) / originalPrice) * 100) : undefined,
    });
    success("تم حفظ التعديلات");
    setSaving(false);
    router.push("/admin/products");
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
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
              {imageUrl ? (
                <Image src={imageUrl} alt={product.name} fill sizes="96px" className="object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-2xl">📦</div>
              )}
            </div>
            <label className="border-2 border-dashed border-slate-200 dark:border-slate-600 rounded-xl p-6 text-center cursor-pointer hover:border-sky-400 transition-colors flex-1">
              <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              <Upload size={24} className="text-slate-400 mx-auto mb-2" />
              <p className="text-sm text-slate-500">انقر لتغيير الصورة</p>
            </label>
          </div>
          <div className="mt-3">
            <label className="block text-xs text-slate-500 mb-1">أو أدخل رابط الصورة</label>
            <input
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://..."
              className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500 bg-transparent text-sm"
              dir="ltr"
            />
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
              <label className="block text-sm font-medium mb-1.5">السعر (ر.ي)</label>
              <input name="price" type="number" min={0} defaultValue={product.price} required className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500 bg-transparent" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">السعر قبل الخصم</label>
              <input name="originalPrice" type="number" min={0} defaultValue={product.originalPrice} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500 bg-transparent" />
            </div>
          </div>
        </div>

        {/* Stock & Featured */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 space-y-4">
          <label className="flex items-center justify-between cursor-pointer">
            <div><p className="font-bold text-slate-800 dark:text-white">متوفر في المخزون</p><p className="text-sm text-slate-500">هل المنتج متاح للبيع؟</p></div>
            <input type="checkbox" name="inStock" defaultChecked={product.inStock} className="accent-sky-500 w-5 h-5" />
          </label>
          <label className="flex items-center justify-between cursor-pointer">
            <div><p className="font-bold text-slate-800 dark:text-white">منتج مميز</p><p className="text-sm text-slate-500">يظهر في قسم المنتجات المميزة</p></div>
            <input type="checkbox" name="featured" defaultChecked={product.featured} className="accent-sky-500 w-5 h-5" />
          </label>
        </div>

        <div className="flex gap-3 justify-end">
          <Link href="/admin/products" className="btn-outline">إلغاء</Link>
          <button type="submit" disabled={saving} className="btn-primary disabled:opacity-50"><Save size={16} /> {saving ? "جاري الحفظ..." : "حفظ التعديلات"}</button>
        </div>
      </form>
    </div>
  );
}
