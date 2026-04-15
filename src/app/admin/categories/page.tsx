"use client";

import { useState } from "react";
import Image from "next/image";
import { useAdmin } from "@/contexts/AdminContext";
import { Pencil, Trash2, Plus, Package, X } from "lucide-react";
import { useToast } from "@/contexts/ToastContext";

export default function AdminCategories() {
  const { categories, addCategory, updateCategory, deleteCategory, products } = useAdmin();
  const { success, warning } = useToast();
  const [showForm, setShowForm] = useState(false);
  const [editingSlug, setEditingSlug] = useState<string | null>(null);

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

  const handleEdit = (e: React.FormEvent<HTMLFormElement>, slug: string) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    updateCategory(slug, {
      name: form.get("name") as string,
      description: form.get("description") as string,
      icon: form.get("icon") as string,
    });
    success("تم تعديل القسم");
    setEditingSlug(null);
  };

  const startEdit = (cat: { slug: string; name: string; description: string; icon: string }) => {
    setEditingSlug(cat.slug);
    setShowForm(false);
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
            <div key={cat.slug}>
              {editingSlug === cat.slug ? (
                <div className="bg-white dark:bg-slate-800 rounded-xl border border-amber-200 dark:border-amber-700 p-4 animate-slide-up">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-slate-800 dark:text-white">تعديل القسم</h3>
                    <button onClick={() => setEditingSlug(null)} className="p-1 rounded-lg hover:bg-slate-100"><X size={16} className="text-slate-500" /></button>
                  </div>
                  <form onSubmit={(e) => handleEdit(e, cat.slug)} className="space-y-3">
                    <input name="name" defaultValue={cat.name} required className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-transparent text-sm" />
                    <input name="icon" defaultValue={cat.icon} className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-transparent text-sm" />
                    <textarea name="description" defaultValue={cat.description} rows={2} className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-transparent resize-none text-sm" />
                    <div className="flex gap-2">
                      <button type="submit" className="btn-primary text-xs">حفظ</button>
                      <button type="button" onClick={() => setEditingSlug(null)} className="btn-outline text-xs">إلغاء</button>
                    </div>
                  </form>
                </div>
              ) : (
                <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
                  <div className="relative h-32">
                    <Image src={cat.image} alt={cat.name} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center"><span className="text-4xl">{cat.icon}</span></div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-slate-800 dark:text-white">{cat.name}</h3>
                      <div className="flex gap-1">
                        <button onClick={() => startEdit(cat)} className="p-1.5 rounded-lg hover:bg-amber-50 text-slate-400 hover:text-amber-600" aria-label={`تعديل ${cat.name}`}><Pencil size={14} /></button>
                        <button onClick={() => {
                          const catProductCount = products.filter((p) => p.categorySlug === cat.slug).length;
                          if (catProductCount > 0) {
                            warning(`لا يمكن حذف "${cat.name}" - يحتوي على ${catProductCount} منتج. انقل المنتجات أولاً.`);
                            return;
                          }
                          if (confirm(`حذف "${cat.name}"؟`)) { deleteCategory(cat.slug); success("تم الحذف"); }
                        }} className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-600" aria-label={`حذف ${cat.name}`}><Trash2 size={14} /></button>
                      </div>
                    </div>
                    <p className="text-xs text-slate-500 mb-2">{cat.description}</p>
                    <div className="flex items-center gap-2 text-xs text-slate-400"><Package size={14} /><span>{catProducts.length} منتج</span></div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
