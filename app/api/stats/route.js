import { db } from "../../lib/firebaseAdmin";

export async function GET() {
  try {
    const doc = await db.collection("stats").doc("counter").get();

    const joined = doc.exists ? doc.data().joined || 0 : 0;

    return Response.json({ joined });
  } catch (error) {
    console.error("STATS ERROR:", error);

    return Response.json(
      { joined: 0, error: "Unable to load stats" },
      { status: 500 }
    );
  }
}