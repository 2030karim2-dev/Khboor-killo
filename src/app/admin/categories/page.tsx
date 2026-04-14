"use client";

import { useState } from "react";
import Image from "next/image";
import { useAdmin } from "@/lib/AdminContext";
import { Pencil, Trash2, Plus, Package } from "lucide-react";
import { useToast } from "@/lib/ToastContext";

export default function AdminCategories() {
  const { categories, addCategory, deleteCategory, products } = useAdmin();
  const { success, warning } = useToast();
  const [showForm, setShowForm] = useState(false);

  const handleAdd = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    addCategory({
      name: form.get("name") as string,
      description: form.get("description") as string,
      icon: form.get("icon") as string || "📦",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop",
    });
    success("تمت إضافة القسم");
    setShowForm(false);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-xl font-extrabold text-slate-800 dark:text-white">الأقسام</h1><p className="text-sm text-slate-500">{categories.length} أقسام</p></div>
        <button onClick={() => setShowForm(!showForm)} className="btn-primary text-sm"><Plus size={16} /> إضافة قسم</button>
      </div>

      {showForm && (
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 animate-slide-up">
          <h2 className="font-bold text-slate-800 dark:text-white mb-4">قسم جديد</h2>
          <form onSubmit={handleAdd} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div><label className="block text-sm font-medium mb-1.5">اسم القسم</label><input name="name" required className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500 bg-transparent" /></div>
              <div><label className="block text-sm font-medium mb-1.5">الأيقونة</label><input name="icon" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500 bg-transparent" placeholder="📦" /></div>
            </div>
            <div><label className="block text-sm font-medium mb-1.5">الوصف</label><textarea name="description" rows={2} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500 bg-transparent resize-none" /></div>
            <div className="flex gap-3">
              <button type="submit" className="btn-primary text-sm">حفظ</button>
              <button type="button" onClick={() => setShowForm(false)} className="btn-outline text-sm">إلغاء</button>
            </div>
          </form>
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((cat) => {
          const catProducts = products.filter((p) => p.categorySlug === cat.slug);
          return (
            <div key={cat.slug} className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
              <div className="relative h-32">
                <Image src={cat.image} alt={cat.name} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center"><span className="text-4xl">{cat.icon}</span></div>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-slate-800 dark:text-white">{cat.name}</h3>
                  <div className="flex gap-1">
                    <button className="p-1.5 rounded-lg hover:bg-amber-50 text-slate-400 hover:text-amber-600" aria-label={`تعديل ${cat.name}`}><Pencil size={14} /></button>
                    <button onClick={() => { if (confirm(`حذف "${cat.name}"؟`)) { deleteCategory(cat.slug); warning("تم الحذف"); }}} className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-600" aria-label={`حذف ${cat.name}`}><Trash2 size={14} /></button>
                  </div>
                </div>
                <p className="text-xs text-slate-500 mb-2">{cat.description}</p>
                <div className="flex items-center gap-2 text-xs text-slate-400"><Package size={14} /><span>{catProducts.length} منتج</span></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
