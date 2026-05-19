export type PermissionAction = "view" | "create" | "update" | "delete";
export type PermissionResource = "orders" | "products" | "users" | "categories" | "settings" | "reports" | "activity";

export interface Permission {
  action: PermissionAction | "*";
  resource: PermissionResource | "*";
}

export type UserRole = "admin" | "manager" | "support" | "seller";

const permissions: Record<UserRole, Permission[]> = {
  admin: [
    { action: "*", resource: "*" },
  ],
  manager: [
    { action: "view", resource: "*" },
    { action: "update", resource: "orders" },
    { action: "update", resource: "products" },
    { action: "create", resource: "products" },
    { action: "view", resource: "reports" },
  ],
  support: [
    { action: "view", resource: "orders" },
    { action: "view", resource: "users" },
    { action: "update", resource: "orders" },
    { action: "view", resource: "activity" },
  ],
  seller: [
    { action: "view", resource: "orders" },
    { action: "view", resource: "products" },
    { action: "update", resource: "products" },
    { action: "view", resource: "categories" },
  ],
};

export function checkPermission(role: UserRole, action: PermissionAction, resource: PermissionResource): boolean {
  if (role === "admin") return true;
  
  const rolePermissions = permissions[role] || [];
  
  return rolePermissions.some((permission) => {
    const actionMatch = permission.action === "*" || permission.action === action;
    const resourceMatch = permission.resource === "*" || permission.resource === resource;
    return actionMatch && resourceMatch;
  });
}

export function getRolePermissions(role: UserRole): Permission[] {
  return permissions[role] || [];
}

export function getAllRoles(): UserRole[] {
  return ["admin", "manager", "support", "seller"];
}

export const roleLabels: Record<UserRole, string> = {
  admin: "مسؤول",
  manager: "مدير",
  support: "دعم",
  seller: "بائع",
};

export const roleColors: Record<UserRole, string> = {
  admin: "bg-red-50 text-red-600 dark:bg-red-900/20",
  manager: "bg-purple-50 text-purple-600 dark:bg-purple-900/20",
  support: "bg-sky-50 text-sky-600 dark:bg-sky-900/20",
  seller: "bg-amber-50 text-amber-600 dark:bg-amber-900/20",
};