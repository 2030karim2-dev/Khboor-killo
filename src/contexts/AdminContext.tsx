export { useAdminActivity } from "./AdminActivityContext";
export { useAdminProducts } from "./AdminProductContext";
export { useAdminOrders } from "./AdminOrderContext";
export { useAdminUsers } from "./AdminUserContext";
export { useAdminSettings } from "./AdminSettingsContext";

export function useAdmin() {
  const activity = useAdminActivity();
  const products = useAdminProducts();
  const orders = useAdminOrders();
  const users = useAdminUsers();
  const settings = useAdminSettings();
  return {
    ...products,
    ...orders,
    ...users,
    ...settings,
    activityLog: activity.activityLog,
  };
}
