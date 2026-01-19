'use client';

import Link from 'next/link';
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function NotFound() {
  const container = useRef(null);

  useGSAP(() => {
    gsap.from('.error-char', {
      y: 100,
      opacity: 0,
      stagger: 0.1,
      duration: 1,
      ease: "power3.out",
      delay: 0.2
    });
  }, { scope: container });

  return (
    <div ref={container} className="h-screen w-full flex flex-col items-center justify-center bg-black text-white px-page-padding text-center">
       <div className="overflow-hidden mb-4">
         <h1 className="text-[15vw] font-bold leading-none tracking-tighter flex justify-center">
            <span className="error-char">4</span>
            <span className="error-char text-neutral-600">0</span>
            <span className="error-char">4</span>
         </h1>
       </div>
       <p className="text-xl uppercase tracking-widest opacity-60 mb-10 error-char">Page Not Found</p>

       <Link
         href="/"
         className="px-8 py-4 border border-white/20 rounded-full hover:bg-white hover:text-black transition-all duration-300 uppercase text-sm error-char"
       >
         Return Home
       </Link>
    </div>
  );
}