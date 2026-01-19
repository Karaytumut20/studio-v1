'use client';

import { WORKS } from "@/data/works";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import ParallaxImage from "@/components/ui/ParallaxImage";

export default function ProjectsSection() {
  const container = useRef(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    const cards = gsap.utils.toArray('.project-item');

    cards.forEach((card: any) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: "top bottom-=100",
          toggleActions: "play none none reverse"
        },
        y: 100,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      });
    });
  }, { scope: container });

  return (
    <section ref={container} className="py-32 px-page-padding bg-neutral-100">
      <div className="flex justify-between items-end mb-20">
        <h2 className="text-h2 uppercase font-bold tracking-tight">Selected<br/>Works</h2>
        <Link href="/work" className="text-lg underline underline-offset-4 hidden md:block">View All Projects</Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 gap-y-32">
        {WORKS.slice(0, 4).map((work, i) => (
          <Link href={`/work/${work.id}`} key={work.id} className="project-item group block w-full">
            <div className="w-full aspect-[4/3] overflow-hidden bg-gray-200 mb-6 relative">
              <div className="absolute inset-0 group-hover:scale-105 transition-transform duration-700 ease-[0.76,0,0.24,1]">
                 {/* FIXED: Using coverImage instead of image */}
                 <ParallaxImage src={work.coverImage} alt={work.title} speed={1.1} />
              </div>
            </div>
            <div className="flex justify-between items-start border-t border-black/10 pt-4">
               <div>
                  <h3 className="text-3xl uppercase font-medium mb-1">{work.title}</h3>
                  <p className="text-sm opacity-60">{work.category}</p>
               </div>
               <span className="text-sm font-mono opacity-40">0{i + 1}</span>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-20 text-center md:hidden">
        <Link href="/work" className="inline-block px-8 py-4 border border-black rounded-full uppercase text-sm">View All Projects</Link>
      </div>
    </section>
  );
}