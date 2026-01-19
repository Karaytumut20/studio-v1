'use client';

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import Button from "@/components/ui/Button";
import Marquee from "@/components/ui/Marquee";
import Services from "@/components/home/Services";
import ProjectsSection from "@/components/home/ProjectsSection";

export default function Home() {
  const container = useRef(null);
  const titleRef = useRef(null);

  useGSAP(() => {
    // Intro Animation
    const tl = gsap.timeline({ delay: 0.8 }); // Wait for page transition

    tl.from(titleRef.current, {
      y: '100%',
      opacity: 0,
      duration: 1.5,
      ease: "power4.out"
    })
    .from('.hero-text', {
      y: 20,
      opacity: 0,
      duration: 1,
      stagger: 0.1,
      ease: "power3.out"
    }, '-=1');
  }, { scope: container });

  return (
    <div ref={container}>

      {/* HERO SECTION */}
      <section className="min-h-[90vh] flex flex-col justify-center px-page-padding pt-32 pb-20 border-b border-black/10 relative overflow-hidden">
        <div className="max-w-[90vw]">
            <div className="overflow-hidden mb-6">
                <h1 ref={titleRef} className="text-display font-extrabold uppercase tracking-tighter leading-[0.85]">
                    Digital<br />Reality
                </h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 hero-text">
                <p className="text-xl md:text-2xl font-light opacity-80 leading-relaxed max-w-lg">
                    We craft immersive digital experiences that blend aesthetics with raw performance. A studio designed for impact.
                </p>
                <div className="flex items-start md:justify-end">
                    <Button href="/contact">Start Project</Button>
                </div>
            </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="py-10 border-b border-black/5 bg-neutral-50">
        <Marquee text="Creative Strategy — Art Direction — WebGL — Motion — " />
      </div>

      {/* PHILOSOPHY */}
      <section className="py-32 px-page-padding grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
        <div className="md:col-span-7">
           <h2 className="text-sm uppercase tracking-widest opacity-50 mb-8">The Studio</h2>
           <p className="text-4xl md:text-6xl font-light leading-tight">
             Our approach is rooted in the belief that code is poetry. We strip away the unnecessary, focusing on <span className="italic font-serif">raw interaction</span> and fluid motion.
           </p>
        </div>
        <div className="md:col-span-5 aspect-square bg-neutral-900 flex items-center justify-center text-white rounded-2xl overflow-hidden relative group">
           <span className="z-10 relative mix-blend-difference">[ Showreel Play ]</span>
           {/* Placeholder for video */}
           <div className="absolute inset-0 bg-neutral-800 group-hover:scale-110 transition-transform duration-1000 ease-out opacity-50" />
        </div>
      </section>

      {/* DYNAMIC CONTENT */}
      <ProjectsSection />
      <Services />

    </div>
  );
}