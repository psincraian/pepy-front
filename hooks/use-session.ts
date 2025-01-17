import { AuthSessionData } from "@/lib/authv2";
import { PublicAuthSessionData } from "@/lib/authv2";
import { useEffect, useState } from "react";
import { AuthSession } from "@/lib/auth-session";

export default function useSession() {
  const [session, setSession] = useState<AuthSession>(new AuthSession());
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchSession = async () => {
      try {
        const response = await fetch("/auth/session");
        if (response.ok) {
          const session = (await response.json()) as AuthSessionData;
          setSession(new AuthSession(session));
        }
      } finally {
        setLoading(false);
      }
    };
    fetchSession();
  }, []);

  const refreshSession = async () => {
    try {
      const response = await fetch("/auth/refresh-session", { method: "POST" });
      if (response.ok) {
        const newSessionData = (await response.json()) as PublicAuthSessionData;
        setSession(new AuthSession(newSessionData));
      }
    } catch (e) {
      console.error("Error refreshing session:", e);
    }
  };

  return { session, loading, refreshSession };
}