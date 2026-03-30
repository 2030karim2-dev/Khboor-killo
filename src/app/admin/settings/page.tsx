"use client";

import { useState } from "react";
import { Save, Bell, Shield, Palette, Globe, DollarSign } from "lucide-react";

export default function AdminSettings() {
  const [emailNotif, setEmailNotif] = useState(true);
  const [smsNotif, setSmsNotif] = useState(false);
  const [autoConfirm, setAutoConfirm] = useState(false);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-extrabold text-slate-800 dark:text-white">إعدادات الموقع</h1>
        <p className="text-sm text-slate-500">إدارة إعدادات المنصة العامة</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* General */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-sky-50 flex items-center justify-center">
              <Globe size={20} className="text-sky-600" />
            </div>
            <h2 className="font-bold text-slate-800 dark:text-white">إعدادات عامة</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1.5">اسم الموقع</label>
              <input type="text" defaultValue="خبور" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500 bg-transparent" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">وصف الموقع</label>
              <textarea rows={2} defaultValue="منصة البيع والشراء الإلكترونية الرائدة" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500 bg-transparent resize-none" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">البريد الإلكتروني للدعم</label>
              <input type="email" defaultValue="support@khuboor.com" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500 bg-transparent" dir="ltr" />
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center">
              <Bell size={20} className="text-amber-600" />
            </div>
            <h2 className="font-bold text-slate-800 dark:text-white">الإشعارات</h2>
          </div>
          <div className="space-y-4">
            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <p className="font-medium text-sm">إشعارات البريد الإلكتروني</p>
                <p className="text-xs text-slate-500">إرسال إشعارات للعملاء عبر البريد</p>
              </div>
              <input type="checkbox" checked={emailNotif} onChange={(e) => setEmailNotif(e.target.checked)} className="accent-sky-500 w-5 h-5" />
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <p className="font-medium text-sm">إشعارات SMS</p>
                <p className="text-xs text-slate-500">إرسال رسائل نصية للعملاء</p>
              </div>
              <input type="checkbox" checked={smsNotif} onChange={(e) => setSmsNotif(e.target.checked)} className="accent-sky-500 w-5 h-5" />
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <p className="font-medium text-sm">تأكيد الطلبات تلقائياً</p>
                <p className="text-xs text-slate-500">تأكيد الطلبات الجديدة تلقائياً</p>
              </div>
              <input type="checkbox" checked={autoConfirm} onChange={(e) => setAutoConfirm(e.target.checked)} className="accent-sky-500 w-5 h-5" />
            </label>
          </div>
        </div>

        {/* Payment */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center">
              <DollarSign size={20} className="text-emerald-600" />
            </div>
            <h2 className="font-bold text-slate-800 dark:text-white">الدفع والشحن</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1.5">حد الشحن المجاني (ر.س)</label>
              <input type="number" defaultValue={200} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500 bg-transparent" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">تكلفة الشحن الأساسية (ر.س)</label>
              <input type="number" defaultValue={25} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500 bg-transparent" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">فترة الإرجاع (أيام)</label>
              <input type="number" defaultValue={14} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500 bg-transparent" />
            </div>
          </div>
        </div>

        {/* Security */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center">
              <Shield size={20} className="text-red-600" />
            </div>
            <h2 className="font-bold text-slate-800 dark:text-white">الأمان</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1.5">الحد الأدنى لكلمة المرور</label>
              <select className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-transparent">
                <option>8 أحرف</option>
                <option>10 أحرف</option>
                <option>12 حرف</option>
              </select>
            </div>
            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <p className="font-medium text-sm">المصادقة الثنائية</p>
                <p className="text-xs text-slate-500">تفعيل 2FA للحسابات</p>
              </div>
              <input type="checkbox" className="accent-sky-500 w-5 h-5" />
            </label>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button className="btn-primary">
          <Save size={16} />
          حفظ الإعدادات
        </button>
      </div>
    </div>
  );
}
