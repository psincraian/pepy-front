"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import PublicPriceComponent from "@/app/pricing/components/price";
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

async function getCustomerSecret() {
  const res = await fetch(`/api/v3/user/subscription-portal/customer-session`, {
    method: "POST",
    headers: {
      "X-Api-Key": process.env.PEPY_API_KEY!
    }
  });

  const body = await res.json();
  return body["customerSecret"];
}

export default function Home() {
  const {user, error} = useUser();
  const [customerSecret, setCustomerSecret] = useState<null|String>(null);

  useEffect(() => {
    if (user !== null) {
      getCustomerSecret().then(secret => setCustomerSecret(secret));
    }
  }, [user]);

  console.log("Customer Secret", customerSecret)
  const stripePricingTable = (
    <>
      <stripe-pricing-table
        pricing-table-id="prctbl_1O3NjqLkhgcLjWWE4QWZ1F1G"
        publishable-key="pk_live_fGp4vBPOGSP5uIvvM2qXoQyZ006F0MCL4G"
        customer-session-client-secret={customerSecret}
      ></stripe-pricing-table>
    </>
  );

  const pricingTable = user === null ? (<PublicPriceComponent />) : stripePricingTable;

  return (
    <>
      <Script src="https://js.stripe.com/v3/pricing-table.js" async={true} />
      <main>
        {pricingTable}
      </main>
    </>
  );
}
