"use client";

import Script from "next/script";
import AppBar from "@/app/components/app_bar";
import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { PriceComponent } from "@/app/pricing/components/price";
import { useUser } from "@/app/user/UserContext";

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
  const [loaded, setLoaded] = useState(false);
  const {user, error} = useUser();


  console.log(user);
  const stripePricingTable = (
    <>
      <stripe-pricing-table
        pricing-table-id="prctbl_1O3NjqLkhgcLjWWE4QWZ1F1G"
        publishable-key="pk_live_fGp4vBPOGSP5uIvvM2qXoQyZ006F0MCL4G"
        customer-email={user?.email}
      ></stripe-pricing-table>
    </>
  );

  const pricingTable = user === null ? (<PriceComponent />) : stripePricingTable;

  return (
    <>
      <Script src="https://js.stripe.com/v3/pricing-table.js" async={true} />
      <AppBar withSearch={true} />
      <main>
        <Typography variant="h2">Pricing</Typography>
        {loaded && pricingTable}
      </main>
    </>
  );
}
