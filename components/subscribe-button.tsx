"use client";

import { useEffect, useState } from "react";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button";
import { CheckCircle, Loader2, XCircle } from "lucide-react";
import type { VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { SignInToSubscribeDialog } from "@/components/sign-in-to-subscribe-dialog";
import useSessionContext from "@/hooks/session-context";


async function subscribe(project: string): Promise<"error" | "success"> {
  console.log("Fetching data for", project);
  const res = await fetch(`/api/v3/subscriptions`, {
    method: "POST",
    body: JSON.stringify({
      "project": project
    }),
    headers: {
      "Content-Type": "application/json"
    }
  });
  if (res.status !== 200) {
    return "error";
  }

  return "success";
}

async function getIsSubscribed(project: string): Promise<boolean> {
  console.log("Fetching data for", project);
  const res = await fetch(`/api/v3/subscriptions/`, {
    method: "GET",
  });
  if (res.status !== 200) {
    return false;
  }

  const response = await res.json();
  for (const subscription of response) {
    if (subscription.project === project) {
      return true;
    }
  }
  return false;
}

export interface SubscribeButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  project: string;
}


export function SubscribeButton({ project, className }: SubscribeButtonProps) {
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoginDialogOpen, setLoginDialogOpen] = useState(false);
  const { session, loading } = useSessionContext();

  useEffect(() => {
    if (loading || !session.isLoggedIn) {
      return;
    }

    getIsSubscribed(project).then(response => {
      setIsSubscribed(response);
    }).catch(err => setError("Failed to check subscription status"));
  }, [project, session]);

  const handleSubscribe = async () => {
    if (!session.isLoggedIn) {
      setLoginDialogOpen(true);
      return;
    }

    setIsLoading(true);
    setError(null);
    const response = await subscribe(project);

    if (response === "error") {
      setError("Failed to subscribe");
      setIsLoading(false);

      return;
    }

    setIsSubscribed(true);
    setIsLoading(false);
  };

  if (isSubscribed === null) {
    return (
      <Button className={cn(className)} disabled>
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Checking status...
      </Button>
    );
  }

  if (isSubscribed) {
    return (
      <Button className={cn(className)} variant="secondary" disabled>
        <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
        Subscribed
      </Button>
    );
  }

  return (
    <>
      <Button
        onClick={handleSubscribe}
        disabled={isLoading}
        variant={error ? "destructive" : "default"}
        className={cn(className)}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Subscribing...
          </>
        ) : error ? (
          <>
            <XCircle className="mr-2 h-4 w-4" />
            {error}
          </>
        ) : (
          "Subscribe"
        )}
      </Button>
      <SignInToSubscribeDialog open={isLoginDialogOpen} onClose={() => setLoginDialogOpen(false)} />
    </>

  );
}
