export { CartProvider, useCart } from '../contexts/CartContext';
export { AuthProvider, useAuth } from '../contexts/AuthContext';
export { ToastProvider, useToast } from '../contexts/ToastContext';
export { WishlistProvider, useWishlist } from '../contexts/WishlistContext';
export { OrderProvider, useOrders } from '../contexts/OrderContext';
export { NotificationsProvider, useNotifications } from '../contexts/NotificationsContext';
export { ThemeProvider, useTheme } from '../contexts/ThemeContext';
export { AdminProvider, useAdmin } from '../contexts/AdminContext';
export { CurrencyProvider, useCurrency } from '../contexts/CurrencyContext';
export { RecentlyViewedProvider, useRecentlyViewed } from '../contexts/RecentlyViewedContext';
export { ReferralProvider, useReferral } from '../contexts/ReferralContext';

export type { Product, SubCategory, Category, BreadcrumbItem, CartItem, Address, Review } from '../types/product';
export type { User } from '../types/user';
export type { OrderStatus, OrderShipping, Order } from '../types/order';
export { statusLabels } from '../types/order';
export type { AdminStats, AdminUser, AdminOrder, AdminSettings, ActivityLogEntry, AdminContextType } from '../types/admin';

export * from '../data/categories';
export * from '../data/products';
export { calculateDiscount, validateCoupon, type Coupon } from '../data/coupons';
export * from '../data/accessories';
export * from '../data/autoParts';
export * from '../data/buildingMaterials';
export * from '../data/cars';
export * from '../data/clothing';
export * from '../data/reviews';
export * from '../data/mockData';

export * from '../i18n';

export { useAddresses } from '../hooks/useAddresses';
export { useFormatPrice } from '../hooks/useFormatPrice';

export * from '../utils/constants';
export { getProductById, getProductsByCategory, getFeaturedProducts, getCategoryBySlug, searchProducts, formatNumber, formatPrice, calculateDiscountPercent } from '../utils/helpers';
export * from '../utils/validations';

export { default as AppProviders } from '../AppProviders';