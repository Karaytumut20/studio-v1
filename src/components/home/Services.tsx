'use client';

import { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { cn } from '@/lib/utils';
import useIsMobile from '@/hooks/use-is-mobile';

const SERVICES_DATA = [
  { id: '01', title: 'Creative Direction', image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1200&auto=format&fit=crop' },
  { id: '02', title: 'Web Design', image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1200&auto=format&fit=crop' },
  { id: '03', title: 'Development', image: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=1200&auto=format&fit=crop' },
  { id: '04', title: 'Brand Strategy', image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1200&auto=format&fit=crop' },
];

export default function Services() {
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useGSAP(() => {
    if (isMobile) return; // Disable GSAP hover logic on mobile

    const cursor = cursorRef.current;
    if (!cursor) return;

    const handleMove = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.6,
        ease: 'power3.out'
      });
    };

    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, { scope: sectionRef, dependencies: [isMobile] });

  return (
    <section ref={sectionRef} className="py-32 relative z-10 bg-white">
      {/* Floating Image Container (Desktop Only) */}
      {!isMobile && (
        <div
          ref={cursorRef}
          className={cn(
            "fixed top-0 left-0 w-[300px] h-[400px] pointer-events-none z-20 overflow-hidden rounded-lg transition-opacity duration-300",
            activeImage ? "opacity-100" : "opacity-0"
          )}
          style={{ transform: 'translate(-50%, -50%)' }}
        >
          <div className="relative w-full h-full bg-neutral-900">
             {activeImage && (
               <img
                 src={activeImage}
                 alt="Service Preview"
                 className="w-full h-full object-cover animate-in fade-in zoom-in duration-500"
               />
             )}
          </div>
        </div>
      )}

      <div className="px-page-padding">
        <h2 className="text-sm uppercase tracking-widest opacity-50 mb-12 border-b border-black/10 pb-4">Our Expertise</h2>

        <div className="flex flex-col">
          {SERVICES_DATA.map((item) => (
            <div
              key={item.id}
              className="group relative border-b border-black/10 py-12 flex justify-between items-center cursor-pointer transition-colors hover:bg-neutral-50"
              onMouseEnter={() => setActiveImage(item.image)}
              onMouseLeave={() => setActiveImage(null)}
            >
              <div className="flex items-baseline gap-8 md:gap-16">
                <span className="font-mono text-sm opacity-40">/{item.id}</span>
                <h3 className="text-5xl md:text-8xl font-medium uppercase tracking-tighter group-hover:translate-x-4 transition-transform duration-500 ease-out">
                  {item.title}
                </h3>
              </div>
              <span className="hidden md:block text-xl opacity-0 group-hover:opacity-100 -translate-x-10 group-hover:translate-x-0 transition-all duration-300">
                ( View )
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}