"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import useSession from "@/hooks/use-session";

interface RequireAdminProps {
  children: React.ReactNode;
}

export function RequireAdmin({ children }: RequireAdminProps) {
  const { session, loading } = useSession();
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