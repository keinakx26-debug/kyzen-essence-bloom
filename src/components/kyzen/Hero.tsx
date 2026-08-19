import { useEffect, useRef } from "react";
import { ArrowDown } from "lucide-react";
import { gsap } from "gsap";
import { useReducedMotion } from "@/lib/motion";
import { MagneticButton } from "./MagneticButton";
import { HeroCardamomPile } from "./HeroCardamomPile";

/**
 * Full-screen cinematic hero.
 * The composition is deliberately restrained: typography above, a photographic
 * bed of cardamom in the lower third, and a fine veil of aroma particles.
 */
export function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    const particles = Array.from({ length: 40 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * 1.6 + 0.4,
      s: Math.random() * 0.00022 + 0.00008,
      a: Math.random() * 0.35 + 0.08,
    }));

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: MouseEvent) => {
      mouse.tx = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.ty = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    if (!reduced) window.addEventListener("mousemove", onMove);

    const render = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);
      mouse.x += (mouse.tx - mouse.x) * 0.05;
      mouse.y += (mouse.ty - mouse.y) * 0.05;
      for (const p of particles) {
        p.y -= p.s * (reduced ? 0 : 16);
        if (p.y < -0.05) p.y = 1.05;
        ctx.globalAlpha = p.a;
        ctx.fillStyle = "#c9a961";
        ctx.beginPath();
        ctx.arc(p.x * w + mouse.x * 12, p.y * h, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, [reduced]);

  useEffect(() => {
    if (reduced || !textRef.current) return;
    const items = textRef.current.querySelectorAll("[data-reveal]");
    gsap.fromTo(
      items,
      { y: 40, opacity: 0, filter: "blur(12px)" },
      {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: 1.4,
        stagger: 0.14,
        ease: "expo.out",
        delay: 0.2,
      },
    );
  }, [reduced]);

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden"
    >
      <HeroCardamomPile />
      <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 h-full w-full" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,var(--background)_92%)]" />

      <div
        ref={textRef}
        className="relative z-10 -mt-[16svh] flex flex-col items-center px-6 text-center"
      >
        <p
          data-reveal
          className="mb-6 text-[10px] uppercase tracking-[0.5em] text-gold/75"
        >
          KYZEN
        </p>
        <h1
          data-reveal
          className="font-serif text-[clamp(3rem,11vw,10rem)] leading-[0.88] tracking-[-0.02em] text-ivory"
        >
          THE ESSENCE
          <br />
          <span className="italic text-gold/90">OF CARDAMOM.</span>
        </h1>
        <p data-reveal className="mt-8 max-w-md text-sm leading-relaxed text-ivory/55">
          Premium green cardamom, carefully selected and packed to preserve its
          natural aroma.
        </p>
        <div data-reveal className="mt-12">
          <MagneticButton as="a" href="#cardamom">
            Explore Cardamom
            <ArrowDown className="h-4 w-4" strokeWidth={1.4} />
          </MagneticButton>
        </div>
      </div>

      <span className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.4em] text-ivory/35">
        Scroll
      </span>
    </section>
  );
}
