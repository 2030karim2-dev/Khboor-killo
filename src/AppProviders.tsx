"use client";

import { Component, type ReactNode, type ErrorInfo } from "react";
import { CartProvider } from "@/contexts/CartContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { ToastProvider } from "@/contexts/ToastContext";
import { WishlistProvider } from "@/contexts/WishlistContext";
import { OrderProvider } from "@/contexts/OrderContext";
import { NotificationsProvider } from "@/contexts/NotificationsContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AdminProvider } from "@/contexts/AdminContext";
import { LanguageProvider } from "@/i18n";
import { CurrencyProvider } from "@/contexts/CurrencyContext";
import { RecentlyViewedProvider } from "@/contexts/RecentlyViewedContext";
import { CompareProvider } from "@/contexts/CompareContext";

interface ErrorBoundaryState {
  hasError: boolean;
}

class ProviderErrorBoundary extends Component<{ children: ReactNode }, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Provider error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="text-center max-w-md">
            <div className="text-6xl mb-4">⚠️</div>
            <h1 className="text-xl font-bold text-slate-800 mb-2">حدث خطأ غير متوقع</h1>
            <p className="text-slate-500 mb-4">نعتذر عن هذا الخطأ. يرجى إعادة تحميل الصفحة.</p>
            <button
              onClick={() => {
                try { localStorage.clear(); } catch { /* empty */ }
                window.location.reload();
              }}
              className="px-6 py-2.5 bg-sky-500 text-white rounded-xl font-medium hover:bg-sky-600 transition-colors"
            >
              إعادة تحميل
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ProviderErrorBoundary>
      <ThemeProvider>
        <LanguageProvider>
          <CurrencyProvider>
            <ToastProvider>
              <AuthProvider>
                <AdminProvider>
                  <NotificationsProvider>
                    <WishlistProvider>
                      <CartProvider>
                        <OrderProvider>
                          <RecentlyViewedProvider>
                          <CompareProvider>
                            {children}
                          </CompareProvider>
                        </RecentlyViewedProvider>
                        </OrderProvider>
                      </CartProvider>
                    </WishlistProvider>
                  </NotificationsProvider>
                </AdminProvider>
              </AuthProvider>
            </ToastProvider>
          </CurrencyProvider>
        </LanguageProvider>
      </ThemeProvider>
    </ProviderErrorBoundary>
  );
}
