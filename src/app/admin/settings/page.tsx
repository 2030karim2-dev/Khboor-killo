"use client";

import { useAdmin } from "@/lib/AdminContext";
import { Save, Bell, Shield, Globe, DollarSign } from "lucide-react";
import { useToast } from "@/lib/ToastContext";

export default function AdminSettings() {
  const { settings, updateSettings } = useAdmin();
  const { success } = useToast();

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    updateSettings({
      siteName: form.get("siteName") as string,
      siteDescription: form.get("siteDescription") as string,
      supportEmail: form.get("supportEmail") as string,
      freeShippingThreshold: Number(form.get("freeShipping")),
      shippingCost: Number(form.get("shippingCost")),
      returnDays: Number(form.get("returnDays")),
      minPasswordLength: Number(form.get("minPassword")),
    });
    success("تم حفظ الإعدادات بنجاح");
  };

  return (
    <div className="space-y-6">
      <div><h1 className="text-xl font-extrabold text-slate-800 dark:text-white">إعدادات الموقع</h1><p className="text-sm text-slate-500">إدارة إعدادات المنصة العامة</p></div>

      <form onSubmit={handleSave}>
        <div className="grid lg:grid-cols-2 gap-6">
          {/* General */}
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
            <div className="flex items-center gap-3 mb-4"><div className="w-10 h-10 rounded-lg bg-sky-50 flex items-center justify-center"><Globe size={20} className="text-sky-600" /></div><h2 className="font-bold text-slate-800 dark:text-white">إعدادات عامة</h2></div>
            <div className="space-y-4">
              <div><label className="block text-sm font-medium mb-1.5">اسم الموقع</label><input name="siteName" defaultValue={settings.siteName} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500 bg-transparent" /></div>
              <div><label className="block text-sm font-medium mb-1.5">وصف الموقع</label><textarea name="siteDescription" rows={2} defaultValue={settings.siteDescription} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500 bg-transparent resize-none" /></div>
              <div><label className="block text-sm font-medium mb-1.5">البريد للدعم</label><input name="supportEmail" type="email" defaultValue={settings.supportEmail} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500 bg-transparent" dir="ltr" /></div>
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
            <div className="flex items-center gap-3 mb-4"><div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center"><Bell size={20} className="text-amber-600" /></div><h2 className="font-bold text-slate-800 dark:text-white">الإشعارات</h2></div>
            <div className="space-y-4">
              {[{ key: "emailNotifications", label: "إشعارات البريد", desc: "إرسال إشعارات للعملاء" }, { key: "smsNotifications", label: "إشعارات SMS", desc: "إرسال رسائل نصية" }, { key: "autoConfirmOrders", label: "تأكيد الطلبات تلقائياً", desc: "تأكيد تلقائي للطلبات الجديدة" }].map((item) => (
                <label key={item.key} className="flex items-center justify-between cursor-pointer">
                  <div><p className="font-medium text-sm">{item.label}</p><p className="text-xs text-slate-500">{item.desc}</p></div>
                  <input type="checkbox" name={item.key} defaultChecked={settings[item.key as keyof typeof settings] as boolean} className="accent-sky-500 w-5 h-5" />
                </label>
              ))}
            </div>
          </div>

          {/* Payment */}
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
            <div className="flex items-center gap-3 mb-4"><div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center"><DollarSign size={20} className="text-emerald-600" /></div><h2 className="font-bold text-slate-800 dark:text-white">الدفع والشحن</h2></div>
            <div className="space-y-4">
              <div><label className="block text-sm font-medium mb-1.5">حد الشحن المجاني (ر.ي)</label><input name="freeShipping" type="number" defaultValue={settings.freeShippingThreshold} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500 bg-transparent" /></div>
              <div><label className="block text-sm font-medium mb-1.5">تكلفة الشحن (ر.ي)</label><input name="shippingCost" type="number" defaultValue={settings.shippingCost} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500 bg-transparent" /></div>
              <div><label className="block text-sm font-medium mb-1.5">فترة الإرجاع (أيام)</label><input name="returnDays" type="number" defaultValue={settings.returnDays} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500 bg-transparent" /></div>
            </div>
          </div>

          {/* Security */}
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
            <div className="flex items-center gap-3 mb-4"><div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center"><Shield size={20} className="text-red-600" /></div><h2 className="font-bold text-slate-800 dark:text-white">الأمان</h2></div>
            <div className="space-y-4">
              <div><label className="block text-sm font-medium mb-1.5">الحد الأدنى لكلمة المرور</label><input name="minPassword" type="number" defaultValue={settings.minPasswordLength} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500 bg-transparent" /></div>
              <label className="flex items-center justify-between cursor-pointer">
                <div><p className="font-medium text-sm">المصادقة الثنائية</p><p className="text-xs text-slate-500">تفعيل 2FA</p></div>
                <input type="checkbox" name="twoFactor" defaultChecked={settings.twoFactorAuth} className="accent-sky-500 w-5 h-5" />
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <button type="submit" className="btn-primary"><Save size={16} /> حفظ الإعدادات</button>
        </div>
      </form>
    </div>
  );
}
