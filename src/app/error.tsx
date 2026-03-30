"use client";

import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="max-w-2xl mx-auto px-4 py-16 text-center animate-fade-in">
      <div className="text-6xl mb-6">⚠️</div>
      <h1 className="text-2xl font-extrabold text-slate-800 mb-3">
        حدث خطأ غير متوقع
      </h1>
      <p className="text-slate-500 mb-2">
        نعتذر عن هذا الخطأ. يرجى المحاولة مرة أخرى.
      </p>
      {error.message && (
        <p className="text-sm text-red-500 bg-red-50 rounded-xl p-3 mb-6 max-w-md mx-auto">
          {error.message}
        </p>
      )}
      <div className="flex gap-3 justify-center">
        <button onClick={reset} className="btn-primary">
          إعادة المحاولة
        </button>
        <Link href="/" className="btn-outline">
          العودة للرئيسية
        </Link>
      </div>
    </div>
  );
}
