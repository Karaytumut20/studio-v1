'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { usePathname } from 'next/navigation';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    // Only run on desktop
    const isDesktop = window.matchMedia('(pointer: fine)').matches;
    if (!isDesktop) return;

    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    // Initial State
    gsap.set(cursor, { xPercent: -50, yPercent: -50 });
    gsap.set(follower, { xPercent: -50, yPercent: -50 });

    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.1, ease: 'power2.out' });
      gsap.to(follower, { x: e.clientX, y: e.clientY, duration: 0.6, ease: 'power3.out' });
    };

    const handleHover = () => {
      gsap.to(cursor, { scale: 0, duration: 0.3 });
      gsap.to(follower, { scale: 3, backgroundColor: '#fff', mixBlendMode: 'difference', duration: 0.3 });
    };

    const handleReset = () => {
      gsap.to(cursor, { scale: 1, duration: 0.3 });
      gsap.to(follower, { scale: 1, backgroundColor: 'transparent', mixBlendMode: 'normal', duration: 0.3 });
    };

    window.addEventListener('mousemove', moveCursor);

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
  }, [pathname]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[10000] hidden md:block mix-blend-difference">
      <div ref={cursorRef} className="absolute top-0 left-0 w-3 h-3 bg-white rounded-full" />
      <div ref={followerRef} className="absolute top-0 left-0 w-10 h-10 border border-white rounded-full transition-colors" />
    </div>
  );
}