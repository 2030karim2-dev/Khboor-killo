"use client";

import { Bell, BellOff, Loader2, X } from "lucide-react";

interface NotificationToggleProps {
  isEnabled: boolean;
  isSubscribing: boolean;
  onToggle: () => void;
}

export default function NotificationToggle({ isEnabled, isSubscribing, onToggle }: NotificationToggleProps) {
  return (
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
          onClick={onToggle}
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
  );
}