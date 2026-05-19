"use client";

import { createContext, useContext, useEffect, type ReactNode } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { checkPermission, type UserRole, type PermissionAction, type PermissionResource } from "@/lib/permissions";

interface AdminProviderContextType {
  role: UserRole | null;
  hasPermission: (action: PermissionAction, resource: PermissionResource) => boolean;
}

const AdminProviderContext = createContext<AdminProviderContextType | undefined>(undefined);

export function useAdminProvider() {
  const context = useContext(AdminProviderContext);
  if (!context) {
    throw new Error("useAdminProvider must be used within AdminProvider");
  }
  return context;
}

export function AdminProvider({ 
  children, 
  requiredRole = "admin" 
}: { 
  children: ReactNode;
  requiredRole?: UserRole;
}) {
  const { user, isAuthenticated, isLoading } = useAuth();

  const role = (user?.role as UserRole) || null;
  
  const hasPermission = (action: PermissionAction, resource: PermissionResource): boolean => {
    if (!role) return false;
    return checkPermission(role, action, resource);
  };

  useEffect(() => {
    if (!isLoading && isAuthenticated && user?.role !== requiredRole && user?.role !== "admin") {
      const event = new CustomEvent("admin:access-denied", {
        detail: { requiredRole, actualRole: user?.role },
      });
      window.dispatchEvent(event);
    }
  }, [isLoading, isAuthenticated, user, requiredRole]);

  return (
    <AdminProviderContext.Provider value={{ role, hasPermission }}>
      {children}
    </AdminProviderContext.Provider>
  );
}