"use client";

import { useState, useEffect, useCallback } from "react";
import { Bell, BellOff, Smartphone, Mail, Loader2, X } from "lucide-react";
import { useToast } from "@/contexts/ToastContext";
import NotificationChannel from "./NotificationChannel";
import NotificationToggle from "./NotificationToggle";

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
      <NotificationToggle
        isEnabled={isEnabled}
        isSubscribing={isSubscribing}
        onToggle={isEnabled ? unsubscribeFromPush : subscribeToPush}
      />

      <div className="grid md:grid-cols-3 gap-4">
        <NotificationChannel
          icon={Smartphone}
          iconColor="text-blue-500"
          title="SMS"
          description="تفعيل إشعارات SMS"
          checked={preferences.sms}
          onChange={(v) => updatePreference("sms", v)}
        />
        <NotificationChannel
          icon={Mail}
          iconColor="text-purple-500"
          title="البريد الإلكتروني"
          description="تفعيل الإيميل"
          checked={preferences.email}
          onChange={(v) => updatePreference("email", v)}
        />
        <NotificationChannel
          icon={Bell}
          iconColor="text-green-500"
          title="Push"
          description="تفعيل الإشعارات"
          checked={preferences.push || isEnabled}
          onChange={(v) => {
            if (v) subscribeToPush();
            else unsubscribeFromPush();
          }}
        />
      </div>

      <NotificationCategories
        preferences={preferences}
        onUpdate={updatePreference}
      />
    </div>
  );
}

interface NotificationCategoriesProps {
  preferences: NotificationPreferences;
  onUpdate: (key: keyof NotificationPreferences, value: boolean) => void;
}

function NotificationCategories({ preferences, onUpdate }: NotificationCategoriesProps) {
  const categories = [
    { key: "orderUpdates" as const, title: "تحديثات الطلبات", desc: "إشعارات بحالة طلبك" },
    { key: "marketing" as const, title: "عروض ورخص", desc: "خصومات حصرية ومنتجات مخفضة" },
    { key: "priceDrops" as const, title: "انخفاض الأسعار", desc: "تنبيه عند انخفاض سعر منتج تتابعه" },
    { key: "newArrivals" as const, title: "منتجات جديدة", desc: "إشعار عند وصول منتجات جديدة" },
  ];

  return (
    <div className="card p-6">
      <h3 className="font-bold text-slate-800 dark:text-white mb-4">أنواع الإشعارات</h3>
      <div className="space-y-4">
        {categories.map((cat) => (
          <CategoryItem
            key={cat.key}
            title={cat.title}
            description={cat.desc}
            checked={preferences[cat.key]}
            onChange={(v) => onUpdate(cat.key, v)}
          />
        ))}
      </div>
    </div>
  );
}

interface CategoryItemProps {
  title: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

function CategoryItem({ title, description, checked, onChange }: CategoryItemProps) {
  return (
    <label className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
      <div>
        <p className="font-medium text-slate-800 dark:text-white">{title}</p>
        <p className="text-sm text-slate-500">{description}</p>
      </div>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="w-5 h-5 rounded text-blue-500"
      />
    </label>
  );
}