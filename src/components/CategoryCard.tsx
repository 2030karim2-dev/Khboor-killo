import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Category } from "@/lib/data";

export default function CategoryCard({ category }: { category: Category }) {
  return (
    <Link href={`/category/${category.slug}`} className="card group block">
      <div className="relative overflow-hidden aspect-[3/2]">
        <img
          src={category.image}
          alt={category.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-0 right-0 left-0 p-4">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl">{category.icon}</span>
            <h3 className="text-white text-lg font-bold">{category.name}</h3>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-white/80 text-sm">
              {category.productCount} منتج
            </p>
            <span className="flex items-center gap-1 text-white text-sm group-hover:text-sky-300 transition-colors">
              تصفح
              <ArrowLeft
                size={14}
                className="group-hover:-translate-x-1 transition-transform"
              />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
