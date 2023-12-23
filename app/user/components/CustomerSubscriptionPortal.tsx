import styles from "@/app/user/components/api_keys_table.module.css";
import React from "react";
import { useState } from "react";
import { useRouter } from 'next/navigation'
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
  const router = useRouter()

  if (redirectUrl === null) {
    getRedirectUrl().then(url => setRedirectUrl(url));
  }

  return (
        <Button variant="contained" fullWidth disabled={redirectUrl === null} onClick={x => router.push(redirectUrl as string)}>
          Manage Pro subscription
        </Button>
  );
}