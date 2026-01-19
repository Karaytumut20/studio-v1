'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';

interface TextRevealProps {
  children: string;
  className?: string;
  delay?: number;
  threshold?: number;
}

export default function TextReveal({
  children,
  className,
  delay = 0,
  threshold = 0.2
}: TextRevealProps) {
  const container = useRef<HTMLDivElement>(null);

  // Metni kelimelere bölerek her birini maskelemek için span içine alıyoruz
  const words = children.split(' ');

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    const wordElements = container.current?.querySelectorAll('.word-inner');

    if (wordElements) {
      gsap.fromTo(wordElements,
        {
          y: '100%',
          opacity: 0
        },
        {
          y: '0%',
          opacity: 1,
          duration: 1.2,
          stagger: 0.02,
          ease: 'power4.out',
          delay: delay,
          scrollTrigger: {
            trigger: container.current,
            start: `top ${window.innerHeight * (1 - threshold)}px`,
            toggleActions: 'play none none reverse'
          }
        }
      );
    }
  }, { scope: container });

  return (
    <div ref={container} className={cn("relative leading-tight overflow-hidden", className)}>
      <span className="sr-only">{children}</span>
      <div className="flex flex-wrap gap-x-[0.25em] gap-y-1">
        {words.map((word, i) => (
          <span key={i} className="relative overflow-hidden inline-block">
            <span className="word-inner block translate-y-full will-change-transform">
              {word}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}