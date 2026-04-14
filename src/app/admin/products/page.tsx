"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useAdmin } from "@/lib/AdminContext";
import { Eye, Pencil, Trash2, Plus, X, Upload } from "lucide-react";
import ExcelTable, { type Column } from "@/components/admin/ExcelTable";
import { useToast } from "@/lib/ToastContext";
import type { Product } from "@/lib/types";

export default function AdminProducts() {
  const { products, addProduct, deleteProduct, categories } = useAdmin();
  const { warning, success } = useToast();
  const router = useRouter();
  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddProduct = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const categorySlug = form.get("category") as string;
    addProduct({
      name: form.get("name") as string,
      description: form.get("description") as string || "",
      price: Number(form.get("price")),
      originalPrice: form.get("originalPrice") ? Number(form.get("originalPrice")) : undefined,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=400&fit=crop",
      category: categories.find((c) => c.slug === categorySlug)?.name || "",
      categorySlug,
      rating: 0,
      reviews: 0,
      inStock: form.get("inStock") === "on",
      featured: false,
    });
    success("تمت إضافة المنتج");
    setShowAddForm(false);
    (e.target as HTMLFormElement).reset();
  };

  const columns: Column<Product>[] = [
    {
      key: "name", header: "المنتج", width: 280,
      render: (v, row) => (
        <Link href={`/product/${row.id}`} className="flex items-center gap-3">
          <div className="w-10 h-10 relative rounded-lg overflow-hidden shrink-0 bg-slate-100">
            <Image src={row.image} alt={row.name} fill sizes="40px" className="object-cover" />
          </div>
          <div>
            <p className="font-medium text-slate-800 dark:text-white hover:text-sky-600">{row.name}</p>
            <p className="text-[10px] text-slate-400 font-mono">{row.id}</p>
          </div>
        </Link>
      ),
    },
    { key: "category", header: "القسم", width: 130 },
    { key: "price", header: "السعر", width: 110, render: (v) => <span className="font-bold">{(v as number).toLocaleString("en")} ر.ي</span> },
    { key: "rating", header: "التقييم", width: 100, render: (v, row) => `⭐ ${v} (${row.reviews})` },
    {
      key: "inStock", header: "الحالة", width: 100,
      render: (v) => (
        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${v ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"}`}>
          {v ? "متوفر" : "نفد"}
        </span>
      ),
    },
    {
      key: "actions", header: "إجراءات", width: 120, sortable: false,
      render: (_, row) => (
        <div className="flex items-center gap-1">
          <Link href={`/product/${row.id}`} className="p-1.5 rounded-lg hover:bg-sky-50 text-slate-400 hover:text-sky-600" aria-label="عرض">
            <Eye size={15} />
          </Link>
          <Link href={`/admin/products/${row.id}/edit`} className="p-1.5 rounded-lg hover:bg-amber-50 text-slate-400 hover:text-amber-600" aria-label="تعديل">
            <Pencil size={15} />
          </Link>
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (confirm(`حذف "${row.name}"؟`)) {
                deleteProduct(row.id);
                warning(`تم حذف "${row.name}"`);
              }
            }}
            className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-600"
            aria-label="حذف"
          >
            <Trash2 size={15} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-extrabold text-slate-800 dark:text-white">المنتجات</h1>
          <p className="text-sm text-slate-500">{products.length} منتج</p>
        </div>
        <button onClick={() => setShowAddForm(!showAddForm)} className="btn-primary text-sm">
          <Plus size={16} /> إضافة منتج
        </button>
      </div>

      {showAddForm && (
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 animate-slide-up">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-slate-800 dark:text-white">منتج جديد</h2>
            <button onClick={() => setShowAddForm(false)} className="p-1.5 rounded-lg hover:bg-slate-100"><X size={18} className="text-slate-500" /></button>
          </div>
          <form onSubmit={handleAddProduct} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div><label className="block text-sm font-medium mb-1.5">اسم المنتج</label><input name="name" required className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500 bg-transparent" /></div>
              <div><label className="block text-sm font-medium mb-1.5">القسم</label>
                <select name="category" required className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500 bg-transparent">
                  {categories.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}
                </select>
              </div>
              <div><label className="block text-sm font-medium mb-1.5">السعر (ر.ي)</label><input name="price" type="number" min={0} required className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500 bg-transparent" /></div>
              <div><label className="block text-sm font-medium mb-1.5">السعر قبل الخصم</label><input name="originalPrice" type="number" min={0} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500 bg-transparent" /></div>
            </div>
            <div><label className="block text-sm font-medium mb-1.5">الوصف</label><textarea name="description" rows={2} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500 bg-transparent resize-none" /></div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" name="inStock" defaultChecked className="accent-sky-500 w-4 h-4" />
              <span className="text-sm">متوفر في المخزون</span>
            </label>
            <div className="flex gap-3">
              <button type="submit" className="btn-primary text-sm">حفظ</button>
              <button type="button" onClick={() => setShowAddForm(false)} className="btn-outline text-sm">إلغاء</button>
            </div>
          </form>
        </div>
      )}

      <ExcelTable columns={columns} data={products} getRowId={(p) => p.id} searchPlaceholder="بحث في المنتجات..." pageSize={8} onRowClick={(p) => router.push(`/admin/products/${p.id}/edit`)} />
    </div>
  );
}
