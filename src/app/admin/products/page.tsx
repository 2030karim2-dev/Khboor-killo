import Link from "next/link";
import Image from "next/image";
import { products, categories } from "@/lib";
import { Plus, Pencil, Trash2, Eye, Search } from "lucide-react";

export default function AdminProducts() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-extrabold text-slate-800 dark:text-white">المنتجات</h1>
          <p className="text-sm text-slate-500">{products.length} منتج</p>
        </div>
        <button className="btn-primary text-sm">
          <Plus size={16} />
          إضافة منتج
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4 flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            placeholder="بحث في المنتجات..."
            className="w-full py-2 pr-9 pl-3 rounded-lg border border-slate-200 dark:border-slate-600 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 bg-transparent"
          />
        </div>
        <select className="px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 text-sm bg-transparent">
          <option value="">جميع الأقسام</option>
          {categories.map((cat) => (
            <option key={cat.slug} value={cat.slug}>{cat.name}</option>
          ))}
        </select>
        <select className="px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 text-sm bg-transparent">
          <option>الحالة</option>
          <option>متوفر</option>
          <option>نفد المخزون</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-xs text-slate-500 text-right border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700/50">
                <th className="px-4 py-3 font-medium">المنتج</th>
                <th className="px-4 py-3 font-medium">القسم</th>
                <th className="px-4 py-3 font-medium">السعر</th>
                <th className="px-4 py-3 font-medium">التقييم</th>
                <th className="px-4 py-3 font-medium">الحالة</th>
                <th className="px-4 py-3 font-medium">الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {products.slice(0, 15).map((product) => (
                <tr key={product.id} className="border-b border-slate-100 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-700/30">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 relative rounded-lg overflow-hidden shrink-0">
                        <Image src={product.image} alt={product.name} fill sizes="40px" className="object-cover" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-800 dark:text-white">{product.name}</p>
                        <p className="text-xs text-slate-400">{product.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-400">{product.category}</td>
                  <td className="px-4 py-3">
                    <p className="text-sm font-bold text-slate-800 dark:text-white">{product.price.toLocaleString()} ر.س</p>
                    {product.originalPrice && (
                      <p className="text-xs text-slate-400 line-through">{product.originalPrice.toLocaleString()}</p>
                    )}
                  </td>
                  <td className="px-4 py-3 text-sm">⭐ {product.rating} ({product.reviews})</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${product.inStock ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"}`}>
                      {product.inStock ? "متوفر" : "نفد"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <button className="p-1.5 rounded-lg hover:bg-sky-50 text-slate-400 hover:text-sky-600" aria-label="عرض">
                        <Eye size={16} />
                      </button>
                      <button className="p-1.5 rounded-lg hover:bg-amber-50 text-slate-400 hover:text-amber-600" aria-label="تعديل">
                        <Pencil size={16} />
                      </button>
                      <button className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-600" aria-label="حذف">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
