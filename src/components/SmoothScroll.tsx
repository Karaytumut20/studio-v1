"use client";

import { ReactLenis } from "lenis/react";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef(null);

  useGSAP(() => {
    // Lenis scroll olayını ScrollTrigger'a bildir
    // Bu sayede animasyonlar scroll ile senkronize çalışır
    const lenis = lenisRef.current?.lenis;

    if (lenis) {
      lenis.on("scroll", ScrollTrigger.update);

      // İsteğe bağlı: GSAP ticker'ı Lenis raf ile senkronize etmeye gerek kalmadan
      // autoRaf={true} kullandığımız için scroll çalışacaktır.
    }
  });

  return (
    <ReactLenis
      root
      ref={lenisRef}
      autoRaf={
        true
      } /* BURAYI TRUE YAPTIK: Scroll'un çalışmasını garanti eder */
      options={{
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}
