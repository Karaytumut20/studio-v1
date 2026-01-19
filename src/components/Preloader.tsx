'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { usePathname } from 'next/navigation';

export default function Preloader() {
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const percentRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    // Initial Load Animation
    if (isInitialLoad) {
      const tl = gsap.timeline({
        onComplete: () => setIsInitialLoad(false)
      });

      const counter = { val: 0 };

      tl.to(counter, {
        val: 100,
        duration: 1.5,
        ease: "power2.inOut",
        onUpdate: () => {
          if (percentRef.current) {
            percentRef.current.innerText = Math.floor(counter.val) + '%';
          }
        }
      })
      .to(containerRef.current, {
        yPercent: -100,
        duration: 0.8,
        ease: "power3.inOut"
      });
    }
  }, [isInitialLoad]);

  // Route Transition Animation
  useEffect(() => {
    if (!isInitialLoad) {
      // Simple wipe effect on route change
      // In a real production app, use useTransitionContext to orchestrate exit/enter
      const tl = gsap.timeline();
      tl.set(containerRef.current, { yPercent: 100 })
        .to(containerRef.current, {
          yPercent: 0,
          duration: 0.4,
          ease: "power2.out"
        })
        .to(containerRef.current, {
          yPercent: -100,
          duration: 0.6,
          ease: "power2.inOut",
          delay: 0.1
        });
    }
  }, [pathname, isInitialLoad]);

  if (!isInitialLoad && typeof window !== 'undefined') {
    // Keep it in DOM for transitions, handle visibility via CSS or Z-index
  }

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] bg-black text-white flex items-center justify-center overflow-hidden"
    >
      <div className="absolute bottom-10 right-10 text-[10vw] font-bold leading-none opacity-20 select-none">
        <span ref={percentRef}>0%</span>
      </div>
    </div>
  );
}