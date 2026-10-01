"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

 function SuccessContent() {
  const searchParams = useSearchParams();
const [spotNumber, setSpotNumber] = useState(null);

  useEffect(() => {
    const sessionId = searchParams.get("session_id");

    if (!sessionId) return;

    async function confirmPayment() {
      try {
        const response = await fetch("/api/confirm", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ sessionId }),
        });

        const data = await response.json();

console.log("CONFIRM RESULT:", data);

if (data.spotNumber) {
  setSpotNumber(data.spotNumber);
}
      } catch (error) {
        console.error("CONFIRM FAILED:", error);
      }
    }

    confirmPayment();
  }, [searchParams]);

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        background: "#080808",
        color: "white",
        padding: "20px",
      }}
    >
      <div>
        <p
          style={{
            letterSpacing: "5px",
            fontSize: "13px",
            opacity: "0.7",
            marginBottom: "20px",
          }}
        >
          ONE MILLION
        </p>

        <h1
          style={{
            fontSize: "64px",
            marginBottom: "20px",
          }}
        >
          YOU&apos;RE IN 🎉
        </h1>

        <p
          style={{
            fontSize: "22px",
            marginBottom: "15px",
          }}
        >
          {spotNumber
  ? `Your spot is #${spotNumber}.`
  : "Confirming your spot..."}
        </p>

        <p
          style={{
            fontSize: "17px",
            opacity: "0.7",
            marginBottom: "35px",
          }}
        >
          Welcome to the One Million global experiment.
        </p>

        <a
          href="/"
          style={{
            display: "inline-block",
            padding: "16px 30px",
            background: "white",
            color: "black",
            borderRadius: "50px",
            fontWeight: "700",
            textDecoration: "none",
          }}
        >
          BACK TO HOME
        </a>
      </div>
    </main>
  );
}

export default function Success() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SuccessContent />
    </Suspense>
  );
}