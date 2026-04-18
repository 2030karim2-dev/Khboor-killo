"use client";

import { useState, useEffect, useCallback } from "react";
import { Bell, BellOff, Smartphone, Mail, MessageSquare, Check, X, Loader2 } from "lucide-react";
import { useToast } from "@/contexts/ToastContext";

interface NotificationPreferences {
  push: boolean;
  sms: boolean;
  email: boolean;
  orderUpdates: boolean;
  marketing: boolean;
  priceDrops: boolean;
  newArrivals: boolean;
}

const DEFAULT_PREFERENCES: NotificationPreferences = {
  push: false,
  sms: false,
  email: false,
  orderUpdates: true,
  marketing: true,
  priceDrops: true,
  newArrivals: false,
};

const STORAGE_KEY = "khuboor_notification_prefs";

export default function PushNotificationManager() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [preferences, setPreferences] = useState<NotificationPreferences>(DEFAULT_PREFERENCES);
  const { addToast } = useToast();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setPreferences({ ...DEFAULT_PREFERENCES, ...parsed });
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
  }, [preferences]);

  const subscribeToPush = useCallback(async () => {
    if (!("Notification" in window)) {
      addToast("error", "المتصفح لا يدعم الإشعارات");
      return;
    }

    if (Notification.permission === "denied") {
      addToast("error", "تم حظر الإشعارات في المتصفح");
      return;
    }

    setIsSubscribing(true);

    try {
      if (Notification.permission === "granted") {
        setIsEnabled(true);
        addToast("success", "تفعيل الإشعارات بنجاح!");
      } else {
        const permission = await Notification.requestPermission();
        if (permission === "granted") {
          setIsEnabled(true);
          addToast("success", "تم تفعيل الإشعارات!");
        } else {
          addToast("warning", "تم رفض إذن الإشعارات");
        }
      }
    } catch {
      addToast("error", "حدث خطأ أثناء التفعيل");
    } finally {
      setIsSubscribing(false);
    }
  }, [addToast]);

  const unsubscribeFromPush = useCallback(() => {
    setIsEnabled(false);
    addToast("info", "تم关闭 الإشعارات");
  }, [addToast]);

  const updatePreference = (key: keyof NotificationPreferences, value: boolean) => {
    setPreferences((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6">
      {/* Push Notification Toggle */}
      <div className="card p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
              {isEnabled ? <Bell size={24} className="text-white" /> : <BellOff size={24} className="text-white" />}
            </div>
            <div>
              <h3 className="font-bold text-slate-800 dark:text-white">الإشعارات الفورية</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                احصل على إشعارات فورية في جهازك
              </p>
            </div>
          </div>
          <button
            onClick={isEnabled ? unsubscribeFromPush : subscribeToPush}
            disabled={isSubscribing}
            className={`relative px-6 py-2 rounded-lg font-medium transition-colors ${
              isEnabled
                ? "bg-red-500 text-white hover:bg-red-600"
                : "bg-blue-500 text-white hover:bg-blue-600"
            } disabled:opacity-50`}
          >
            {isSubscribing ? (
              <Loader2 size={18} className="animate-spin" />
            ) : isEnabled ? (
              <span className="flex items-center gap-2">
                <X size={18} /> إلغاء
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Bell size={18} /> تفعيل
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Notification Channels */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="card p-4">
          <div className="flex items-center gap-3 mb-3">
            <Smartphone size={20} className="text-blue-500" />
            <h4 className="font-medium text-slate-800 dark:text-white">SMS</h4>
          </div>
          <label className="flex items-center justify-between">
            <span className="text-sm text-slate-500">تفعيل إشعارات SMS</span>
            <input
              type="checkbox"
              checked={preferences.sms}
              onChange={(e) => updatePreference("sms", e.target.checked)}
              className="w-5 h-5 rounded text-blue-500"
            />
          </label>
        </div>

        <div className="card p-4">
          <div className="flex items-center gap-3 mb-3">
            <Mail size={20} className="text-purple-500" />
            <h4 className="font-medium text-slate-800 dark:text-white">البريد الإلكتروني</h4>
          </div>
          <label className="flex items-center justify-between">
            <span className="text-sm text-slate-500">تفعيل الإيميل</span>
            <input
              type="checkbox"
              checked={preferences.email}
              onChange={(e) => updatePreference("email", e.target.checked)}
              className="w-5 h-5 rounded text-purple-500"
            />
          </label>
        </div>

        <div className="card p-4">
          <div className="flex items-center gap-3 mb-3">
            <Bell size={20} className="text-green-500" />
            <h4 className="font-medium text-slate-800 dark:text-white">Push</h4>
          </div>
          <label className="flex items-center justify-between">
            <span className="text-sm text-slate-500">تفعيل الإشعارات</span>
            <input
              type="checkbox"
              checked={preferences.push || isEnabled}
              onChange={(e) => {
                if (e.target.checked) {
                  subscribeToPush();
                } else {
                  unsubscribeFromPush();
                }
              }}
              className="w-5 h-5 rounded text-green-500"
            />
          </label>
        </div>
      </div>

      {/* Notification Categories */}
      <div className="card p-6">
        <h3 className="font-bold text-slate-800 dark:text-white mb-4">أنواع الإشعارات</h3>
        <div className="space-y-4">
          <label className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
            <div>
              <p className="font-medium text-slate-800 dark:text-white">تحديثات الطلبات</p>
              <p className="text-sm text-slate-500">إشعارات بحالة طلبك</p>
            </div>
            <input
              type="checkbox"
              checked={preferences.orderUpdates}
              onChange={(e) => updatePreference("orderUpdates", e.target.checked)}
              className="w-5 h-5 rounded text-blue-500"
            />
          </label>

          <label className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
            <div>
              <p className="font-medium text-slate-800 dark:text-white">عروض ورخص</p>
              <p className="text-sm text-slate-500">خصومات حصرية ومنتجات مخفضة</p>
            </div>
            <input
              type="checkbox"
              checked={preferences.marketing}
              onChange={(e) => updatePreference("marketing", e.target.checked)}
              className="w-5 h-5 rounded text-blue-500"
            />
          </label>

          <label className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
            <div>
              <p className="font-medium text-slate-800 dark:text-white">انخفاض الأسعار</p>
              <p className="text-sm text-slate-500">تنبيه عند انخفاض سعر منتج تتابعه</p>
            </div>
            <input
              type="checkbox"
              checked={preferences.priceDrops}
              onChange={(e) => updatePreference("priceDrops", e.target.checked)}
              className="w-5 h-5 rounded text-blue-500"
            />
          </label>

          <label className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
            <div>
              <p className="font-medium text-slate-800 dark:text-white">منتجات جديدة</p>
              <p className="text-sm text-slate-500">إشعار عند وصول منتجات جديدة</p>
            </div>
            <input
              type="checkbox"
              checked={preferences.newArrivals}
              onChange={(e) => updatePreference("newArrivals", e.target.checked)}
              className="w-5 h-5 rounded text-blue-500"
            />
          </label>
        </div>
      </div>
    </div>
  );
}