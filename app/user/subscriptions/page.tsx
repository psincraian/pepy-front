"use client";

import AppBar from "@/app/components/app_bar";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { getCurrentUser, signout, User } from "@/app/user/helper/auth";
import { useEffect, useState } from "react";
import ApiKeyTable from "@/app/user/components/api_keys_table";
import React from "react";
import ManageSubscriptionButton from "@/app/user/components/CustomerSubscriptionPortal";
import { Grid } from "@mui/material";
import { Card } from "@mui/material";
import { CardHeader } from "@mui/material";
import { CardContent } from "@mui/material";
import { ApiKey } from "@/app/user/model";
import { SubscriptionCard } from "@/app/user/subscriptions/components/SubscriptionCard";

interface Subscription {
  project: string;
}

async function getSubscriptions() {
  console.log("Start fetching subscriptions");
  const response = await fetch("/api/v3/subscriptions", {
    method: "GET",
    headers: {}
  });
  const body = await response.json();
  console.log("Api keys fetched", body);
  return body.map((subscription: any) => subscription as Subscription);
}

export default function Home() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);

  useEffect(() => {
    getSubscriptions()
      .then((result) => {
        setSubscriptions(result);
      })
      .catch((err) => console.error(err));
  }, []);


  return (
    <div>
      <header>
        <AppBar />
      </header>
      <main>
        <h1>
          Subscriptions
        </h1>
        <Grid container spacing={2} justifyContent={"center"}>
          {subscriptions.map((subscription) => {
            return (
              <Grid key={subscription.project} item xs={12} md={7}>
                <SubscriptionCard project={subscription.project} />
              </Grid>
            );
          })}
        </Grid>
      </main>
    </div>
  )
    ;
}
