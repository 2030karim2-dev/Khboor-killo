"use client";

import { Cairo, Tajawal } from "next/font/google";
import Link from "next/link";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic"],
  weight: ["700", "800"],
  display: "swap",
});

const tajawal = Tajawal({
  variable: "--font-tajawal",
  subsets: ["arabic"],
  weight: ["400", "500"],
  display: "swap",
});

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${cairo.variable} ${tajawal.variable} antialiased font-sans bg-slate-50`}>
        <div className="min-h-screen flex items-center justify-center px-4">
          <div className="text-center max-w-md">
            <div className="text-6xl mb-6">💥</div>
            <h1 className="text-2xl font-extrabold text-slate-800 mb-3">خطأ حرج في التطبيق</h1>
            <p className="text-slate-500 mb-6">حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.</p>
            <div className="flex gap-3 justify-center">
              <button onClick={reset} className="px-6 py-3 bg-sky-500 text-white rounded-xl font-bold hover:bg-sky-600 transition-colors">
                إعادة المحاولة
              </button>
              <Link href="/" className="px-6 py-3 border-2 border-sky-500 text-sky-600 rounded-xl font-bold hover:bg-sky-50 transition-colors">
                الرئيسية
              </Link>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
