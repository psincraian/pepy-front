// components/MonthlySubscriptionCard.tsx
"use client";

import { loadStripe } from "@stripe/stripe-js";
import Stripe from "stripe";
import {Button, Card, CardActions, CardContent, Typography} from "@mui/material";

const MonthlySubscriptionCard = () => {
    const handleClick = async () => {
        // step 1: load stripe
        const STRIPE_PK = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!;
        const stripe = await loadStripe(STRIPE_PK);


        // step 3: make a post fetch api call to /checkout-session handler
        const result = await fetch("/api/v3/checkout/checkout-session", {
            method: "post",
            headers: {
                "content-type": "application/json",
            },
        });

        // step 4: get the data and redirect to checkout using the sessionId
        const data = (await result.json()) as Stripe.Checkout.Session;
        const sessionId = data.id!;
        stripe?.redirectToCheckout({ sessionId });
    };
    // render a simple card
    return (
        <Card>
            <CardContent>
                <Typography variant="h5">Monthly Subscription</Typography>
                <Typography variant="body1">$20 per month</Typography>
            </CardContent>
            <CardActions>
                <Button onClick={() => handleClick()}>Subscribe</Button>
            </CardActions>
        </Card>
    );
};
export default MonthlySubscriptionCard;

