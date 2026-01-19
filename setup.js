/**
 * setup-grid-update.js
 * * GÖREV: Work sayfası ve Anasayfa Proje bölümünü 2'li Grid sistemine çevirmek.
 * DETAYLAR:
 * - Layout: Desktop'ta 2 kolon (md:grid-cols-2), Mobil'de 1 kolon.
 * - İçerik: Görsel + Başlık + Uzun Açıklama.
 * - Stil: Minimal, ferah boşluklar (gap), ince tipografi.
 */

const fs = require("fs");
const path = require("path");

const rootDir = process.cwd();
const srcDir = path.join(rootDir, "src");

function writeFile(filePath, content) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(filePath, content.trim(), "utf8");
  console.log(`✅ Güncellendi: ${path.relative(process.cwd(), filePath)}`);
}

// 1. WORK PAGE (src/app/work/page.tsx)
// 2'li Grid, Uzun Açıklama, TextReveal Başlıklar
const workPageContent = `
'use client';

import { WORKS } from "@/data/works";
import { useRef } from "react";
import Link from "next/link";
import ParallaxImage from "@/components/ui/ParallaxImage";
import TextReveal from "@/components/ui/TextReveal";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function WorkPage() {
  const container = useRef(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Grid elemanlarının sırayla (stagger) gelmesi için basit bir animasyon
    const items = gsap.utils.toArray('.work-item');

    items.forEach((item: any, i) => {
      gsap.from(item, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: item,
          start: "top 85%",
        }
      });
    });

  }, { scope: container });

  return (
    <div ref={container} className="pt-32 pb-20 px-page-padding">
      <div className="mb-24">
        <h1 className="text-display uppercase font-light tracking-tighter leading-[0.85] mb-8">
          <TextReveal>Work</TextReveal>
          <TextReveal delay={0.1}>Archive</TextReveal>
        </h1>
        <div className="h-[1px] w-full bg-black/10 mt-8" />
      </div>

      {/* 2'li Grid Sistemi */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-24 md:gap-y-32">
        {WORKS.map((work, index) => (
          <Link
            key={work.id}
            href={\`/work/\${work.id}\`}
            className="work-item group block w-full"
          >
            {/* Görsel Alanı */}
            <div className="w-full aspect-[4/3] overflow-hidden bg-neutral-100 mb-8 relative">
               <div className="absolute inset-0 group-hover:scale-105 transition-transform duration-1000 ease-[0.25,1,0.5,1]">
                 <ParallaxImage src={work.coverImage} alt={work.title} speed={1.1} />
               </div>
            </div>

            {/* İçerik Alanı */}
            <div className="flex flex-col gap-4">
               {/* Başlık ve Kategori */}
               <div className="flex justify-between items-baseline border-b border-black/10 pb-4">
                  <h2 className="text-h3 font-light uppercase tracking-tight group-hover:underline underline-offset-4 decoration-1">
                    {work.title}
                  </h2>
                  <span className="text-xs font-mono opacity-40 uppercase tracking-widest">
                    {work.category} — {work.year}
                  </span>
               </div>

               {/* Uzun Açıklama */}
               <p className="text-body font-light opacity-70 leading-relaxed text-justify">
                 {work.description}
               </p>

               {/* Read More Linki (Opsiyonel Estetik) */}
               <div className="pt-2">
                 <span className="text-xs uppercase tracking-widest opacity-40 group-hover:opacity-100 transition-opacity">
                   ( View Case )
                 </span>
               </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
`;

// 2. PROJECTS SECTION (src/components/home/ProjectsSection.tsx)
// Anasayfa için aynı 2'li grid yapısı
const projectsSectionContent = `
'use client';

import { WORKS } from "@/data/works";
import { useRef } from "react";
import Link from "next/link";
import ParallaxImage from "@/components/ui/ParallaxImage";
import TextReveal from "@/components/ui/TextReveal";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ProjectsSection() {
  const container = useRef(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    const cards = gsap.utils.toArray('.home-project-item');

    cards.forEach((card: any) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: "top bottom-=100",
        },
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out"
      });
    });
  }, { scope: container });

  return (
    <section ref={container} className="py-32 px-page-padding bg-white">
      <div className="flex justify-between items-end mb-20 border-b border-black/10 pb-10">
        <h2 className="text-h2 uppercase font-light tracking-tight leading-none">
          <TextReveal>Selected</TextReveal>
          <TextReveal delay={0.1}>Works</TextReveal>
        </h2>
        <Link href="/work" className="text-sm uppercase tracking-widest underline underline-offset-4 hidden md:block hover:opacity-60 transition-opacity">
          View All Projects
        </Link>
      </div>

      {/* 2'li Grid - Anasayfa Limiti: İlk 4 proje */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-24 md:gap-y-32">
        {WORKS.slice(0, 4).map((work, i) => (
          <Link href={\`/work/\${work.id}\`} key={work.id} className="home-project-item group block w-full">
            {/* Görsel */}
            <div className="w-full aspect-[4/3] overflow-hidden bg-gray-100 mb-8 relative">
              <div className="absolute inset-0 group-hover:scale-105 transition-transform duration-1000 ease-out">
                 <ParallaxImage src={work.coverImage} alt={work.title} speed={1.1} />
              </div>
            </div>

            {/* İçerik */}
            <div className="flex flex-col gap-4">
               <div className="flex justify-between items-baseline border-b border-black/10 pb-4">
                  <h3 className="text-3xl uppercase font-light mb-1 group-hover:translate-x-2 transition-transform duration-300">
                    {work.title}
                  </h3>
                  <span className="text-xs font-mono opacity-40">0{i + 1}</span>
               </div>

               {/* Uzun Açıklama */}
               <p className="text-body font-light opacity-70 leading-relaxed line-clamp-4 md:line-clamp-none">
                  {work.description}
               </p>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-20 text-center md:hidden">
        <Link href="/work" className="inline-block px-8 py-4 border border-black rounded-full uppercase text-xs tracking-widest">
          View All Projects
        </Link>
      </div>
    </section>
  );
}
`;

// EXECUTION
function main() {
  console.log("🛠️ Studio V1 - Grid Sistemi Güncelleniyor...");

  if (!fs.existsSync(srcDir)) {
    console.error("❌ 'src' klasörü bulunamadı.");
    process.exit(1);
  }

  // Work Sayfasını Güncelle
  writeFile(path.join(srcDir, "app/work/page.tsx"), workPageContent);

  // Anasayfa Projeler Bölümünü Güncelle
  writeFile(
    path.join(srcDir, "components/home/ProjectsSection.tsx"),
    projectsSectionContent,
  );

  console.log("------------------------------------------------");
  console.log("✨ GÜNCELLEME TAMAMLANDI ✨");
  console.log("------------------------------------------------");
  console.log("Yapılan Değişiklikler:");
  console.log(
    "1. /work sayfası 2'li Grid (md:grid-cols-2) yapısına geçirildi.",
  );
  console.log("2. Anasayfa (ProjectsSection) 2'li Grid yapısına geçirildi.");
  console.log(
    "3. Her proje kartına 'Görsel + Başlık + Uzun Açıklama' eklendi.",
  );
  console.log(
    "4. Tipografi 'font-light' ve 'Manrope' kurallarına göre ayarlandı.",
  );
  console.log("------------------------------------------------");
  console.log(
    "👉 Değişiklikleri görmek için terminalden tekrar başlatmana gerek yok, HMR devreye girecektir.",
  );
}

main();
