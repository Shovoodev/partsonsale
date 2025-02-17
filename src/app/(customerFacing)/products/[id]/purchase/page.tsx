import db from "@/db/db";
import { notFound } from "next/navigation";
import Stripe from "stripe";
import { CheckoutForm } from "./_components/CheckoutForm";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export default async function PurchasePage({
  params: { id },
}: {
  params: { id: string };
}) {
  const product = await db.product.findUnique({ where: { id } });
  console.log(product);

  if (product === null) return notFound();

  const paymentIntent = stripe.paymentIntents.create({
    amount: product.priceInCents,
    currency: "USD",
    metadata: { productId: product.id },
  });

  if ((await paymentIntent).client_secret === null) {
    throw Error("stripe failed to create payment");
  }
  const clientSecrets = (await paymentIntent).client_secret || "";
  return <CheckoutForm product={product} clientSecret={clientSecrets} />;
}
