// app/checkout-sessions/route.ts
import { NextResponse } from "next/server";
import Stripe from "stripe";
import {stripe} from "@/lib/stripe";

// data needed for checkout
export interface CheckoutSubscriptionBody {
    plan: string;
    planDescription: string;
    amount: number;
    interval: "month" | "year";
    customerEmail: string;
}

export async function POST(req: Request) {
    const body = (await req.json()) as CheckoutSubscriptionBody;
    const origin = req.headers.get("origin") || "http://localhost:3000";
    // if user is logged in, redirect to thank you page, otherwise redirect to signup page.
    const success_url = `${origin}/checkout/thankyou?session_id={CHECKOUT_SESSION_ID}`;

    try {
        var customerId = undefined;
        if (body.customerEmail) {
            console.log("Checking if customer exists with email {}", body.customerEmail)
            const customers = await stripe.customers.search({
                query: `email:"${body.customerEmail}"`,
            })

            customerId = "";
            if (customers.data.length === 0) {
                console.log("Customer not found, creating new customer with email {}", body.customerEmail)
                const response = await stripe.customers.create({
                    email: body.customerEmail
                });
                console.log("Customer created with id {}", response.id)
                customerId = response.id;
            } else {
                customerId = customers.data[0].id;
            }
        }

        const session = await stripe.checkout.sessions.create({
            // if user is logged in, stripe will set the email in the checkout page
            customer: customerId,
            mode: "subscription", // mode should be subscription
            line_items: [
                // generate inline price and product
                {
                    price_data: {
                        currency: "usd",
                        recurring: {
                            interval: body.interval,
                        },
                        unit_amount: body.amount,
                        product_data: {
                            name: body.plan,
                            description: body.planDescription,
                        },
                    },
                    quantity: 1,
                },
            ],
            success_url: success_url,
            cancel_url: `${origin}/checkout/cancel?session_id={CHECKOUT_SESSION_ID}`,
        });
        return NextResponse.json(session);
    } catch (error) {
        if (error instanceof Stripe.errors.StripeError) {
            const { message } = error;
            return NextResponse.json({ message }, { status: error.statusCode });
        }
    }
}
