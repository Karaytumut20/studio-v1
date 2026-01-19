'use client';

import { ReactLenis } from 'lenis/react';
import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef(null);

  useGSAP(() => {
    function update(time: number) {
      // Integrate Lenis with GSAP ScrollTrigger
      ScrollTrigger.update();
    }

    const lenis = lenisRef.current?.lenis;
    if (lenis) {
      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);
    }
  });

  return (
    <ReactLenis
      root
      ref={lenisRef}
      autoRaf={false}
      options={{
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}