'use client';

import { WORKS } from "@/data/works";
import { useRef } from "react";
import Link from "next/link";
import ParallaxImage from "@/components/ui/ParallaxImage";
import TextReveal from "@/components/ui/TextReveal";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function WorkPage() {
  const container = useRef(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Grid elemanlarının sırayla (stagger) gelmesi için basit bir animasyon
    const items = gsap.utils.toArray('.work-item');

    items.forEach((item: any, i) => {
      gsap.from(item, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: item,
          start: "top 85%",
        }
      });
    });

  }, { scope: container });

  return (
    <div ref={container} className="pt-32 pb-20 px-page-padding">
      <div className="mb-24">
        <h1 className="text-display uppercase font-light tracking-tighter leading-[0.85] mb-8">
          <TextReveal>Work</TextReveal>
          <TextReveal delay={0.1}>Archive</TextReveal>
        </h1>
        <div className="h-[1px] w-full bg-black/10 mt-8" />
      </div>

      {/* 2'li Grid Sistemi */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-24 md:gap-y-32">
        {WORKS.map((work, index) => (
          <Link
            key={work.id}
            href={`/work/${work.id}`}
            className="work-item group block w-full"
          >
            {/* Görsel Alanı */}
            <div className="w-full aspect-[4/3] overflow-hidden bg-neutral-100 mb-8 relative">
               <div className="absolute inset-0 group-hover:scale-105 transition-transform duration-1000 ease-[0.25,1,0.5,1]">
                 <ParallaxImage src={work.coverImage} alt={work.title} speed={1.1} />
               </div>
            </div>

            {/* İçerik Alanı */}
            <div className="flex flex-col gap-4">
               {/* Başlık ve Kategori */}
               <div className="flex justify-between items-baseline border-b border-black/10 pb-4">
                  <h2 className="text-h3 font-light uppercase tracking-tight group-hover:underline underline-offset-4 decoration-1">
                    {work.title}
                  </h2>
                  <span className="text-xs font-mono opacity-40 uppercase tracking-widest">
                    {work.category} — {work.year}
                  </span>
               </div>

               {/* Uzun Açıklama */}
               <p className="text-body font-light opacity-70 leading-relaxed text-justify">
                 {work.description}
               </p>

               {/* Read More Linki (Opsiyonel Estetik) */}
               <div className="pt-2">
                 <span className="text-xs uppercase tracking-widest opacity-40 group-hover:opacity-100 transition-opacity">
                   ( View Case )
                 </span>
               </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}