"use client";

import { createContext, useContext, useState, useCallback, useMemo, type ReactNode, useEffect } from "react";
import { User } from "../types/user";
import { createToken, validateSession } from "@/lib/security";
export type { User } from "../types/user";

interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; token?: string; user?: User }>;
  register: (data: RegisterData) => Promise<{ success: boolean; token?: string; user?: User }>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USER_STORAGE_KEY = "khuboor_user";
const TOKEN_STORAGE_KEY = "khuboor_auth_token";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    if (typeof window === "undefined") return null;
    try {
      const storedUser = localStorage.getItem(USER_STORAGE_KEY);
      const storedToken = localStorage.getItem(TOKEN_STORAGE_KEY);
      
      if (storedUser && storedToken) {
        const parsedUser = JSON.parse(storedUser);
        if (
          parsedUser &&
          typeof parsedUser === "object" &&
          typeof parsedUser.id === "string" &&
          typeof parsedUser.email === "string"
        ) {
          return parsedUser as User;
        }
      }
      localStorage.removeItem(USER_STORAGE_KEY);
      localStorage.removeItem(TOKEN_STORAGE_KEY);
      return null;
    } catch {
      localStorage.removeItem(USER_STORAGE_KEY);
      localStorage.removeItem(TOKEN_STORAGE_KEY);
      return null;
    }
  });
  const [isLoading, setIsLoading] = useState(false);

  // التحقق من الجلسة عند التهيئة
  useEffect(() => {
    const checkSession = async () => {
      const token = localStorage.getItem(TOKEN_STORAGE_KEY);
      if (token) {
        const session = await validateSession(token);
        if (!session) {
          setUser(null);
          localStorage.removeItem(USER_STORAGE_KEY);
          localStorage.removeItem(TOKEN_STORAGE_KEY);
          document.cookie = `khuboor_auth=; path=/; max-age=0`;
        }
      }
    };
    checkSession();
  }, []);

  const login = useCallback(async (email: string, password: string): Promise<{ success: boolean; token?: string; user?: User }> => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 800));

    if (password.length < 4) {
      setIsLoading(false);
      return { success: false };
    }

    const mockUser: User = {
      id: "usr_" + crypto.randomUUID().slice(0, 8),
      firstName: "أحمد",
      lastName: "محمد",
      email,
      phone: "0501234567",
      city: "الرياض",
      role: email.includes("admin") ? "admin" : "buyer",
    };

    const token = await createToken({
      userId: mockUser.id,
      role: mockUser.role || "buyer",
      email: mockUser.email,
    });

    setUser(mockUser);
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(mockUser));
    localStorage.setItem(TOKEN_STORAGE_KEY, token);
    
    // تحديث الـ cookie للـ middleware
    document.cookie = `khuboor_auth=${token}; path=/; max-age=604800; SameSite=Strict`;
    setIsLoading(false);
    return { success: true, token, user: mockUser };
  }, []);

  const register = useCallback(async (data: RegisterData): Promise<{ success: boolean; token?: string; user?: User }> => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1000));

    const newUser: User = {
      id: "usr_" + crypto.randomUUID().slice(0, 8),
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      city: "الرياض",
      role: "buyer",
    };

    const token = await createToken({
      userId: newUser.id,
      role: newUser.role || "buyer",
      email: newUser.email,
    });

    setUser(newUser);
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(newUser));
    localStorage.setItem(TOKEN_STORAGE_KEY, token);
    document.cookie = `khuboor_auth=${token}; path=/; max-age=604800; SameSite=Strict`;
    setIsLoading(false);
    return { success: true, token, user: newUser };
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem(USER_STORAGE_KEY);
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    document.cookie = `khuboor_auth=; path=/; max-age=0`;
    document.cookie = `khuboor_auth=; path=/; max-age=0; domain=${window.location.hostname}`;
  }, []);

  const updateProfile = useCallback((data: Partial<User>) => {
    setUser((prev) => {
      if (!prev) return prev;
      const updated = { ...prev, ...data };
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  // التحقق من الجلسة عند التهيئة
  useEffect(() => {
    const checkSession = async () => {
      const token = localStorage.getItem(TOKEN_STORAGE_KEY);
      if (token) {
        const session = await validateSession(token);
        if (!session) {
          setUser(null);
          localStorage.removeItem(USER_STORAGE_KEY);
          localStorage.removeItem(TOKEN_STORAGE_KEY);
          document.cookie = `khuboor_auth=; path=/; max-age=0`;
        }
      }
    };
    checkSession();
  }, []);

  const isAuthenticated = !!user;

  const value = useMemo(
    () => ({ user, isAuthenticated, isLoading, login, register, logout, updateProfile }),
    [user, isAuthenticated, isLoading, login, register, logout, updateProfile]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
