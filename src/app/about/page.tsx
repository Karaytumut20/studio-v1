'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ParallaxImage from '@/components/ui/ParallaxImage';
import Marquee from '@/components/ui/Marquee';

export default function About() {
  const container = useRef(null);

  useGSAP(() => {
    const textElements = gsap.utils.toArray('.split-line');

    textElements.forEach((text: any) => {
      gsap.from(text, {
        scrollTrigger: {
          trigger: text,
          start: "top 80%",
        },
        y: 50,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out"
      });
    });
  }, { scope: container });

  return (
    <div ref={container} className="pt-0">
      <div className="pt-32 px-page-padding pb-20">
        <h1 className="text-h1 uppercase font-bold mb-20 split-line">
          We are a digital<br />design studio.
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
          <div className="text-2xl leading-relaxed split-line">
            <p>
              We believe in the power of design to transform businesses.
              Our approach is holistic, combining strategy, design, and technology
              to create cohesive and impactful brand experiences.
            </p>
          </div>
          <div className="h-[60vh]">
            <ParallaxImage
              src="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2670&auto=format&fit=crop"
              alt="Studio Culture"
            />
          </div>
        </div>
      </div>

      <Marquee text="Creative Strategy — Art Direction — WebGL — " className="opacity-80" />

      <div className="px-page-padding py-32 bg-black text-white mt-0">
        <h2 className="text-h2 mb-10 split-line">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
           {['Art Direction', 'Web Design', 'Development', 'Content'].map((s, i) => (
             <div key={i} className="border-t border-white/20 pt-4 split-line">
               <span className="text-xs opacity-50 block mb-2">0{i+1}</span>
               <h3 className="text-xl">{s}</h3>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
}