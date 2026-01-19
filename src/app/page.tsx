'use client';

import { useRef } from "react";
import Button from "@/components/ui/Button";
import Marquee from "@/components/ui/Marquee";
import Services from "@/components/home/Services";
import ProjectsSection from "@/components/home/ProjectsSection";
import TextReveal from "@/components/ui/TextReveal";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function Home() {
  const container = useRef(null);

  // Sayfa yüklendiğinde ekstra animasyonlar
  useGSAP(() => {
    // Reveal bileşeni kendi içinde animasyonlansa da,
    // global bir timeline ile koordinasyon sağlanabilir.
  }, { scope: container });

  return (
    <div ref={container}>
      {/* HERO SECTION */}
      <section className="min-h-screen flex flex-col justify-center px-page-padding pt-32 pb-20 border-b border-black/10 relative overflow-hidden">
        <div className="max-w-[95vw]">
            <div className="mb-10">
                <h1 className="text-display font-light uppercase tracking-tighter leading-[0.85]">
                  <TextReveal delay={0.2}>Digital</TextReveal>
                  <TextReveal delay={0.3}>Reality</TextReveal>
                </h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="text-body opacity-80 max-w-lg">
                    {/* Paragrafı düzgün maskelemek için biraz daha gecikme */}
                    <TextReveal delay={0.6}>
                      We craft immersive digital experiences that blend aesthetics with raw performance. A studio designed for impact.
                    </TextReveal>
                </div>
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
           <h2 className="text-xs uppercase tracking-widest opacity-50 mb-8">The Studio</h2>
           <div className="text-h2 font-light leading-tight">
             <TextReveal threshold={0.5}>
               Our approach is rooted in the belief that code is poetry. We strip away the unnecessary.
             </TextReveal>
           </div>
        </div>
        <div className="md:col-span-5 aspect-square bg-neutral-100 flex items-center justify-center text-black rounded-sm overflow-hidden relative group">
           <span className="z-10 relative uppercase text-xs tracking-widest">[ Showreel Play ]</span>
           <div className="absolute inset-0 bg-neutral-200 group-hover:scale-105 transition-transform duration-1000 ease-out opacity-50" />
        </div>
      </section>

      {/* DYNAMIC CONTENT */}
      <ProjectsSection />
      <Services />
    </div>
  );
}