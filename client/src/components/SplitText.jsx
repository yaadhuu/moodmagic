// client/src/components/SplitText.jsx
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const SplitText = ({
  text,
  className,
  delay = 100,
  duration = 0.5,
  ease = "power3.out",
  splitType = "chars", // This prop isn't fully utilized as it always splits by chars here
  from,
  to,
  onLetterAnimationComplete,
}) => {
  const container = useRef();

  useEffect(() => {
    const letters = container.current.querySelectorAll("span");
    gsap.fromTo(
      letters,
      from,
      {
        ...to,
        stagger: 0.05,
        duration,
        ease,
        delay: delay / 1000,
        onComplete: onLetterAnimationComplete,
      }
    );
  }, []);

  return (
    <div className={className} ref={container}>
      {text.split("").map((char, i) => (
        <span key={i} style={{ display: "inline-block" }}>
          {char}
        </span>
      ))}
    </div>
  );
};

export default SplitText;