import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Category } from "@/types/product";

export default function CategoryCard({ category }: { category: Category }) {
  return (
    <Link 
      href={`/category/${category.slug}`} 
      className="group block animate-fade-in"
    >
      <div className="card overflow-hidden hover:border-sky-300 dark:hover:border-sky-600">
        <div className="relative overflow-hidden aspect-[3/2]">
          <Image
            src={category.image}
            alt={category.name}
            fill
            sizes="(max-width: 768px) 50vw, 20vw"
            className="object-cover group-hover:scale-110 transition-transform duration-500"
            loading="lazy"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          
          {/* Glow effect on hover */}
          <div className="absolute inset-0 bg-sky-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Content */}
          <div className="absolute bottom-0 right-0 left-0 p-5">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl filter drop-shadow-lg" aria-hidden="true">{category.icon}</span>
              <h3 className="text-white text-xl font-bold">{category.name}</h3>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-white/80 text-sm font-medium">
                {category.productCount} منتج
              </p>
              <span className="flex items-center gap-1.5 text-white text-sm font-semibold group-hover:text-sky-300 transition-colors bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full">
                تصفح
                <ArrowRight
                  size={14}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
