"use client";

import { ReactNode } from "react";
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
