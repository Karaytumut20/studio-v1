'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { usePathname } from 'next/navigation';

export default function Preloader() {
  const [isComplete, setIsComplete] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const percentRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Track if animation has run to prevent strict mode double-fire
  const didRun = useRef(false);

  useEffect(() => {
    // Prevent double execution in Strict Mode
    if (didRun.current) return;
    didRun.current = true;

    // Lock scroll
    document.body.style.overflow = 'hidden';
    document.body.style.cursor = 'wait';

    const tl = gsap.timeline({
      onComplete: () => {
        // UNLOCK EVERYTHING
        document.body.style.overflow = '';
        document.body.style.cursor = '';

        // KILL THE COMPONENT
        setIsComplete(true);
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
      duration: 0.7,
      ease: "power3.inOut"
    });

    // Cleanup failsafe
    return () => {
      document.body.style.overflow = '';
      document.body.style.cursor = '';
    };
  }, []);

  // Simple route transition logic (Optional: disabled for stability first)
  /* useEffect(() => {
    if (isComplete) {
       // Route transition logic here if needed later
    }
  }, [pathname, isComplete]);
  */

  // IF COMPLETE, RENDER NOTHING (Fixes all scroll/click blocking issues)
  if (isComplete) return null;

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