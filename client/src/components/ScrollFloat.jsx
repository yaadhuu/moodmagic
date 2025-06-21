import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ScrollFloat = ({
  children,
  animationDuration = 1,
  ease = 'back.inOut(2)',
  scrollStart = 'top bottom',
  scrollEnd = 'bottom top',
  stagger = 0,
}) => {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;

    gsap.fromTo(
      element,
      {
        y: 'random(-50, 50)', // Start at a random Y offset
        opacity: 0,
        scale: 0.8,
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: animationDuration,
        ease: ease,
        stagger: stagger,
        scrollTrigger: {
          trigger: element,
          start: scrollStart,
          end: scrollEnd,
          scrub: true,
          // markers: true, // Uncomment for debugging scroll trigger
        },
      }
    );
  }, [animationDuration, ease, scrollStart, scrollEnd, stagger]);

  return <div ref={ref}>{children}</div>;
};

export default ScrollFloat;