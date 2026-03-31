"use client";

import { ReactNode } from "react";
import { CartProvider } from "@/lib/CartContext";
import { AuthProvider } from "@/lib/AuthContext";
import { ToastProvider } from "@/lib/ToastContext";
import { WishlistProvider } from "@/lib/WishlistContext";
import { OrderProvider } from "@/lib/OrderContext";
import { NotificationsProvider } from "@/lib/NotificationsContext";
import { ThemeProvider } from "@/lib/ThemeContext";
import { AdminProvider } from "@/lib/AdminContext";
import { LanguageProvider } from "@/lib/i18n";
import { CurrencyProvider } from "@/lib/CurrencyContext";
import { RecentlyViewedProvider } from "@/lib/RecentlyViewedContext";

export default function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <CurrencyProvider>
          <AdminProvider>
            <ToastProvider>
              <AuthProvider>
                <WishlistProvider>
                  <CartProvider>
                    <OrderProvider>
                      <NotificationsProvider>
                        <RecentlyViewedProvider>
                          {children}
                        </RecentlyViewedProvider>
                      </NotificationsProvider>
                    </OrderProvider>
                  </CartProvider>
                </WishlistProvider>
              </AuthProvider>
            </ToastProvider>
          </AdminProvider>
        </CurrencyProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
