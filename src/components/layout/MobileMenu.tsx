import Link from "next/link";
import { User } from "lucide-react";
import { categories } from "@/lib/categories";

export default function MobileMenu({
  onClose,
}: {
  onClose: () => void;
}) {
  return (
    <div className="md:hidden border-t border-slate-100 bg-white animate-slide-up">
      <div className="p-4 space-y-2">
        <Link
          href="/"
          onClick={onClose}
          className="block px-4 py-3 rounded-xl hover:bg-sky-50 transition-colors font-medium"
        >
          الرئيسية
        </Link>
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/category/${cat.slug}`}
            onClick={onClose}
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-sky-50 transition-colors"
          >
            <span className="text-xl">{cat.icon}</span>
            <span>{cat.name}</span>
          </Link>
        ))}
        <hr className="my-2" />
        <Link
          href="/login"
          onClick={onClose}
          className="flex items-center gap-2 px-4 py-3 rounded-xl hover:bg-sky-50 transition-colors"
        >
          <User size={18} />
          <span>تسجيل الدخول</span>
        </Link>
        <Link
          href="/sell"
          onClick={onClose}
          className="block px-4 py-3 rounded-xl bg-orange-500 text-white text-center font-medium"
        >
          بيع منتج
        </Link>
      </div>
    </div>
  );
}
