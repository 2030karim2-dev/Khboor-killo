import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Category } from "@/lib";

export default function CategoryCard({ category }: { category: Category }) {
  return (
    <Link href={`/category/${category.slug}`} className="card group block">
      <div className="relative overflow-hidden aspect-[3/2]">
        <Image
          src={category.image}
          alt={category.name}
          fill
          sizes="(max-width: 768px) 50vw, 20vw"
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-0 right-0 left-0 p-4">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl" aria-hidden="true">{category.icon}</span>
            <h3 className="text-white text-lg font-bold">{category.name}</h3>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-white/80 text-sm">
              {category.productCount} منتج
            </p>
            <span className="flex items-center gap-1 text-white text-sm group-hover:text-sky-300 transition-colors">
              تصفح
              <ArrowRight
                size={14}
                className="group-hover:translate-x-1 transition-transform"
              />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
