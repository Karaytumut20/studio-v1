'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';

interface MarqueeProps {
  text: string;
  className?: string;
  repeat?: number;
}

export default function Marquee({ text, className, repeat = 4 }: MarqueeProps) {
  const firstText = useRef(null);
  const secondText = useRef(null);
  const slider = useRef(null);
  let xPercent = 0;
  let direction = -1;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    requestAnimationFrame(animation);

    gsap.to(slider.current, {
      scrollTrigger: {
        trigger: document.documentElement,
        start: 0,
        end: window.innerHeight,
        scrub: 0.25,
        onUpdate: e => direction = e.direction * -1
      },
      x: "-=300px",
    });
  }, []);

  const animation = () => {
    if (xPercent <= -100) {
      xPercent = 0;
    }
    if (xPercent > 0) {
      xPercent = -100;
    }
    gsap.set(firstText.current, { xPercent: xPercent });
    gsap.set(secondText.current, { xPercent: xPercent });
    xPercent += 0.05 * direction; // Speed
    requestAnimationFrame(animation);
  }

  return (
    <div className="relative flex h-[20vw] overflow-hidden bg-black text-white items-center">
      <div ref={slider} className="absolute whitespace-nowrap flex">
        <h1 ref={firstText} className={cn("text-[15vw] font-bold uppercase leading-none pr-10", className)}>
          {Array(repeat).fill(text).map((t, i) => <span key={i} className="mr-10">{t} —</span>)}
        </h1>
        <h1 ref={secondText} className={cn("text-[15vw] font-bold uppercase leading-none pr-10", className)}>
          {Array(repeat).fill(text).map((t, i) => <span key={i} className="mr-10">{t} —</span>)}
        </h1>
      </div>
    </div>
  );
}