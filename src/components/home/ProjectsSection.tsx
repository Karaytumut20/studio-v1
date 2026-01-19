'use client';

import { WORKS } from "@/data/works";
import { useRef } from "react";
import Link from "next/link";
import ParallaxImage from "@/components/ui/ParallaxImage";
import TextReveal from "@/components/ui/TextReveal";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ProjectsSection() {
  const container = useRef(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    const cards = gsap.utils.toArray('.home-project-item');

    cards.forEach((card: any) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: "top bottom-=100",
        },
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out"
      });
    });
  }, { scope: container });

  return (
    <section ref={container} className="py-32 px-page-padding bg-white">
      <div className="flex justify-between items-end mb-20 border-b border-black/10 pb-10">
        <h2 className="text-h2 uppercase font-light tracking-tight leading-none">
          <TextReveal>Selected</TextReveal>
          <TextReveal delay={0.1}>Works</TextReveal>
        </h2>
        <Link href="/work" className="text-sm uppercase tracking-widest underline underline-offset-4 hidden md:block hover:opacity-60 transition-opacity">
          View All Projects
        </Link>
      </div>

      {/* 2'li Grid - Anasayfa Limiti: İlk 4 proje */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-24 md:gap-y-32">
        {WORKS.slice(0, 4).map((work, i) => (
          <Link href={`/work/${work.id}`} key={work.id} className="home-project-item group block w-full">
            {/* Görsel */}
            <div className="w-full aspect-[4/3] overflow-hidden bg-gray-100 mb-8 relative">
              <div className="absolute inset-0 group-hover:scale-105 transition-transform duration-1000 ease-out">
                 <ParallaxImage src={work.coverImage} alt={work.title} speed={1.1} />
              </div>
            </div>

            {/* İçerik */}
            <div className="flex flex-col gap-4">
               <div className="flex justify-between items-baseline border-b border-black/10 pb-4">
                  <h3 className="text-3xl uppercase font-light mb-1 group-hover:translate-x-2 transition-transform duration-300">
                    {work.title}
                  </h3>
                  <span className="text-xs font-mono opacity-40">0{i + 1}</span>
               </div>

               {/* Uzun Açıklama */}
               <p className="text-body font-light opacity-70 leading-relaxed line-clamp-4 md:line-clamp-none">
                  {work.description}
               </p>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-20 text-center md:hidden">
        <Link href="/work" className="inline-block px-8 py-4 border border-black rounded-full uppercase text-xs tracking-widest">
          View All Projects
        </Link>
      </div>
    </section>
  );
}