"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { PublicAuthSessionData } from "@/lib/authv2";
import { AuthSession } from "@/lib/auth-session";

interface SessionContextType {
  session: AuthSession;
  loading: boolean;
  refreshSession: () => Promise<AuthSession>;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export const SessionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<AuthSession>(new AuthSession());
  const [loading, setLoading] = useState(true);

  const refreshSession = async () => {
    try {
      setLoading(true);
      const response = await fetch("/auth/refresh-session", { method: "POST" });
      if (response.ok) {
        const newSessionData = (await response.json()) as PublicAuthSessionData;
        setSession(new AuthSession(newSessionData));
        setLoading(false);
        scheduleSessionRefresh(newSessionData.accessTokenExpiresAt!);
        return new AuthSession(newSessionData);
      }

      throw new Error("Failed to refresh session");
    } catch (e) {
      setLoading(false);
      console.error("Error refreshing session:", e);
      throw e;
    }
  };

  const scheduleSessionRefresh = (expiresAt: number) => {
    const now = Date.now();
    const delta = 1000 * 60 * 5; // 5 minutes
    const timeUntilExpiration = expiresAt - now - delta;
    console.log("Scheduling session refresh in", timeUntilExpiration, "ms");
    if (timeUntilExpiration > 0) {
      setTimeout(refreshSession, timeUntilExpiration);
    }
  };

  useEffect(() => {
    refreshSession();
  }, []);

  return (
    <SessionContext.Provider value={{ session, loading, refreshSession }}>
      {children}
    </SessionContext.Provider>
  );
};

export default function useSession() {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSessionContextContext must be used within a SessionProvider");
  }
  return context;
};