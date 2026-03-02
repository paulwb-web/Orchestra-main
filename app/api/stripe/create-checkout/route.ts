import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const TOKENS_BY_PACK: Record<string, number> = { test: 1, standard: 30, premium: 70 };

export async function POST(req: Request) {
  const stripeKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeKey) return NextResponse.json({ error: "Stripe not configured" }, { status: 500 });
  const stripe = new Stripe(stripeKey);
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const body = await req.json();
  const packId = body.packId as string;
  if (!packId || !TOKENS_BY_PACK[packId]) {
    return NextResponse.json({ error: "Invalid pack" }, { status: 400 });
  }

  const priceIdKey = `STRIPE_PRICE_ID_${packId.toUpperCase()}` as const;
  const priceId = process.env[priceIdKey];
  if (!priceId) {
    return NextResponse.json({ error: "Stripe not configured for this pack" }, { status: 500 });
  }

  const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
  const checkoutSession = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${baseUrl}?checkout=success`,
    cancel_url: `${baseUrl}?checkout=cancel`,
    client_reference_id: user.id,
    metadata: { userId: user.id, packId, tokens: String(TOKENS_BY_PACK[packId]) },
  });

  return NextResponse.json({ url: checkoutSession.url });
}
