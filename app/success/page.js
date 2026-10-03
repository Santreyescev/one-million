"use client";

import { Suspense, useEffect, useState, useRef } from "react";
import { useSearchParams } from "next/navigation";

 function SuccessContent() {
  const searchParams = useSearchParams();
const [spotNumber, setSpotNumber] = useState(null);
const shareCardRef = useRef(null);
const storyCardRef = useRef(null);


const shareUrl =
  typeof window !== "undefined" ? window.location.origin : "";

const shareText = spotNumber
  ? `I'm #${spotNumber} of 1,000,000 🌎 I claimed my $1 spot in the One Million experiment. Can we reach one million people?`
  : "Join the One Million experiment 🌎";

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
const downloadShareCard = async () => {
  if (!shareCardRef.current) 
  
  return;

  const html2canvas = (await import("html2canvas")).default;

  const canvas = await html2canvas(shareCardRef.current, {
    backgroundColor: "#080808",
    scale: 2,
  });

  const link = document.createElement("a");
  link.download = `one-million-spot-${spotNumber}.png`;
  link.href = canvas.toDataURL("image/png");
  link.click();
};

const shareCardImage = async () => {
  if (!shareCardRef.current) return;

  const html2canvas = (await import("html2canvas")).default;

  const canvas = await html2canvas(shareCardRef.current, {
    backgroundColor: "#080808",
    scale: 2,
  });

  canvas.toBlob(async (blob) => {
    if (!blob) return;

    const file = new File(
      [blob],
      `one-million-spot-${spotNumber}.png`,
      { type: "image/png" }
    );

    if (
      navigator.share &&
      navigator.canShare &&
      navigator.canShare({ files: [file] })
    ) {
      await navigator.share({
        title: "One Million",
        text: shareText,
        files: [file],
      });
    } else {
      downloadShareCard();
    }
  }, "image/png");
};

const downloadStoryCard = async () => {
  if (!storyCardRef.current) return;

  const html2canvas = (await import("html2canvas")).default;

  const canvas = await html2canvas(storyCardRef.current, {
    backgroundColor: "#080808",
    scale: 2,
  });

  const link = document.createElement("a");
  link.download = `one-million-story-${spotNumber}.png`;
  link.href = canvas.toDataURL("image/png");
  link.click();
};

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
<div
  style={{
    marginTop: "30px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    alignItems: "center",
  }}
>
  <p
    style={{
      fontSize: "14px",
      letterSpacing: "2px",
      opacity: "0.6",
    }}
  >
    SHARE YOUR SPOT
</p>

<div
  ref={shareCardRef}
  style={{
    width: "min(520px, 90vw)",
    padding: "35px 25px",
    marginBottom: "25px",
    border: "1px solid rgba(255,255,255,0.25)",
    borderRadius: "24px",
    background: "rgba(255,255,255,0.05)",
    textAlign: "center",
  }}
>
  <p
    style={{
      fontSize: "12px",
      letterSpacing: "4px",
      opacity: "0.7",
      marginBottom: "20px",
    }}
  >
    ONE MILLION
  </p>

  <h2
    style={{
      fontSize: "36px",
      marginBottom: "15px",
    }}
  >
    I&apos;M #{spotNumber} OF 1,000,000 🌎
  </h2>

  <p
    style={{
      fontSize: "18px",
      marginBottom: "10px",
    }}
  >
    I claimed my $1 spot.
  </p>

  <p
    style={{
      fontSize: "15px",
      opacity: "0.7",
    }}
  >
    Can we reach one million people?
  </p>
</div>

<div
  ref={storyCardRef}
  style={{
    position: "fixed",
    left: "-9999px",
    top: "0",
    width: "540px",
    height: "960px",
    background: "#080808",
    color: "white",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    padding: "60px",
    boxSizing: "border-box",
  }}
>
  <p
    style={{
      fontSize: "18px",
      letterSpacing: "8px",
      opacity: "0.7",
      marginBottom: "60px",
    }}
  >
    ONE MILLION
  </p>

  <h2
    style={{
      fontSize: "72px",
      marginBottom: "20px",
      lineHeight: "1.1",
    }}
  >
    I&apos;M #{spotNumber}
  </h2>

  <h3
    style={{
      fontSize: "34px",
      marginBottom: "45px",
    }}
  >
    OF 1,000,000 🌎
  </h3>

  <p
    style={{
      fontSize: "28px",
      marginBottom: "20px",
    }}
  >
    I claimed my $1 spot.
  </p>

  <p
    style={{
      fontSize: "24px",
      opacity: "0.75",
      marginBottom: "60px",
    }}
  >
    Can we reach one million people?
  </p>

  <div
    style={{
      border: "1px solid rgba(255,255,255,0.3)",
      borderRadius: "50px",
      padding: "18px 30px",
      fontSize: "20px",
      letterSpacing: "2px",
    }}
  >
    JOIN THE EXPERIMENT
  </div>
</div>



  <div
    style={{
      display: "flex",
      gap: "10px",
      flexWrap: "wrap",
      justifyContent: "center",
    }}
  >
    <a
      href={`https://wa.me/?text=${encodeURIComponent(
        `${shareText} ${shareUrl}`
      )}`}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        padding: "12px 18px",
        borderRadius: "30px",
        background: "#fff",
        color: "#111",
        textDecoration: "none",
        fontWeight: "700",
      }}
    >
      WhatsApp
    </a>

    <a
      href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
        shareText
      )}&url=${encodeURIComponent(shareUrl)}`}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        padding: "12px 18px",
        borderRadius: "30px",
        background: "#fff",
        color: "#111",
        textDecoration: "none",
        fontWeight: "700",
      }}
    >
      X
    </a>

    <a
      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        shareUrl
      )}`}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        padding: "12px 18px",
        borderRadius: "30px",
        background: "#fff",
        color: "#111",
        textDecoration: "none",
        fontWeight: "700",
      }}
    >
      Facebook
    </a>

    <button
      onClick={() => navigator.clipboard.writeText(shareUrl)}
      style={{
        padding: "12px 18px",
        borderRadius: "30px",
        border: "none",
        background: "#fff",
        color: "#111",
        fontWeight: "700",
        cursor: "pointer",
      }}
    >
      Copy Link
    </button>
  </div>
</div>
<div
  style={{
    display: "flex",
    gap: "12px",
    justifyContent: "center",
    flexWrap: "wrap",
    marginTop: "18px",
  }}
>
  <button
    onClick={shareCardImage}
    style={{
      padding: "14px 24px",
      borderRadius: "30px",
      border: "none",
      cursor: "pointer",
      fontWeight: "700",
    }}
  >
    SHARE IMAGE
  </button>

  <button
    onClick={downloadShareCard}
    style={{
      padding: "14px 24px",
      borderRadius: "30px",
      border: "none",
      cursor: "pointer",
      fontWeight: "700",
    }}
  >
    DOWNLOAD CARD
  </button>
<button
  onClick={downloadStoryCard}
  style={{
    padding: "14px 24px",
    borderRadius: "30px",
    border: "none",
    cursor: "pointer",
    fontWeight: "700",
  }}
>
  DOWNLOAD STORY CARD
</button>
</div>
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