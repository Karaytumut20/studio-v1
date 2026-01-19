'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  speed?: number; // 1 = normal, >1 faster, <1 slower (but reverse direction needs logic)
}

export default function ParallaxImage({ src, alt, className, speed = 1.2 }: ParallaxImageProps) {
  const container = useRef(null);
  const img = useRef(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(img.current,
      {
        yPercent: -20,
        scale: 1.2
      },
      {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: container.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      }
    );
  }, { scope: container });

  return (
    <div ref={container} className={cn("relative overflow-hidden w-full h-full", className)}>
      <img
        ref={img}
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
      />
    </div>
  );
}