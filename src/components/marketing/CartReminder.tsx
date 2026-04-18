"use client";

import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { ShoppingCart, Clock, X, Bell, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/contexts/ToastContext";
import { useNotifications } from "@/contexts/NotificationsContext";

interface CartReminderState {
  lastCartItems: number;
  lastActiveTime: number;
  reminderShown: boolean;
  reminderDismissed: boolean;
}

const STORAGE_KEY = "khuboor_cart_reminder";
const REMINDER_DELAY = 30 * 60 * 1000; 

function getInitialReminderState(itemsLength: number): boolean {
  if (typeof window === "undefined" || itemsLength === 0) return false;
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return false;
    
    const state = JSON.parse(stored) as CartReminderState;
    if (state.reminderShown || state.reminderDismissed) return false;
    
    const timeSinceLastActive = Date.now() - (state.lastActiveTime || 0);
    return timeSinceLastActive >= REMINDER_DELAY;
  } catch {
    return false;
  }
}

export default function CartReminder() {
  const { items, totalPrice } = useCart();
  const { addToast } = useToast();
  const { addNotification } = useNotifications();
  const [isOpen, setIsOpen] = useState(false);
  const showReminder = useMemo(() => getInitialReminderState(items.length), [items.length]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    
    if (items.length > 0) {
      const state: CartReminderState = {
        lastCartItems: items.length,
        lastActiveTime: Date.now(),
        reminderShown: false,
        reminderDismissed: false,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }
  }, [items.length]);

  const handleDismiss = useCallback(() => {
    if (typeof window === "undefined") return;
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const state = JSON.parse(stored);
      state.reminderDismissed = true;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }
    setIsOpen(false);
    addToast("info", "لن نذكرك بهذه السلة مجدداً");
  }, [addToast]);

  const handleComplete = useCallback(() => {
    if (typeof window === "undefined") return;
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const state = JSON.parse(stored);
      state.reminderShown = true;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }
    setIsOpen(false);
  }, []);

  if (!showReminder || items.length === 0) return null;

  return (
    <>
      {/* Floating Reminder Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-6 z-50 w-14 h-14 bg-orange-500 rounded-full shadow-lg flex items-center justify-center animate-bounce hover:bg-orange-600 transition-colors"
      >
        <div className="relative">
          <ShoppingCart size={24} className="text-white" />
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
            {items.length}
          </span>
        </div>
      </button>

      {/* Reminder Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="card w-full max-w-md p-6 animate-in fade-in zoom-in duration-200">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                  <ShoppingCart size={24} className="text-orange-500" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 dark:text-white">هل نسيت سلتك؟</h3>
                  <p className="text-sm text-slate-500">لديك منتجات في انتظارك</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full"
              >
                <X size={20} className="text-slate-400" />
              </button>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-4 mb-4">
              <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300 mb-2">
                <Clock size={16} className="text-orange-500" />
                <span>السلة متروكة منذ أكثر من 30 دقيقة</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500">{items.length} منتجات</span>
                <span className="font-bold text-slate-800 dark:text-white">{totalPrice} ر.ي</span>
              </div>
            </div>

            <div className="space-y-3">
              <Link
                href="/cart"
                onClick={handleComplete}
                className="flex items-center justify-center gap-2 w-full py-3 bg-orange-500 text-white rounded-xl font-bold hover:bg-orange-600 transition-colors"
              >
                إكمال الشراء
                <ArrowRight size={18} />
              </Link>
              <button
                onClick={handleDismiss}
                className="w-full py-2 text-sm text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
              >
                لا شكراً، لا أريد إكمال الطلب
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
