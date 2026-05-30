"use client";

import { Product } from "@/types/product";

interface ProductsReportProps {
  products: Product[];
  productData: {
    total: number;
    inStock: number;
    outOfStock: number;
    featured: number;
    topProducts: Product[];
  };
}

export default function ProductsReport({ productData }: ProductsReportProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCardItem label="إجمالي المنتجات" value={productData.total} />
        <StatCardItem label="متوفرة" value={productData.inStock} color="emerald" />
        <StatCardItem label="نفد المخزون" value={productData.outOfStock} color="red" />
        <StatCardItem label="مميزة" value={productData.featured} color="sky" />
      </div>
    </div>
  );
}

function StatCardItem({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color?: "emerald" | "sky" | "purple" | "red" | "amber";
}) {
  const colorClasses = {
    emerald: "text-emerald-600",
    sky: "text-sky-600",
    purple: "text-purple-600",
    red: "text-red-600",
    amber: "text-amber-500",
    default: "text-slate-800 dark:text-white",
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700">
      <p className="text-sm text-slate-500 mb-1">{label}</p>
      <p className={`text-2xl font-extrabold ${color ? colorClasses[color] : colorClasses.default}`}>
        {value}
      </p>
    </div>
  );
}