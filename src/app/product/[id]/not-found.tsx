import Link from "next/link";

export default function GlobalNotFound() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16 text-center animate-fade-in">
      <div className="text-8xl font-extrabold text-sky-500 mb-4">404</div>
      <h1 className="text-2xl font-extrabold text-slate-800 mb-3">
        المنتج غير موجود
      </h1>
      <p className="text-slate-500 mb-8">
        المنتج الذي تبحث عنه غير متوفر أو قد يكون محذوفاً.
      </p>
      <div className="flex gap-3 justify-center">
        <Link href="/" className="btn-primary">
          العودة للرئيسية
        </Link>
        <Link href="/search" className="btn-outline">
          البحث عن منتجات
        </Link>
      </div>
    </div>
  );
}
