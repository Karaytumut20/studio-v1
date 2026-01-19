'use client';

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import Button from "@/components/ui/Button";

export default function Home() {
  const container = useRef(null);
  const titleRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({ delay: 2.2 }); // Wait for preloader

    tl.from(titleRef.current, {
      y: 100,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out"
    });
  }, { scope: container });

  return (
    <div ref={container} className="px-page-padding">
      <section className="h-[80vh] flex flex-col justify-center items-start border-b border-black/10">
        <div className="overflow-hidden">
          <h1 ref={titleRef} className="text-display font-bold uppercase tracking-tighter">
            Digital<br />Excellence
          </h1>
        </div>
        <div className="mt-8 max-w-xl text-xl font-light opacity-80">
          <p>We craft digital experiences that blend aesthetics with performance. An architecture designed for scalability and impact.</p>
        </div>
        <div className="mt-12">
          <Button href="/work">View Projects</Button>
        </div>
      </section>

      <section className="py-32 grid grid-cols-1 md:grid-cols-2 gap-20">
        <div>
          <h2 className="text-h2 font-semibold mb-6">Philosophy</h2>
          <p className="text-lg leading-relaxed opacity-70">
            Our approach is rooted in the belief that code is poetry. We strip away the unnecessary, focusing on raw interaction and fluid motion. Every pixel serves a purpose, every animation tells a story.
          </p>
        </div>
        <div className="bg-gray-100 aspect-square flex items-center justify-center">
          <span className="text-sm uppercase tracking-widest">[ Immersive Visual ]</span>
        </div>
      </section>
    </div>
  );
}