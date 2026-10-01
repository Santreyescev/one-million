import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  try {
    const origin = new URL(request.url).origin;
    const session = await stripe.checkout.sessions.create({
      mode: "payment",

      line_items: [
        {
          price_data: {
            currency: "usd",

            product_data: {
              name: "One Million — $1 Spot",
              description: "Join the One Million global experiment",
            },

            unit_amount: 100,
          },

          quantity: 1,
        },
      ],

     success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
cancel_url: `${origin}/`,
    });

    return Response.redirect(session.url, 303);
  } catch (error) {
  console.error("CHECKOUT ERROR:", error);

  return Response.json(
    {
      error: error?.message || "Unable to create checkout session",
    },
    { status: 500 }
  );
}
}