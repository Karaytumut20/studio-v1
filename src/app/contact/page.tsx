'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import MagneticButton from '@/components/ui/MagneticButton';

export default function Contact() {
  const container = useRef(null);

  useGSAP(() => {
    gsap.from('.reveal', {
      y: 100,
      opacity: 0,
      stagger: 0.1,
      duration: 1,
      ease: "power3.out"
    });

    gsap.from('.input-group', {
      x: -50,
      opacity: 0,
      stagger: 0.1,
      duration: 1,
      delay: 0.5,
      ease: "power3.out"
    });
  }, { scope: container });

  return (
    <div ref={container} className="pt-32 pb-20 px-page-padding">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
        <div>
          <h1 className="text-display font-bold uppercase mb-8 reveal">
            Let's start<br />a project
          </h1>
          <p className="text-xl opacity-60 max-w-md reveal">
            We are available for freelance projects and open to new collaborations.
          </p>

          <div className="mt-20 reveal">
            <h3 className="text-sm uppercase tracking-widest opacity-50 mb-4">Contact Details</h3>
            <p className="text-2xl">hello@studio-v1.com</p>
            <p className="text-2xl mt-2">+1 (555) 000-0000</p>
          </div>
        </div>

        <form className="space-y-12 mt-10 lg:mt-0" onSubmit={(e) => e.preventDefault()}>
          <div className="input-group relative border-b border-black/20 pb-4 focus-within:border-black transition-colors">
            <label className="block text-xs uppercase tracking-widest mb-2 opacity-50">01. What's your name?</label>
            <input type="text" placeholder="John Doe" className="w-full bg-transparent text-3xl outline-none placeholder:opacity-20" />
          </div>

          <div className="input-group relative border-b border-black/20 pb-4 focus-within:border-black transition-colors">
            <label className="block text-xs uppercase tracking-widest mb-2 opacity-50">02. What's your email?</label>
            <input type="email" placeholder="john@doe.com" className="w-full bg-transparent text-3xl outline-none placeholder:opacity-20" />
          </div>

          <div className="input-group relative border-b border-black/20 pb-4 focus-within:border-black transition-colors">
            <label className="block text-xs uppercase tracking-widest mb-2 opacity-50">03. What's the budget?</label>
            <input type="text" placeholder="50k - 100k" className="w-full bg-transparent text-3xl outline-none placeholder:opacity-20" />
          </div>

          <div className="input-group pt-10">
            <MagneticButton className="w-full md:w-auto">
              Send Message
            </MagneticButton>
          </div>
        </form>
      </div>
    </div>
  );
}