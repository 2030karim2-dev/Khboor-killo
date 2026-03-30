"use client";

import Link from "next/link";
import Image from "next/image";
import { useAdmin } from "@/lib/AdminContext";
import { Eye, Pencil, Trash2, Plus } from "lucide-react";
import ExcelTable, { type Column } from "@/components/admin/ExcelTable";
import { useToast } from "@/lib/ToastContext";
import type { Product } from "@/lib/types";

export default function AdminProducts() {
  const { products, deleteProduct } = useAdmin();
  const { warning, success } = useToast();

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
    { key: "price", header: "السعر", width: 110, render: (v) => <span className="font-bold">{(v as number).toLocaleString()} ر.س</span> },
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
        <button onClick={() => success("استخدم نموذج إضافة المنتج في لوحة البائع")} className="btn-primary text-sm">
          <Plus size={16} /> إضافة منتج
        </button>
      </div>
      <ExcelTable columns={columns} data={products} getRowId={(p) => p.id} searchPlaceholder="بحث في المنتجات..." pageSize={8} onRowClick={(p) => window.open(`/admin/products/${p.id}/edit`, "_blank")} />
    </div>
  );
}
