import { useEffect } from "react";
import Lenis from "lenis";
import { useGsap } from "./motion";

/** Lenis smooth scroll, driven by GSAP's ticker so ScrollTrigger stays in sync. */
export function useSmoothScroll(enabled = true) {
  const { gsap, ScrollTrigger } = useGsap();
  useEffect(() => {
    if (!enabled) return;
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, [enabled, gsap, ScrollTrigger]);
}
