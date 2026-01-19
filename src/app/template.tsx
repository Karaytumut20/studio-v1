'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { usePathname } from 'next/navigation';

export default function Template({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useGSAP(() => {
    // Reset scroll just in case
    window.scrollTo(0, 0);

    const tl = gsap.timeline();

    // Entrance Animation
    tl.set(overlayRef.current, { scaleY: 1, transformOrigin: 'top 50%' })
      .to(overlayRef.current, {
        scaleY: 0,
        duration: 0.8,
        ease: 'power4.inOut',
        delay: 0.1
      })
      .from(containerRef.current, {
        y: 50,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out',
        clearProps: 'all'
      }, '-=0.4');

  }, { scope: containerRef, dependencies: [pathname] });

  return (
    <div className="relative w-full min-h-screen">
      {/* Transition Overlay (Black Curtain) */}
      <div
        ref={overlayRef}
        className="fixed inset-0 bg-black z-[9998] pointer-events-none"
        style={{ transformOrigin: 'top 50%' }}
      />

      <div ref={containerRef} className="w-full">
        {children}
      </div>
    </div>
  );
}