"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/contexts/ToastContext";
import { CITIES } from "@/utils/constants";

export default function PersonalInfoForm() {
  const { user, updateProfile } = useAuth();
  const { success } = useToast();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    updateProfile({
      firstName: form.get("firstName") as string,
      lastName: form.get("lastName") as string,
      email: form.get("email") as string,
      phone: form.get("phone") as string,
      city: form.get("city") as string,
    });
    success("تم حفظ التغييرات بنجاح");
  };

  return (
    <div className="card p-6 md:p-8">
      <h2 className="text-xl font-bold text-slate-800 mb-6">المعلومات الشخصية</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-slate-700 mb-1.5">الاسم الأول</label>
            <input id="firstName" name="firstName" type="text" defaultValue={user?.firstName} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-sky-500 focus:outline-none transition-colors text-right" />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-slate-700 mb-1.5">الاسم الأخير</label>
            <input id="lastName" name="lastName" type="text" defaultValue={user?.lastName} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-sky-500 focus:outline-none transition-colors text-right" />
          </div>
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1.5">البريد الإلكتروني</label>
          <input id="email" name="email" type="email" defaultValue={user?.email} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-sky-500 focus:outline-none transition-colors" dir="ltr" />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-1.5">رقم الجوال</label>
          <input id="phone" name="phone" type="tel" defaultValue={user?.phone} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-sky-500 focus:outline-none transition-colors" dir="ltr" />
        </div>
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-slate-700 mb-1.5">المدينة</label>
          <select id="city" name="city" defaultValue={user?.city} className="w-full md:w-1/2 px-4 py-2.5 rounded-xl border border-slate-200 focus:border-sky-500 focus:outline-none transition-colors bg-white">
            {CITIES.map((city) => (
              <option key={city}>{city}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn-primary">حفظ التغييرات</button>
      </form>
    </div>
  );
}
