'use client';

import Link from 'next/link';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { label: 'Work', href: '/work' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' }
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 px-page-padding py-6 mix-blend-difference text-white">
      <div className="flex justify-between items-center max-w-[1920px] mx-auto">
        <Link href="/" className="text-xl font-bold tracking-tight uppercase z-50 relative group">
          <span className="block overflow-hidden">
            <span className="block group-hover:-translate-y-full transition-transform duration-500 ease-[0.76,0,0.24,1]">Studio©</span>
            <span className="absolute top-0 left-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.76,0,0.24,1]">Home</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative text-sm font-medium uppercase tracking-wide hover:opacity-70 transition-opacity",
                pathname === item.href && "underline underline-offset-4"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden z-50 relative flex flex-col gap-1.5 w-8"
        >
          <span className={cn("w-full h-[2px] bg-white transition-transform duration-300", isOpen && "rotate-45 translate-y-[8px]")} />
          <span className={cn("w-full h-[2px] bg-white transition-opacity duration-300", isOpen && "opacity-0")} />
          <span className={cn("w-full h-[2px] bg-white transition-transform duration-300", isOpen && "-rotate-45 -translate-y-[8px]")} />
        </button>

        {/* Mobile Nav Overlay */}
        <div className={cn(
          "fixed inset-0 bg-black text-white flex flex-col justify-center items-center gap-8 transition-transform duration-[0.8s] ease-[0.76,0,0.24,1]",
          isOpen ? "translate-y-0" : "-translate-y-full"
        )}>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="text-4xl font-light uppercase overflow-hidden"
            >
              <span className="block animate-in fade-in slide-in-from-bottom-4 duration-700">
                {item.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}