"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useMemo,
  type ReactNode,
} from "react";
import { useAuth } from "./AuthContext";

interface Referral {
  id: string;
  referredUserId: string;
  referredUserName: string;
  rewardPoints: number;
  status: "pending" | "completed" | "rewarded";
  createdAt: string;
}

interface ReferralStats {
  totalReferrals: number;
  successfulReferrals: number;
  pendingReferrals: number;
  totalPointsEarned: number;
}

interface ReferralContextType {
  referrals: Referral[];
  stats: ReferralStats;
  referralLink: string;
  copyReferralLink: () => Promise<void>;
  generateNewCode: () => void;
  isLoading: boolean;
}

const ReferralContext = createContext<ReferralContextType | undefined>(undefined);

const STORAGE_KEY = "khuboor_referrals";

function loadReferralsFromStorage(): Referral[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function ReferralProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [referrals, setReferrals] = useState<Referral[]>(loadReferralsFromStorage);
  const [isLoading] = useState(false);

  const referralLink = useMemo(() => {
    if (!user?.id) return "https://khuboor.com/register";
    return `https://khuboor.com/register?ref=${user.id}`;
  }, [user?.id]);

  const stats = useMemo<ReferralStats>(() => ({
    totalReferrals: referrals.length,
    successfulReferrals: referrals.filter(r => r.status === "completed").length,
    pendingReferrals: referrals.filter(r => r.status === "pending").length,
    totalPointsEarned: referrals
      .filter(r => r.status === "rewarded")
      .reduce((sum, r) => sum + r.rewardPoints, 0),
  }), [referrals]);

  useEffect(() => {
    if (referrals.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(referrals));
    }
  }, [referrals]);

  const copyReferralLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
    } catch {
      console.error("Failed to copy referral link");
    }
  }, [referralLink]);

  const generateNewCode = useCallback(() => {
    if (!user?.id) return;
    console.log("Generating new referral code for:", user.id);
  }, [user]);

  const value = useMemo(
    () => ({
      referrals,
      stats,
      referralLink,
      copyReferralLink,
      generateNewCode,
      isLoading,
    }),
    [referrals, stats, referralLink, copyReferralLink, generateNewCode, isLoading]
  );

  return (
    <ReferralContext.Provider value={value}>
      {children}
    </ReferralContext.Provider>
  );
}

export function useReferral() {
  const context = useContext(ReferralContext);
  if (!context) {
    throw new Error("useReferral must be used within a ReferralProvider");
  }
  return context;
}