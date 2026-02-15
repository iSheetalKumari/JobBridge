import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, { apiVersion: "2026-01-28.clover" });

export async function POST(req: Request) {
  try {
    const { priceId, successUrl, cancelUrl, customerEmail } = await req.json();
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "subscription",
      line_items: [{ price: priceId, quantity: 1 }],
      customer_email: customerEmail,
      success_url: successUrl,
      cancel_url: cancelUrl
    });
    return NextResponse.json({ url: session.url }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Stripe error" }, { status: 500 });
  }
}
