import { useRouter, usePathname } from 'next/navigation';
import { useState, createContext, useContext, ReactNode, useCallback } from 'react';

export type Locale = 'ar' | 'en' | 'zh';

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  ar: {
    product: 'المنتج', available: 'متوفر', units: 'وحدة',
    add_to_cart: 'إضافة للسلة', out_of_stock: 'نفد من المخزون',
    home: 'الرئيسية', cart: 'السلة', wishlist: 'المفضلة',
    account: 'الحساب', login: 'تسجيل الدخول', register: 'تسجيل', logout: 'تسجيل الخروج',
    search: 'بحث',
  },
  en: {
    product: 'Product', available: 'Available', units: 'units',
    add_to_cart: 'Add to Cart', out_of_stock: 'Out of Stock',
    home: 'Home', cart: 'Cart', wishlist: 'Wishlist',
    account: 'Account', login: 'Login', register: 'Register', logout: 'Logout',
    search: 'Search',
  },
  zh: {
    product: '产品', available: '可用', units: '单位',
    add_to_cart: '加入购物车', out_of_stock: '缺货',
    home: '首页', cart: '购物车', wishlist: '收藏',
    account: '账户', login: '登录', register: '注册', logout: '登出',
    search: '搜索',
  },
};

interface LanguageProviderProps { children: ReactNode; }

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [locale, setLocaleState] = useState<Locale>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('khuboor_locale');
      if (saved === 'ar' || saved === 'en' || saved === 'zh') return saved as Locale;
    }
    return 'ar';
  });

  const router = useRouter();
  const pathname = usePathname();

  const setLocaleAndSave = useCallback((newLocale: Locale) => {
    localStorage.setItem('khuboor_locale', newLocale);
    document.documentElement.lang = newLocale;
    document.documentElement.dir = newLocale === "ar" ? "rtl" : "ltr";
    const segments = pathname.split('/');
    segments[1] = newLocale;
    router.push(segments.join('/'));
  }, [pathname, router]);

  const t = useCallback((key: string): string => {
    const keys = key.split('.');
    let value: unknown = (translations as Record<string, Record<string, unknown>>)[locale];
    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = (value as Record<string, unknown>)[k];
      } else {
        value = undefined;
        break;
      }
    }
    return (value as string) || key;
  }, [locale]);

  const value = { locale, setLocale: setLocaleAndSave, t };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
}

export function useCurrentLocale() {
  const context = useContext(LanguageContext);
  if (!context) return 'ar';
  return context.locale;
}