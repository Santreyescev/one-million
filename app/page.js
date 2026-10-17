"use client";
import { useEffect, useState } from "react";
import backgroundImage from "./one-million-background.png";

export default function Home() {
  const [joined, setJoined] = useState(0);

  useEffect(() => {
    async function loadCount() {
      try {
        const response = await fetch("/api/stats");
        const data = await response.json();

        setJoined(data.joined || 0);
      } catch (error) {
        console.error("FAILED TO LOAD COUNT:", error);
      }
    }

    loadCount();
  }, []);
  return (
    <main
  style={{
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    color: "white",
    padding: "20px",
    position: "relative",
   background: `linear-gradient(rgba(0,0,0,0.28), rgba(0,0,0,0.45)), url(${backgroundImage.src}) center / cover no-repeat`,
  }}
>
      <div
  style={{
    position: "relative",
    zIndex: 1,
    width: "100%",
    maxWidth: "1000px",
  }}
>
        <p
          style={{
            letterSpacing: "6px",
            fontSize: "14px",
            marginBottom: "15px",
          }}
        >
          A GLOBAL EXPERIMENT
        </p>

        <h1
          style={{
            fontSize: "clamp(42px, 8vw, 72px)",
            margin: "0",
            fontWeight: "800",
          }}
        >
          ONE MILLION
        </h1>

        <h2
          style={{
            fontSize: "clamp(20px, 4vw, 28px)",
            marginTop: "15px",
          }}
        >
          $1. 1 Person. 1 Million People.
        </h2>

        <p
  style={{
    maxWidth: "600px",
    margin: "25px auto",
    fontSize: "18px",
    lineHeight: "1.6",
    opacity: "0.8",
    textAlign: "center",
    padding: "0 20px",
  }}
>
  Can one million people around the world come together, one dollar at a time, to help people in need?
</p>
<p
  style={{
    margin: "14px auto 8px",
    fontSize: "16px",
    lineHeight: "1.5",
    fontWeight: "600",
  }}
>
  Claim your $1 spot and be part of something bigger.
</p>

<p
  style={{
    maxWidth: "650px",
    margin: "8px auto 24px",
    fontSize: "13px",
    lineHeight: "1.5",
    opacity: "0.7",
    padding: "0 20px",
  }}
>
  Funds are intended to support people in need. We’ll clearly share how contributions are used and distributed.
</p>

        <form action="/api/checkout" method="POST">
  <button
    type="submit"
   style={{
  padding: "18px 42px",
  fontSize: "17px",
  fontWeight: "700",
  border: "1px solid rgba(255,255,255,0.35)",
  borderRadius: "50px",
  cursor: "pointer",
  background: "white",
  color: "#111",
  boxShadow: "0 8px 30px rgba(255,255,255,0.12)",
  transition: "all 0.25s ease",
}}
  >
    CLAIM MY $1 SPOT
  </button>
</form>

        <div style={{ marginTop: "30px" }}>
          <h3
            style={{
              fontSize: "36px",
              marginBottom: "5px",
            }}
          >
            {joined}
          </h3>

          <p style={{ opacity: "0.6" }}>
            OF 1,000,000 PEOPLE JOINED
          </p>
<div
  style={{
    width: "380px",
    maxWidth: "80vw",
    height: "4px",
    background: "#222",
    borderRadius: "20px",
    margin: "18px auto 0",
    overflow: "hidden",
  }}
>
  <div
  style={{
    width: `${Math.min((joined / 1000000) * 100, 100)}%`,
    height: "100%",
    background: "white",
    transition: "width 0.5s ease",
  }}
/>
</div>
<p
  style={{
    marginTop: "10px",
    fontSize: "16px",
    opacity: "0.75",
  }}
>
  {((joined / 1000000) * 100).toFixed(4)}% complete
</p>
        </div>
      </div>
    </main>
  );
}