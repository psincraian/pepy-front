"use client";

import { CreditCard, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

async function getRedirectUrl() {
  const res = await fetch(`/api/v3/user/subscription-portal/session`, {
    method: "POST",
    headers: {
      "X-Api-Key": process.env.PEPY_API_KEY!
    }
  });

  const body = await res.json();
  return body["portalSessionUrl"];
}

interface SubscriptionsProps {
  isPro: boolean;
}

export function Subscriptions({ isPro }: SubscriptionsProps) {
  const [redirectUrl, setRedirectUrl] = useState<null | string>(null);

  if (redirectUrl === null) {
    getRedirectUrl().then(url => setRedirectUrl(url));
  }


  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Subscription</h2>
        <Button variant="outline" asChild>
          <a
            href={redirectUrl!}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center"
          >
            <CreditCard className="h-4 w-4 mr-2" />
            Manage Billing
            <ExternalLink className="h-4 w-4 ml-2" />
          </a>
        </Button>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <p className="font-medium">Current Plan</p>
              <Badge variant={isPro ? "default" : "secondary"}>
                {isPro ? "Pro" : "Free"}
              </Badge>
            </div>
            {isPro ? (
              <>
                <ul className="text-sm text-muted-foreground list-disc list-inside">
                  <li>100 API requests per minute</li>
                  <li>Advanced analytics</li>
                  <li>Geographic data</li>
                  <li>CI download filtering</li>
                  <li>Extended historical data</li>
                </ul>
              </>
            ) : (
              <>
                <p className="text-sm text-muted-foreground">
                  You&apos;re currently on the free plan
                </p>
                <ul className="text-sm text-muted-foreground list-disc list-inside">
                  <li>10 API requests per minute</li>
                  <li>Basic analytics</li>
                  <li>30-day historical data</li>
                </ul>
                <Button
                  className="mt-4 bg-blue-600 hover:bg-blue-700"
                  asChild
                >
                  <a href="/pricing">Upgrade to Pro</a>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}