"use client";

import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { useUser } from "@/app/user/UserContext";
import { User } from "@/lib/auth";
import { useState } from "react";
import { useRouter } from "next/navigation";


function SubscriptionButtons(user: User | null, loading: boolean, subscriptionClick: (planFrequency: PlanFrequency) => void) {
  const isSubscribed = user !== null && user.isPro;

  if (isSubscribed) {
    return <>
      <p className="text-green-500 text-center">You are already subscribed!</p>
      <Button className="w-full bg-blue-600 hover:bg-blue-700">
        <Link href="/user">
          View Your Profile
        </Link>
      </Button>
    </>;
  }

  return <>
    <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={() => subscriptionClick(PlanFrequency.MONTHLY)}>
      {loading ? "Loading..." : "Subscribe Monthly"}
    </Button>
    <Button className="w-full bg-indigo-600 hover:bg-indigo-700"
            onClick={() => subscriptionClick(PlanFrequency.YEARLY)}>
      {loading ? "Loading..." : "Subscribe Yearly (Save 17%)"}
    </Button>
  </>;
}

enum PlanFrequency {
  MONTHLY,
  YEARLY
}

export default function Pricing() {
  const [loading, setLoading] = useState<boolean>(false);
  const { user } = useUser();
  const router = useRouter();

  function handleSubscriptionClick(planFrequency: PlanFrequency) {
    if (user === null) {
      console.log(user);
      router.push("/user/login");
      return;
    }

    setLoading(true);
    const subscriptionType = planFrequency === PlanFrequency.MONTHLY ? "MONTHLY" : "YEARLY";
    const url = `/api/v3/checkout/session/${subscriptionType}`;
    fetch(url, { method: "POST" })
      .then((response) => response.json())
      .then((data) => {
        if (data.sessionUrl) {
          setLoading(false);
          router.push(data.sessionUrl);
        } else {
          setLoading(false);
          console.error("No session URL received from the server.");
        }
      });
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
        <p className="text-xl text-muted-foreground">
          Choose the plan that best fits your needs
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Free Plan */}
        <Card className="p-6 flex flex-col">
          <div className="flex-1">
            <h3 className="text-2xl font-bold mb-2">Free</h3>
            <p className="text-muted-foreground mb-4">Perfect for getting started</p>
            <div className="mb-6">
              <span className="text-4xl font-bold">$0</span>
              <span className="text-muted-foreground">/month</span>
            </div>
            <ul className="space-y-3 mb-6">
              <li className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                Basic package statistics
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                API access (10 req/min)
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                30-day historical data
              </li>
              <li className="flex items-center text-muted-foreground">
                <Check className="h-5 w-5 mr-2 opacity-50" />
                Supported by ads
              </li>
            </ul>
          </div>
          <Button className="w-full mt-auto" variant="outline">
            <Link href="/user/signup">
              Get Started
            </Link>
          </Button>
        </Card>

        {/* Pro Plan */}
        <Card className="p-6 border-blue-600 border-2 relative flex flex-col">
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
            <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
              Popular
            </span>
          </div>
          <div className="flex-1">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-2xl font-bold">Pro</h3>
                <p className="text-muted-foreground">For serious developers</p>
              </div>
              <div className="text-right">
                <div className="flex items-center justify-end">
                  <span className="text-4xl font-bold">$5</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  or $50/year (2 months free)
                </div>
              </div>
            </div>
            <ul className="space-y-3 mb-6">
              <li className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                Everything in Free
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                No advertisements
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                1 year of historical data
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                Downloads per country
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                API access (100 req/min)
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                CI downloads filtering (coming soon)
              </li>
            </ul>
          </div>
          <div className="space-y-3 mt-auto">
            {SubscriptionButtons(user, loading, handleSubscriptionClick)}
          </div>
        </Card>
      </div>

      <div className="mt-12 text-center text-sm text-muted-foreground">
        <p>All prices are in USD. Subscriptions are automatically renewed unless canceled.</p>
        <p className="mt-1">Need custom solutions? <a href="/contact" className="text-blue-600 hover:underline">Contact
          us</a></p>
      </div>
    </div>
  );
}