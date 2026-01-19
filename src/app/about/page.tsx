'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ParallaxImage from '@/components/ui/ParallaxImage';
import Marquee from '@/components/ui/Marquee';
import ClientList from '@/components/about/ClientList';

export default function About() {
  const container = useRef(null);

  useGSAP(() => {
    const textElements = gsap.utils.toArray('.split-line');

    textElements.forEach((text: any) => {
      gsap.from(text, {
        scrollTrigger: {
          trigger: text,
          start: "top 85%",
        },
        y: 40,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out"
      });
    });
  }, { scope: container });

  return (
    <div ref={container} className="pt-0">
      {/* Intro */}
      <div className="pt-40 px-page-padding pb-20">
        <h1 className="text-h1 uppercase font-bold mb-20 split-line leading-[0.9]">
          We are a digital<br />design studio.
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
          <div className="text-2xl leading-relaxed split-line font-light">
            <p className="mb-10">
              We believe in the power of design to transform businesses.
              Our approach is holistic, combining strategy, design, and technology
              to create cohesive and impactful brand experiences.
            </p>
            <p className="opacity-60 text-lg">
              Founded in 2024, Studio has quickly become a leader in digital innovation,
              working with global brands to define their digital future.
            </p>
          </div>
          <div className="h-[60vh] md:h-[80vh]">
            <ParallaxImage
              src="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2670&auto=format&fit=crop"
              alt="Studio Culture"
            />
          </div>
        </div>
      </div>

      {/* Marquee Separator */}
      <div className="py-10 border-t border-b border-black/5 bg-neutral-50">
         <Marquee text="Strategy — Art Direction — WebGL — Content — " className="opacity-80" />
      </div>

      {/* Clients */}
      <ClientList />

      {/* Services Grid */}
      <div className="px-page-padding py-32 bg-black text-white">
        <h2 className="text-h2 mb-20 split-line">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
           {['Art Direction', 'Web Design', 'Development', 'Content Strategy'].map((s, i) => (
             <div key={i} className="border-t border-white/20 pt-6 split-line group hover:border-white transition-colors duration-500">
               <span className="text-xs opacity-50 block mb-4 font-mono">0{i+1}</span>
               <h3 className="text-2xl font-medium mb-4">{s}</h3>
               <p className="opacity-40 text-sm leading-relaxed max-w-[200px] group-hover:opacity-80 transition-opacity">
                 Comprehensive solutions for digital growth and brand recognition.
               </p>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
}