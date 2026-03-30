import Link from "next/link";
import { User, LogOut, Heart } from "lucide-react";
import { categories } from "@/lib";

export default function MobileMenu({
  onClose,
  isAuthenticated,
  userName,
  onLogout,
}: {
  onClose: () => void;
  isAuthenticated: boolean;
  userName?: string;
  onLogout: () => void;
}) {
  return (
    <nav aria-label="القائمة الرئيسية" className="p-4 space-y-2">
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
      {isAuthenticated ? (
        <>
          <Link
            href="/account"
            onClick={onClose}
            className="flex items-center gap-2 px-4 py-3 rounded-xl hover:bg-sky-50 transition-colors"
          >
            <User size={18} aria-hidden="true" />
            <span>{userName}</span>
          </Link>
          <Link
            href="/wishlist"
            onClick={onClose}
            className="flex items-center gap-2 px-4 py-3 rounded-xl hover:bg-sky-50 transition-colors"
          >
            <Heart size={18} aria-hidden="true" />
            <span>المفضلة</span>
          </Link>
          <button
            onClick={() => { onLogout(); onClose(); }}
            className="w-full flex items-center gap-2 px-4 py-3 rounded-xl hover:bg-red-50 text-red-600 transition-colors text-right"
          >
            <LogOut size={18} aria-hidden="true" />
            <span>تسجيل الخروج</span>
          </button>
        </>
      ) : (
        <Link
          href="/login"
          onClick={onClose}
          className="flex items-center gap-2 px-4 py-3 rounded-xl hover:bg-sky-50 transition-colors"
        >
          <User size={18} aria-hidden="true" />
          <span>تسجيل الدخول</span>
        </Link>
      )}
      <Link
        href="/sell"
        onClick={onClose}
        className="block px-4 py-3 rounded-xl bg-orange-500 text-white text-center font-medium"
      >
        بيع منتج
      </Link>
    </nav>
  );
}
