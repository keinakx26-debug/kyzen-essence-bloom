import { useEffect, useRef } from "react";
import { assets } from "@/config/assets";
import { useReducedMotion } from "@/lib/motion";

/**
 * Photographic bed of green cardamom sitting in the lower half of the hero.
 * FUTURE PHOTOGRAPHY: replace `assets.cardamomPile` with the real wide shot.
 */
export function HeroCardamomPile() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        const p = Math.min(1, y / window.innerHeight);
        el.style.transform = `translate3d(0, ${p * 60}px, 0) scale(${1 + p * 0.08})`;
        el.style.filter = `blur(${p * 6}px)`;
        el.style.opacity = String(1 - p * 0.5);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [reduced]);

  return (
    <div
      ref={ref}
      className="pointer-events-none absolute inset-x-0 bottom-0 h-[62%] will-change-transform"
    >
      <img
        src={assets.cardamomPile}
        alt="A bed of premium green cardamom pods"
        width={1920}
        height={1280}
        className="h-full w-full object-cover object-top"
      />
      {/* cinematic fades so the photograph dissolves into the page */}
      <div className="absolute inset-x-0 top-0 h-2/5 bg-gradient-to-b from-background to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background to-transparent" />
      <div className="absolute inset-0 bg-background/25" />
    </div>
  );
}
