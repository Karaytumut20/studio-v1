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
    if (isInitialLoad) {
      // Temporarily lock scroll
      document.body.style.overflow = 'hidden';

      const tl = gsap.timeline({
        onComplete: () => {
          setIsInitialLoad(false);
          // UNLOCK SCROLL & HIDE ELEMENT
          document.body.style.overflow = '';
          if (containerRef.current) {
            gsap.set(containerRef.current, { display: 'none' });
          }
        }
      });

      const counter = { val: 0 };

      tl.to(counter, {
        val: 100,
        duration: 1.0,
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
    if (!isInitialLoad && containerRef.current) {
      // Make visible for transition
      gsap.set(containerRef.current, { display: 'flex', yPercent: 100 });

      const tl = gsap.timeline({
        onComplete: () => {
           // Hide again completely
           gsap.set(containerRef.current, { display: 'none' });
        }
      });

      tl.to(containerRef.current, {
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

  // SAFETY: If initial load is done, and we are not transitioning, ensure it's not blocking
  // But we handle this via GSAP display:none above.

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] bg-black text-white flex items-center justify-center overflow-hidden"
      // Added pointer-events-none to wrapper as a failsafe, but inner content needs events if interactive
      // Here it's just a preloader so it's fine.
    >
      <div className="absolute bottom-10 right-10 text-[10vw] font-bold leading-none opacity-20 select-none">
        <span ref={percentRef}>0%</span>
      </div>
    </div>
  );
}