'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const CLIENTS = [
  "Google", "Nike", "Spotify", "Apple",
  "Samsung", "Tesla", "Sony", "Microsoft",
  "Amazon", "Netflix", "Adobe", "Intel"
];

export default function ClientList() {
  const container = useRef(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.from('.client-item', {
      scrollTrigger: {
        trigger: container.current,
        start: "top 80%",
      },
      y: 20,
      opacity: 0,
      duration: 0.8,
      stagger: 0.05,
      ease: "power2.out"
    });
  }, { scope: container });

  return (
    <section ref={container} className="py-32 px-page-padding bg-white">
      <h2 className="text-sm uppercase tracking-widest opacity-50 mb-12 border-b border-black/10 pb-4">Select Clients</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-10 gap-y-16">
        {CLIENTS.map((client, i) => (
          <div key={i} className="client-item flex items-center gap-4 group cursor-default">
             <span className="w-2 h-2 bg-black rounded-full scale-0 group-hover:scale-100 transition-transform duration-300" />
             <span className="text-2xl md:text-3xl font-medium tracking-tight opacity-40 group-hover:opacity-100 transition-opacity duration-300">
               {client}
             </span>
          </div>
        ))}
      </div>
    </section>
  );
}