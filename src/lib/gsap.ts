import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins globally
// Note: SplitText is a Club GSAP plugin.
// For this bootstrap, we assume environments might not have it and handle gracefully or use alternatives.
// If you have the tgz, import SplitText from "gsap/SplitText";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// Global Defaults
gsap.defaults({
  duration: 1.2,
  ease: "power3.out",
});

export const TRANSITION_EASE = [0.76, 0, 0.24, 1];

export default gsap;