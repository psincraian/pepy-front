"use client";

import Script from "next/script";
import AppBar from "@/app/components/app_bar";
import { useEffect, useState } from "react";
import { getCurrentUser, User } from "@/app/user/helper/auth";
import { Typography } from "@mui/material";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "stripe-pricing-table": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}

export default function Home() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    getCurrentUser(true).then((user) => {
      setCurrentUser(user);
      setLoaded(true);
    });
  }, []);

  console.log(currentUser);
  const stripePricingTable = (
    <>
      <stripe-pricing-table
        pricing-table-id="prctbl_1O3NjqLkhgcLjWWE4QWZ1F1G"
        publishable-key="pk_live_fGp4vBPOGSP5uIvvM2qXoQyZ006F0MCL4G"
        customer-email={currentUser?.email}
      ></stripe-pricing-table>
    </>
  );

  return (
    <>
      <Script src="https://js.stripe.com/v3/pricing-table.js" async={true} />
      <AppBar withSearch={true} />
      <main>
        <Typography variant="h2">Pricing</Typography>
        {loaded && stripePricingTable}
      </main>
    </>
  );
}
