'use client';

import { WORKS } from "@/data/works";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

export default function WorkPage() {
  const container = useRef(null);

  useGSAP(() => {
    const projects = gsap.utils.toArray('.project-card');

    projects.forEach((project: any) => {
      gsap.from(project, {
        scrollTrigger: {
          trigger: project,
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
    <div ref={container} className="px-page-padding py-20">
      <h1 className="text-h1 mb-20 uppercase font-bold">Selected Works</h1>

      <div className="grid grid-cols-1 gap-y-32">
        {WORKS.map((work, index) => (
          <div key={work.id} className="project-card group cursor-pointer border-t border-black/10 pt-8">
            <div className="flex flex-col md:flex-row justify-between mb-8">
              <div className="flex gap-4 items-baseline">
                <span className="text-sm font-mono">0{index + 1}</span>
                <h2 className="text-4xl md:text-6xl font-medium uppercase group-hover:italic transition-all duration-300">{work.title}</h2>
              </div>
              <div className="flex flex-col text-right mt-4 md:mt-0 opacity-60">
                <span className="uppercase text-sm tracking-widest">{work.category}</span>
                <span className="text-sm">{work.year}</span>
              </div>
            </div>

            <div className="relative w-full aspect-video overflow-hidden bg-gray-200">
               {/* Note: Using standard img tag for bootstrap simplicity without configuring external domains in next.config immediately,
                   but code is setup for Image component usage if domain is added */}
               <img
                 src={work.image}
                 alt={work.title}
                 className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700 ease-[0.76,0,0.24,1]"
               />
            </div>

            <div className="mt-6 flex justify-between items-center">
               <p className="max-w-md text-lg">{work.description}</p>
               <div className="w-12 h-12 rounded-full border border-black flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors duration-300">
                 →
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}