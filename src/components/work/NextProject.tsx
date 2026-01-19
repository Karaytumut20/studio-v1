'use client';

import Link from 'next/link';
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { WorkItem } from '@/data/works';

export default function NextProject({ project }: { project: WorkItem }) {
  const container = useRef(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const el = container.current;
    if(!el) return;

    const moveCursor = (e: MouseEvent) => {
        if(!cursorRef.current) return;
        const rect = (el as HTMLElement).getBoundingClientRect();
        // Check if mouse is inside
        if(e.clientY >= rect.top && e.clientY <= rect.bottom) {
             gsap.to(cursorRef.current, {
                 x: e.clientX,
                 y: e.clientY,
                 opacity: 1,
                 duration: 0.5,
                 ease: "power3.out"
             });
        } else {
             gsap.to(cursorRef.current, { opacity: 0 });
        }
    };

    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, { scope: container });

  return (
    <Link href={`/work/${project.id}`} className="block group">
      <section ref={container} className="py-40 px-page-padding bg-black text-white relative overflow-hidden cursor-none">

        {/* Custom Next Cursor */}
        <div
            ref={cursorRef}
            className="fixed top-0 left-0 w-32 h-32 bg-white text-black rounded-full flex items-center justify-center pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 opacity-0 mix-blend-difference"
        >
            <span className="uppercase text-sm font-bold tracking-widest">Next</span>
        </div>

        <div className="flex flex-col items-center justify-center text-center z-10 relative">
          <span className="text-sm uppercase tracking-widest opacity-50 mb-4">Next Project</span>
          <h2 className="text-6xl md:text-9xl font-bold uppercase tracking-tighter group-hover:italic transition-all duration-500">
            {project.title}
          </h2>
          <div className="mt-8 overflow-hidden h-[1px] w-full max-w-md bg-white/20">
             <div className="w-full h-full bg-white -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-[0.76,0,0.24,1]" />
          </div>
        </div>
      </section>
    </Link>
  );
}