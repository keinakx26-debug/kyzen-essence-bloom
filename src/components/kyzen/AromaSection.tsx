import { useEffect, useRef } from "react";
import { assets } from "@/config/assets";
import { useGsap, useReducedMotion } from "@/lib/motion";

/** Quiet sensory beat: macro cardamom + very subtle drifting dust particles. */
export function AromaSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { gsap, ScrollTrigger } = useGsap();
  const reduced = useReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || reduced) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-aroma-copy]",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.12,
          ease: "expo.out",
          scrollTrigger: { trigger: section, start: "top 70%" },
        },
      );
      gsap.fromTo(
        "[data-aroma-image]",
        { scale: 1.12 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: true },
        },
      );
    }, section);
    return () => {
      ctx.revert();
      ScrollTrigger.refresh();
    };
  }, [gsap, ScrollTrigger, reduced]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || reduced) return;
    const c = canvas.getContext("2d");
    if (!c) return;
    let raf = 0;
    const dots = Array.from({ length: 34 }, (_, i) => ({
      x: Math.random(),
      y: Math.random(),
      r: 0.5 + (i % 4) * 0.35,
      s: 0.00004 + Math.random() * 0.00008,
      a: 0.06 + Math.random() * 0.14,
    }));
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;
      c.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);
    const render = (t: number) => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      c.clearRect(0, 0, w, h);
      for (const d of dots) {
        d.y -= d.s * 16;
        if (d.y < -0.05) d.y = 1.05;
        c.globalAlpha = d.a;
        c.fillStyle = "#c9a961";
        c.beginPath();
        c.arc((d.x + Math.sin(t * 0.0002 + d.y * 8) * 0.01) * w, d.y * h, d.r, 0, Math.PI * 2);
        c.fill();
      }
      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [reduced]);

  return (
    <section
      ref={sectionRef}
      id="aroma"
      className="relative overflow-hidden px-6 py-28 md:px-12 md:py-40"
    >
      <div className="mx-auto grid max-w-[1400px] items-center gap-14 lg:grid-cols-2">
        <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
          {/* FUTURE PHOTOGRAPHY: macro opened pod with seeds */}
          <img
            data-aroma-image
            src={assets.cardamomSeeds}
            alt="Macro photograph of an opened cardamom pod and its seeds"
            loading="lazy"
            width={1600}
            height={1200}
            className="h-full w-full object-cover"
          />
          <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/70 to-transparent" />
        </div>

        <div>
          <h2
            data-aroma-copy
            className="font-serif text-[clamp(2.4rem,6vw,5rem)] leading-[0.95] text-ivory"
          >
            AROMA,
            <br />
            <span className="italic text-gold/90">UNMISTAKABLE.</span>
          </h2>
          <p data-aroma-copy className="mt-8 max-w-sm text-sm leading-relaxed text-ivory/55">
            Warm, resinous and quietly sweet. The character of a pod is decided long
            before it reaches a kitchen — in the hill it grew on, and in the care
            taken to seal it.
          </p>
        </div>
      </div>
    </section>
  );
}
