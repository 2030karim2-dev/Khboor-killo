"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";
import { User } from "./types";

export type { User } from "./types";

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
  login: (email: string, password: string) => Promise<boolean>;
  register: (data: RegisterData) => Promise<boolean>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = "khuboor_auth";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    if (typeof window === "undefined") return null;
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        const u = parsed?.user;
        if (
          u &&
          typeof u === "object" &&
          typeof u.id === "string" &&
          typeof u.email === "string" &&
          typeof u.firstName === "string"
        ) {
          return u as User;
        }
        localStorage.removeItem(STORAGE_KEY);
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
    return null;
  });
  const [isLoading, setIsLoading] = useState(false);

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 800));

    if (password.length < 8) {
      setIsLoading(false);
      return false;
    }

    const mockUser: User = {
      id: crypto.randomUUID().slice(0, 8),
      firstName: "أحمد",
      lastName: "محمد",
      email,
      phone: "0501234567",
      city: "الرياض",
    };

    setUser(mockUser);
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ user: mockUser }));
    document.cookie = `${STORAGE_KEY}=1; path=/; max-age=${60 * 60 * 24 * 30}; SameSite=Lax`;
    setIsLoading(false);
    return true;
  }, []);

  const register = useCallback(async (data: RegisterData): Promise<boolean> => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1000));

    const newUser: User = {
      id: crypto.randomUUID().slice(0, 8),
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      city: "الرياض",
    };

    setUser(newUser);
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ user: newUser }));
    document.cookie = `${STORAGE_KEY}=1; path=/; max-age=${60 * 60 * 24 * 30}; SameSite=Lax`;
    setIsLoading(false);
    return true;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
    document.cookie = `${STORAGE_KEY}=; path=/; max-age=0`;
  }, []);

  const updateProfile = useCallback((data: Partial<User>) => {
    setUser((prev) => {
      if (!prev) return prev;
      const updated = { ...prev, ...data };
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ user: updated }));
      return updated;
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        updateProfile,
      }}
    >
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
