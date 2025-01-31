"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import useSessionContext from "@/hooks/session-context";

interface RequireAdminProps {
  children: React.ReactNode;
}

export function RequireAdmin({ children }: RequireAdminProps) {
  const { session, loading } = useSessionContext();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!session.isLoggedIn || !session.isAdmin())) {
      router.replace("/user/login");
    }
  }, [session, loading, router]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!session.isLoggedIn || !session.isAdmin()) {
    return null;
  }

  return <>{children}</>;
}