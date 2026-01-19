'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { usePathname } from 'next/navigation';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia('(pointer: fine)').matches) {
      const cursor = cursorRef.current;
      const follower = followerRef.current;

      const moveCursor = (e: MouseEvent) => {
        gsap.to(cursor, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.1,
          ease: 'power2.out'
        });
        gsap.to(follower, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.6,
          ease: 'power3.out'
        });
      };

      const handleHover = () => {
        gsap.to(cursor, { scale: 0, duration: 0.3 });
        gsap.to(follower, { scale: 3, backgroundColor: 'rgba(255,255,255,1)', mixBlendMode: 'difference', duration: 0.3 });
      };

      const handleReset = () => {
        gsap.to(cursor, { scale: 1, duration: 0.3 });
        gsap.to(follower, { scale: 1, backgroundColor: 'transparent', mixBlendMode: 'normal', duration: 0.3 });
      };

      window.addEventListener('mousemove', moveCursor);

      // Attach to all interactables
      const interactables = document.querySelectorAll('a, button, .interactive');
      interactables.forEach(el => {
        el.addEventListener('mouseenter', handleHover);
        el.addEventListener('mouseleave', handleReset);
      });

      return () => {
        window.removeEventListener('mousemove', moveCursor);
        interactables.forEach(el => {
          el.removeEventListener('mouseenter', handleHover);
          el.removeEventListener('mouseleave', handleReset);
        });
      };
    }
  }, [pathname]); // Re-run on route change to re-bind listeners

  return (
    <>
      <div ref={cursorRef} className="fixed top-0 left-0 w-3 h-3 bg-black rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 hidden md:block" />
      <div ref={followerRef} className="fixed top-0 left-0 w-10 h-10 border border-black rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 hidden md:block transition-colors" />
    </>
  );
}