import Link from "next/link";
import { Category } from "@/lib/types";
import { Product } from "@/lib/types";
import ProductCard from "@/components/ProductCard";
import { ChevronLeft } from "lucide-react";

export default function CategorySection({
  category,
  products,
}: {
  category: Category;
  products: Product[];
}) {
  if (products.length === 0) return null;

  return (
    <section>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{category.icon}</span>
            <div>
              <h2 className="text-xl font-extrabold text-slate-800">
                {category.name}
              </h2>
              <p className="text-slate-500 text-sm">{category.description}</p>
            </div>
          </div>
          <Link
            href={`/category/${category.slug}`}
            className="flex items-center gap-1 text-sky-600 hover:text-sky-700 font-medium text-sm transition-colors"
          >
            عرض المزيد
            <ChevronLeft size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
