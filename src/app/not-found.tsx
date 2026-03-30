import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-16 text-center animate-fade-in">
      <div className="text-8xl font-extrabold text-sky-500 mb-4">404</div>
      <h1 className="text-2xl font-extrabold text-slate-800 mb-3">
        الصفحة غير موجودة
      </h1>
      <p className="text-slate-500 mb-8">
        الصفحة التي تبحث عنها قد تكون محذوفة أو تم تغيير عنوانها.
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
