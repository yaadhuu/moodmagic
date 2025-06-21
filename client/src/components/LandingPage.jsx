// client/src/components/LandingPage.jsx
import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import NET from "vanta/dist/vanta.net.min";
// Removed: import "../styles/LandingPage.css"; // Styles now in App.css

export default function LandingPage({ onEnter }) {
  const vantaRef = useRef(null);

  useEffect(() => {
    // Vanta.js setup for a white background, black net
    const effect = NET({
      el: vantaRef.current,
      THREE,
      mouseControls: true,
      touchControls: false,
      gyroControls: false,
      backgroundColor: 0xfefefe, // Near white background for Vanta
      color: 0x1a1a1a,           // Dark points/lines (nearly black)
      points: 10,                 // Fewer points for cleaner look
      spacing: 15,
      showLines: true,
    });
    return () => effect?.destroy();
  }, []);

  return (
    <div className="landing-section" ref={vantaRef}>
      <div className="landing-content">
        <h1 className="landing-logo">Mood Magic</h1>
        <p className="landing-tagline">Feel the vibe. Choose your mood.</p>
        <button className="enter-btn" onClick={onEnter}>
          Enter Experience
        </button>
      </div>
    </div>
  );
}