"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { Bell, Package, Tag, Info, Star, CheckCheck, Trash2 } from "lucide-react";
import { useNotifications, type NotificationType } from "@/contexts/NotificationsContext";

const typeIcons: Record<NotificationType, typeof Bell> = {
  order: Package,
  offer: Tag,
  system: Info,
  review: Star,
};

const typeColors: Record<NotificationType, string> = {
  order: "bg-sky-50 text-sky-600",
  offer: "bg-orange-50 text-orange-600",
  system: "bg-slate-100 text-slate-600",
  review: "bg-amber-50 text-amber-600",
};

export default function NotificationBell() {
  const { notifications, unreadCount, markAsRead, markAllAsRead, clearAll } = useNotifications();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const formatTime = useCallback((dateStr: string) => {
    const created = new Date(dateStr).getTime();
    const current = new Date().getTime();
    const diff = current - created;
    const hours = Math.floor(diff / 3600000);
    if (hours < 1) return "الآن";
    if (hours < 24) return `منذ ${hours} ساعة`;
    const days = Math.floor(hours / 24);
    return `منذ ${days} يوم`;
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="relative p-2 rounded-xl hover:bg-slate-100 transition-colors"
        aria-label={`الإشعارات${unreadCount > 0 ? ` (${unreadCount} غير مقروءة)` : ""}`}
        aria-expanded={open}
      >
        <Bell size={22} className="text-slate-700" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-1 bg-white rounded-xl shadow-xl border border-slate-200 w-80 max-h-96 overflow-hidden animate-fade-in z-50">
          <div className="flex items-center justify-between p-3 border-b border-slate-100">
            <h3 className="font-bold text-slate-800">الإشعارات</h3>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-xs text-sky-600 hover:text-sky-700 flex items-center gap-1"
              >
                <CheckCheck size={14} />
                تعيين الكل كمقروء
              </button>
            )}
          </div>

          <div className="max-h-72 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-6 text-center text-slate-400">
                <Bell size={32} className="mx-auto mb-2 opacity-50" />
                <p className="text-sm">لا توجد إشعارات</p>
              </div>
            ) : (
              notifications.slice(0, 10).map((notif) => {
                const Icon = typeIcons[notif.type];
                const content = (
                  <div
                    className={`flex gap-3 p-3 hover:bg-slate-50 transition-colors cursor-pointer ${
                      !notif.read ? "bg-sky-50/30" : ""
                    }`}
                    onClick={() => markAsRead(notif.id)}
                  >
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${typeColors[notif.type]}`}>
                      <Icon size={16} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className={`text-sm truncate ${!notif.read ? "font-bold text-slate-800" : "text-slate-700"}`}>
                          {notif.title}
                        </p>
                        {!notif.read && <span className="w-2 h-2 rounded-full bg-sky-500 shrink-0" />}
                      </div>
                      <p className="text-xs text-slate-500 truncate">{notif.message}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{formatTime(notif.createdAt)}</p>
                    </div>
                  </div>
                );

                return notif.href ? (
                  <Link key={notif.id} href={notif.href}>{content}</Link>
                ) : (
                  <div key={notif.id}>{content}</div>
                );
              })
            )}
          </div>

          {notifications.length > 0 && (
            <div className="p-2 border-t border-slate-100 flex justify-between">
              <button onClick={clearAll} className="text-xs text-red-500 hover:text-red-600 flex items-center gap-1">
                <Trash2 size={12} />
                مسح الكل
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
