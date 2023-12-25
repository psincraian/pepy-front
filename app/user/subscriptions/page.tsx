"use client";

import AppBar from "@/app/components/app_bar";
import { useEffect, useState } from "react";
import React from "react";
import { Grid } from "@mui/material";
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
    updateSubscriptions();
  }, []);

  function updateSubscriptions() {
    getSubscriptions()
      .then((result) => {
        setSubscriptions(result);
      })
      .catch((err) => console.error(err));
  }


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
                <SubscriptionCard project={subscription.project} onSuccess={() => updateSubscriptions()} />
              </Grid>
            );
          })}
        </Grid>
      </main>
    </div>
  )
    ;
}
