'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { WorkItem } from '@/data/works';

export default function ProjectHero({ project }: { project: WorkItem }) {
  const container = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({ delay: 0.2 });

    tl.from('.hero-line', {
      y: 100,
      opacity: 0,
      duration: 1,
      stagger: 0.1,
      ease: "power3.out"
    })
    .from(imageRef.current, {
      scale: 1.1,
      opacity: 0,
      duration: 1.5,
      ease: "power2.out"
    }, '-=0.8');

  }, { scope: container });

  return (
    <section ref={container} className="pt-32 pb-20 px-page-padding">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-20">
        <div className="md:col-span-8">
          <div className="overflow-hidden">
             <h1 className="text-display font-bold uppercase tracking-tighter leading-[0.85] hero-line">
               {project.title}
             </h1>
          </div>
          <div className="flex gap-4 mt-6 text-sm uppercase tracking-widest opacity-60 hero-line">
            <span>{project.client}</span>
            <span>—</span>
            <span>{project.year}</span>
            <span>—</span>
            <span>{project.category}</span>
          </div>
        </div>
        <div className="md:col-span-4 flex items-end">
           <p className="text-lg leading-relaxed opacity-80 hero-line">
             {project.description}
           </p>
        </div>
      </div>

      <div className="w-full aspect-video overflow-hidden bg-neutral-200">
        <img
          ref={imageRef}
          src={project.coverImage}
          alt={project.title}
          className="w-full h-full object-cover"
        />
      </div>
    </section>
  );
}