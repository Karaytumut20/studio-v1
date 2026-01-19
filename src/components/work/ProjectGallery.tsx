'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function ProjectGallery({ images }: { images: string[] }) {
  const container = useRef(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    const imgs = gsap.utils.toArray('.gallery-img');

    imgs.forEach((img: any) => {
       gsap.fromTo(img,
         { scale: 1.1 },
         {
           scale: 1,
           scrollTrigger: {
             trigger: img.parentElement,
             start: "top bottom",
             end: "bottom top",
             scrub: true
           }
         }
       );
    });

  }, { scope: container });

  return (
    <section ref={container} className="py-20 px-page-padding">
      <div className="grid grid-cols-1 gap-20">
        {images.map((src, i) => (
          <div key={i} className={`w-full overflow-hidden bg-neutral-100 ${i % 2 === 0 ? 'aspect-[16/9]' : 'aspect-square md:w-2/3 md:mx-auto'}`}>
            <img
              src={src}
              alt="Gallery"
              className="gallery-img w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  );
}