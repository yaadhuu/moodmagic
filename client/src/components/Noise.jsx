import React, { useEffect, useRef, useState } from 'react';

const Noise = ({
  patternSize = 250,
  patternScaleX = 1,
  patternScaleY = 1,
  patternRefreshInterval = 2, // in seconds
  patternAlpha = 15, // 0-255 for rgba alpha
}) => {
  const patternRef = useRef(null);
  const [seed, setSeed] = useState(0);

  useEffect(() => {
    let intervalId;
    if (patternRefreshInterval > 0) {
      intervalId = setInterval(() => {
        setSeed(Math.random()); // Change seed to re-render pattern
      }, patternRefreshInterval * 1000);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [patternRefreshInterval]);

  // Generate random dots for the noise pattern
  const generateNoisePattern = () => {
    const dots = [];
    for (let i = 0; i < (patternSize * patternSize) / 100; i++) { // Adjust density
      dots.push(
        <circle
          key={`${seed}-${i}`}
          cx={Math.random() * patternSize}
          cy={Math.random() * patternSize}
          r={0.5} // Small dots
          fill={`rgba(0,0,0, ${patternAlpha / 255})`}
        />
      );
    }
    return dots;
  };

  return (
    <div style={{
      position: 'absolute',
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      pointerEvents: 'none', // Allow clicks to pass through
      zIndex: 1, // Place it behind content but above background
    }}>
      <svg
        width="100%"
        height="100%"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          transform: `scaleX(${patternScaleX}) scaleY(${patternScaleY})`,
          transformOrigin: 'top left',
        }}
      >
        <defs>
          <pattern
            id={`noisePattern-${seed}`} // Use seed in ID to force re-render
            x="0"
            y="0"
            width={patternSize}
            height={patternSize}
            patternUnits="userSpaceOnUse"
            ref={patternRef}
          >
            {generateNoisePattern()}
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#noisePattern-${seed})`} />
      </svg>
    </div>
  );
};

export default Noise;