"use client";

import dynamic from "next/dynamic";
import React from "react";

// Dynamically import the PianoRoll component without SSR
const PianoRoll = dynamic(() => import("../components/PianoRoll"), {
  ssr: false,
});

export default function Home() {
  return (
    <div style={{ padding: "1rem" }}>
      <h1>compose-ai: Real-Time Music Collaboration</h1>
      <p>Build chords and melodies together, in real time!</p>
      <PianoRoll />
    </div>
  );
}
