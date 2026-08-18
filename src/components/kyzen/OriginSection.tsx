import { useEffect, useRef, useState } from "react";
import { useGsap, useReducedMotion } from "@/lib/motion";

/** Immersive origin story with slow parallax over the plantation visual. */
export function OriginSection() {
  const ref = useRef<HTMLDivElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);
  const { gsap, ScrollTrigger } = useGsap();
  const reduced = useReducedMotion();
  const [hasImage, setHasImage] = useState(true);

  useEffect(() => {
    const img = new Image();
    img.onload = () => setHasImage(true);
    img.onerror = () => setHasImage(false);
    img.src = "/images/plantation.jpg";
  }, []);

  useEffect(() => {
    if (reduced || !ref.current || !layerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        layerRef.current,
        { yPercent: -12, scale: 1.15 },
        {
          yPercent: 12,
          scale: 1.15,
          ease: "none",
          scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: true },
        },
      );
    }, ref);
    return () => ctx.revert();
  }, [gsap, ScrollTrigger, reduced]);

  return (
    <section ref={ref} className="relative h-[90svh] overflow-hidden">
      <div
        ref={layerRef}
        className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,#1d3a2a,transparent_60%),radial-gradient(circle_at_75%_70%,#12241a,transparent_55%),linear-gradient(#050a07,#081410)] bg-cover bg-center"
        style={hasImage ? { backgroundImage: "url(/images/plantation.jpg)" } : undefined}
      />
      <div className="absolute inset-0 bg-background/70" />
      <div className="relative flex h-full items-end px-6 pb-20 md:px-12 md:pb-28">
        <div className="max-w-2xl">
          <h2 className="font-serif text-[clamp(2.4rem,8vw,7rem)] leading-[0.9] text-ivory">
            FROM THE
            <br />
            <span className="italic text-gold/90">GREEN HILLS.</span>
          </h2>
          <p className="mt-8 max-w-md text-sm leading-relaxed text-ivory/50">
            Carefully selected green cardamom, chosen for its appearance, aroma
            and character.
          </p>
        </div>
      </div>
    </section>
  );
}
