"use client";

import { useState } from "react";
import { useToast } from "@/lib/ToastContext";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const { success, error } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) {
      error("يرجى إدخال بريد إلكتروني صحيح");
      return;
    }
    success("تم الاشتراك بنجاح! ستصلك آخر العروض قريباً");
    setEmail("");
  };

  return (
    <div className="gradient-primary">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-white text-xl font-bold">اشترك في نشرتنا البريدية</h3>
            <p className="text-sky-100 text-sm mt-1">احصل على أحدث العروض والتخفيضات مباشرة في بريدك</p>
          </div>
          <form onSubmit={handleSubmit} className="flex w-full md:w-auto gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="بريدك الإلكتروني"
              aria-label="البريد الإلكتروني للاشتراك"
              required
              className="flex-1 md:w-80 px-4 py-3 rounded-xl text-slate-800 text-right focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-white text-sky-600 font-bold rounded-xl hover:bg-sky-50 transition-colors whitespace-nowrap"
            >
              اشترك
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
