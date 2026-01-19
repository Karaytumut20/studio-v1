'use client';

import { useRef, ReactNode } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface MagneticProps {
  children: ReactNode;
  className?: string;
  strength?: number; // How far it moves
  href?: string;
}

export default function MagneticButton({ children, className, strength = 0.5, href }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    const el = ref.current;
    if (!el) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { left, top, width, height } = el.getBoundingClientRect();
      const x = e.clientX - (left + width / 2);
      const y = e.clientY - (top + height / 2);

      gsap.to(el, {
        x: x * strength,
        y: y * strength,
        duration: 1,
        ease: "elastic.out(1, 0.3)"
      });

      if (textRef.current) {
        gsap.to(textRef.current, {
          x: x * (strength * 0.5),
          y: y * (strength * 0.5),
          duration: 1,
          ease: "elastic.out(1, 0.3)"
        });
      }
    };

    const handleMouseLeave = () => {
      gsap.to([el, textRef.current], {
        x: 0,
        y: 0,
        duration: 1,
        ease: "elastic.out(1, 0.3)"
      });
    };

    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, { scope: ref });

  const content = (
    <div
      ref={ref}
      className={cn("relative inline-flex items-center justify-center px-8 py-4 bg-black text-white rounded-full cursor-pointer overflow-hidden interactive", className)}
    >
      <span ref={textRef} className="relative z-10 flex items-center gap-2">
        {children}
      </span>
      {/* Hover Fill Effect */}
      <div className="absolute inset-0 bg-neutral-800 translate-y-full transition-transform duration-300 ease-[0.76,0,0.24,1] group-hover:translate-y-0" />
    </div>
  );

  if (href) {
    return <Link href={href} className="group inline-block">{content}</Link>;
  }

  return <div className="group inline-block">{content}</div>;
}