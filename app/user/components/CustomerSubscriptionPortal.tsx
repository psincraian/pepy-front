import styles from "@/app/user/components/api_keys_table.module.css";
import React from "react";
import { useState } from "react";
import { LoadingButton } from "@mui/lab";
import { Button } from "@mui/material";
import { redirect } from "next/navigation";


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

export default function ManageSubscriptionButton() {
  const [redirectUrl, setRedirectUrl] = useState<null|string>(null);
  const [clicked, setClicked] = useState(false);

  if (redirectUrl === null) {
    getRedirectUrl().then(url => setRedirectUrl(url));
  }

  if (clicked && redirectUrl !== null) {
    console.log("Redirecting...")
    redirect(redirectUrl);
  }

  return (
        <Button variant="contained" fullWidth onClick={x => setClicked(true)}>
          Manage subscriptions
        </Button>
  );
}