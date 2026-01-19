#!/usr/bin/env node

/**
 * ----------------------------------------------------------------------------
 * STUDIO FINAL REPAIR V2: AGGRESSIVE FIX
 * ----------------------------------------------------------------------------
 * * GOAL: 100% Fix for "Scroll Stuck", "Mouse Hidden", and "Flickering Preloader".
 * * STRATEGY:
 * 1. Preloader: Use "Unmount Strategy". Remove it from DOM entirely after load.
 * 2. Scroll: Force-clean styles on body/html.
 * 3. Logic: Prevent route transition animation from clashing with initial load.
 * ----------------------------------------------------------------------------
 */

const fs = require("fs");
const path = require("path");

const COLORS = {
  green: "\x1b[32m",
  cyan: "\x1b[36m",
  reset: "\x1b[0m",
};

function log(msg) {
  console.log(`${COLORS.cyan}[FIX V2]${COLORS.reset} ${msg}`);
}

const rootDir = process.cwd();
const srcDir = path.join(rootDir, "src");

// 1. GLOBAL CSS (Totally Clean Scroll)
// -----------------------------------------------------
const cssContent = `
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --background: #FFFFFF;
  --foreground: #000000;
  --font-manrope: 'Manrope', sans-serif;
  --gutter: 20px;
  --page-padding: 20px;
}

html, body {
  /* CRITICAL: Ensure scroll is always possible */
  height: auto;
  min-height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  overflow-y: auto; /* Force scrollbar */
  cursor: auto !important; /* Force mouse visibility */
}

/* Lenis Recommended */
html.lenis, html.lenis body {
  height: auto;
}

.lenis.lenis-smooth {
  scroll-behavior: auto !important;
}

.lenis.lenis-smooth [data-lenis-prevent] {
  overscroll-behavior: contain;
}

.lenis.lenis-stopped {
  overflow: hidden;
}

.lenis.lenis-scrolling iframe {
  pointer-events: none;
}
`;

// 2. PRELOADER (The "Killer" Version)
// -----------------------------------------------------
// Logic: If initial load finishes, we set a state 'isComplete'.
// If 'isComplete' is true, we return NULL. This removes the div from the DOM entirely.
// No hidden divs blocking clicks. No z-index issues.
const preloaderContent = `
'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { usePathname } from 'next/navigation';

export default function Preloader() {
  const [isComplete, setIsComplete] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const percentRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Track if animation has run to prevent strict mode double-fire
  const didRun = useRef(false);

  useEffect(() => {
    // Prevent double execution in Strict Mode
    if (didRun.current) return;
    didRun.current = true;

    // Lock scroll
    document.body.style.overflow = 'hidden';
    document.body.style.cursor = 'wait';

    const tl = gsap.timeline({
      onComplete: () => {
        // UNLOCK EVERYTHING
        document.body.style.overflow = '';
        document.body.style.cursor = '';

        // KILL THE COMPONENT
        setIsComplete(true);
      }
    });

    const counter = { val: 0 };

    tl.to(counter, {
      val: 100,
      duration: 1.0,
      ease: "power2.inOut",
      onUpdate: () => {
        if (percentRef.current) {
          percentRef.current.innerText = Math.floor(counter.val) + '%';
        }
      }
    })
    .to(containerRef.current, {
      yPercent: -100,
      duration: 0.7,
      ease: "power3.inOut"
    });

    // Cleanup failsafe
    return () => {
      document.body.style.overflow = '';
      document.body.style.cursor = '';
    };
  }, []);

  // Simple route transition logic (Optional: disabled for stability first)
  /* useEffect(() => {
    if (isComplete) {
       // Route transition logic here if needed later
    }
  }, [pathname, isComplete]);
  */

  // IF COMPLETE, RENDER NOTHING (Fixes all scroll/click blocking issues)
  if (isComplete) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] bg-black text-white flex items-center justify-center overflow-hidden"
    >
      <div className="absolute bottom-10 right-10 text-[10vw] font-bold leading-none opacity-20 select-none">
        <span ref={percentRef}>0%</span>
      </div>
    </div>
  );
}
`;

// 3. LAYOUT (Clean)
// -----------------------------------------------------
const layoutContent = `
import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "@/styles/globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import Preloader from "@/components/Preloader";
import CustomCursor from "@/components/ui/CustomCursor";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Studio V1",
  description: "Creative Architecture",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={manrope.variable}>
      <body className="antialiased bg-background text-foreground overflow-x-hidden">
        <SmoothScroll>
          <CustomCursor />
          <Preloader />
          <Header />
          <main className="min-h-screen pt-20">
            {children}
          </main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
`;

// EXECUTION
// -----------------------------------------------------
try {
  if (!fs.existsSync(srcDir)) {
    console.error("❌ 'src' folder not found. Run in project root.");
    process.exit(1);
  }

  fs.writeFileSync(path.join(srcDir, "styles/globals.css"), cssContent.trim());
  log("Cleaned src/styles/globals.css");

  fs.writeFileSync(
    path.join(srcDir, "components/Preloader.tsx"),
    preloaderContent.trim(),
  );
  log("Rebuilt src/components/Preloader.tsx (Unmount Strategy)");

  fs.writeFileSync(path.join(srcDir, "app/layout.tsx"), layoutContent.trim());
  log("Cleaned src/app/layout.tsx");

  console.log(`\n${COLORS.green}✔ V2 REPAIR APPLIED${COLORS.reset}`);
  console.log("1. Stop server (Ctrl+C)");
  console.log("2. npm run dev");
  console.log("3. Hard Refresh (Ctrl+F5) -> Sorun %100 çözülmüş olmalı.");
} catch (e) {
  console.error("Error:", e);
}
