'use client';

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const NAV_ITEMS = [
  { label: 'Work', href: '/work', number: '01' },
  { label: 'About', href: '/about', number: '02' },
  { label: 'Contact', href: '/contact', number: '03' }
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const container = useRef(null);
  const menuRef = useRef(null);
  const bgRef = useRef(null);
  const pathname = usePathname();

  const tl = useRef<gsap.core.Timeline | null>(null);

  useGSAP(() => {
    gsap.set(menuRef.current, { yPercent: -100 });
    gsap.set('.menu-link-item', { y: 120 });

    tl.current = gsap.timeline({ paused: true })
      .to(menuRef.current, {
        yPercent: 0,
        duration: 0.8,
        ease: "power4.inOut"
      })
      .to('.menu-link-item', {
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out"
      }, '-=0.4');

  }, { scope: container });

  // Toggle Animation
  useEffect(() => {
    if (tl.current) {
      if (isOpen) {
        tl.current.play();
        document.body.style.overflow = 'hidden';
      } else {
        tl.current.reverse();
        document.body.style.overflow = '';
      }
    }
  }, [isOpen]);

  // Close on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header ref={container} className="fixed top-0 left-0 w-full z-[9000] mix-blend-difference text-white">
      <div className="flex justify-between items-center px-page-padding py-6 max-w-[1920px] mx-auto relative z-[9010]">

        {/* Logo */}
        <Link href="/" className="text-xl font-bold tracking-tight uppercase group relative overflow-hidden">
           <span className="block transition-transform duration-500 group-hover:-translate-y-full">Studio©</span>
           <span className="absolute top-0 left-0 transition-transform duration-500 translate-y-full group-hover:translate-y-0">Home</span>
        </Link>

        {/* Desktop Nav (Simple) */}
        <nav className="hidden md:flex gap-8">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative text-sm font-medium uppercase tracking-wide opacity-80 hover:opacity-100 transition-opacity",
                pathname.startsWith(item.href) && "underline underline-offset-4 opacity-100"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden flex flex-col gap-1.5 w-8 group"
        >
          <span className={cn("w-full h-[2px] bg-white transition-all duration-300", isOpen && "rotate-45 translate-y-[8px]")} />
          <span className={cn("w-full h-[2px] bg-white transition-all duration-300", isOpen && "opacity-0")} />
          <span className={cn("w-full h-[2px] bg-white transition-all duration-300", isOpen && "-rotate-45 -translate-y-[8px]")} />
        </button>
      </div>

      {/* Fullscreen Overlay Menu */}
      <div
        ref={menuRef}
        className="fixed inset-0 w-full h-screen bg-neutral-900 text-white flex flex-col justify-center px-page-padding pt-20"
      >
         <div className="flex flex-col gap-4">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group relative flex items-start gap-4 overflow-hidden py-2"
              >
                 <span className="menu-link-item block font-mono text-xs opacity-50 mt-2">{item.number}</span>
                 <span className="menu-link-item block text-6xl font-bold uppercase tracking-tighter group-hover:text-neutral-400 transition-colors">
                   {item.label}
                 </span>
              </Link>
            ))}
         </div>

         <div className="absolute bottom-10 left-0 w-full px-page-padding flex justify-between text-xs uppercase opacity-40">
            <span>Based in Istanbul</span>
            <span>Est. 2024</span>
         </div>
      </div>
    </header>
  );
}