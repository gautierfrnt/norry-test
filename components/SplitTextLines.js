"use client";

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

const SplitTextLines = ({ children, className = "", delay = 0, stagger = 0.1, duration = 0.6 }) => {
  const textRef = useRef(null);

  useEffect(() => {
    const element = textRef.current;
    if (!element) return;

    const split = new SplitText(element, { type: "lines" });

    gsap.from(split.lines, {
      opacity: 0,
      y: 20,
      stagger: stagger,
      duration: duration,
      ease: "power2.out",
      scrollTrigger: {
        trigger: element,
        start: "top 85%",
        toggleActions: "play none none none"
      }
    });

    return () => {
      split.revert();
    };
  }, [stagger, duration]);

  return (
    <div ref={textRef} className={className}>
      {children}
    </div>
  );
};

export default SplitTextLines;
