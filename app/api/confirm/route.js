import Stripe from "stripe";
import { db } from "../../lib/firebaseAdmin";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  try {
    const { sessionId } = await request.json();

    if (!sessionId) {
      return Response.json(
        { error: "Missing sessionId" },
        { status: 400 }
      );
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== "paid") {
      return Response.json(
        { error: "Payment not completed" },
        { status: 400 }
      );
    }

   const participantRef = db.collection("participants").doc(session.id);
const counterRef = db.collection("stats").doc("counter");

let alreadyCounted = false;
let spotNumber = null

await db.runTransaction(async (transaction) => {
  const participantSnap = await transaction.get(participantRef);

 if (participantSnap.exists) {
  alreadyCounted = true;
  spotNumber = participantSnap.data().spotNumber;
  return;
}

  const counterSnap = await transaction.get(counterRef);

  const currentJoined = counterSnap.exists
    ? counterSnap.data().joined || 0
    : 0;

  const newJoined = currentJoined + 1;
spotNumber = newJoined;

  transaction.set(
    counterRef,
    { joined: newJoined },
    { merge: true }
  );

  transaction.set(participantRef, {
    spotNumber: newJoined,
    paid: true,
    stripeSessionId: session.id,
    createdAt: new Date(),
  });
});

return Response.json({
  success: true,
  alreadyCounted,
  spotNumber,
});

   
  } catch (error) {
    console.error("CONFIRM ERROR:", error);

    return Response.json(
      { error: error?.message || "Unable to confirm payment" },
      { status: 500 }
    );
  }
}