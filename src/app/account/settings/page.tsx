"use client";

import { useState } from "react";
import { Settings, Bell, Shield, Palette, Trash2 } from "lucide-react";
import { Breadcrumb } from "@/components/ui";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/contexts/ToastContext";

export default function SettingsPage() {
  const { user, logout } = useAuth();
  const { success, warning } = useToast();
  const [emailNotif, setEmailNotif] = useState(true);
  const [pushNotif, setPushNotif] = useState(false);

  const handleDeleteAccount = () => {
    if (confirm("هل أنت متأكد من حذف حسابك؟ هذا الإجراء لا يمكن التراجع عنه.")) {
      logout();
      warning("تم حذف الحساب");
      window.location.href = "/";
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Breadcrumb items={[{ label: "الرئيسية", href: "/" }, { label: "الإعدادات" }]} />

      <h1 className="text-2xl font-extrabold text-slate-800 mb-8">الإعدادات</h1>

      <div className="space-y-6">
        {/* Notifications */}
        <div className="card p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center">
              <Bell size={18} className="text-sky-600" />
            </div>
            <h2 className="font-bold text-slate-800">الإشعارات</h2>
          </div>
          <div className="space-y-4">
            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <p className="font-medium text-slate-700">إشعارات البريد الإلكتروني</p>
                <p className="text-sm text-slate-500">تلقي تحديثات الطلبات والعروض</p>
              </div>
              <input type="checkbox" checked={emailNotif} onChange={(e) => setEmailNotif(e.target.checked)} className="accent-sky-500 w-5 h-5" />
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <p className="font-medium text-slate-700">إشعارات الموقع</p>
                <p className="text-sm text-slate-500">إشعارات فورية في المتصفح</p>
              </div>
              <input type="checkbox" checked={pushNotif} onChange={(e) => { setPushNotif(e.target.checked); if (e.target.checked) success("تم تفعيل الإشعارات"); }} className="accent-sky-500 w-5 h-5" />
            </label>
          </div>
        </div>

        {/* Security */}
        <div className="card p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
              <Shield size={18} className="text-emerald-600" />
            </div>
            <h2 className="font-bold text-slate-800">الأمان</h2>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
              <div>
                <p className="font-medium text-slate-700">البريد الإلكتروني</p>
                <p className="text-sm text-slate-500" dir="ltr">{user?.email}</p>
              </div>
            </div>
            <button className="w-full text-right p-3 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors">
              <p className="font-medium text-slate-700">تغيير كلمة المرور</p>
              <p className="text-sm text-slate-500">آخر تغيير منذ 30 يوماً</p>
            </button>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="card p-6 border-red-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
              <Trash2 size={18} className="text-red-600" />
            </div>
            <h2 className="font-bold text-red-600">منطقة الخطر</h2>
          </div>
          <button
            onClick={handleDeleteAccount}
            className="w-full p-3 rounded-xl border-2 border-red-200 text-red-600 hover:bg-red-50 transition-colors font-medium"
          >
            حذف الحساب نهائياً
          </button>
          <p className="text-sm text-slate-500 mt-2">
            هذا الإجراء لا يمكن التراجع عنه. سيتم حذف جميع بياناتك نهائياً.
          </p>
        </div>
      </div>
    </div>
  );
}
