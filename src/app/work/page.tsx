'use client';

import { WORKS } from "@/data/works";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { useRef } from "react";
import ParallaxImage from "@/components/ui/ParallaxImage";

export default function WorkPage() {
  const container = useRef(null);

  useGSAP(() => {
    // Staggered entrance
    gsap.from('.work-row', {
      y: 100,
      opacity: 0,
      duration: 1,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: container.current,
        start: "top 80%"
      }
    });
  }, { scope: container });

  return (
    <div ref={container} className="pt-40 pb-20 px-page-padding">
      <div className="mb-32">
        <h1 className="text-display uppercase font-bold tracking-tighter leading-[0.85] mb-8">
          Work<br />Archive
        </h1>
        <div className="h-[1px] w-full bg-black/10" />
      </div>

      <div className="flex flex-col">
        {WORKS.map((work, index) => (
          <Link
            key={work.id}
            href={`/work/${work.id}`}
            className="work-row group border-b border-black/10 py-20 flex flex-col md:flex-row gap-10 md:gap-20 transition-colors hover:bg-neutral-50"
          >
            {/* Index */}
            <span className="font-mono text-sm opacity-40 w-12 pt-2">0{index + 1}</span>

            {/* Main Content */}
            <div className="flex-1">
               <h2 className="text-6xl md:text-8xl font-bold uppercase tracking-tighter mb-4 group-hover:translate-x-4 transition-transform duration-500">
                 {work.title}
               </h2>
               <div className="flex gap-4 text-sm uppercase tracking-widest opacity-60">
                 <span>{work.category}</span>
                 <span>—</span>
                 <span>{work.year}</span>
               </div>
            </div>

            {/* Hover Image Reveal (Desktop) & Static Image (Mobile) */}
            <div className="w-full md:w-[400px] aspect-video md:aspect-[4/3] relative overflow-hidden bg-neutral-200">
               <div className="absolute inset-0 group-hover:scale-110 transition-transform duration-700">
                 <ParallaxImage src={work.coverImage} alt={work.title} speed={1.05} />
               </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}