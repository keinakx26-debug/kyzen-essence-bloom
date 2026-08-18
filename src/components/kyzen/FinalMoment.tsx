import { useEffect, useRef } from "react";
import { drawPod } from "@/lib/cardamom-draw";
import { useReducedMotion } from "@/lib/motion";
import { MagneticButton } from "./MagneticButton";

/** Closing brand moment — the pod returns, completing POD -> PACK -> KYZEN. */
export function FinalMoment() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let raf = 0;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);
    const render = (t: number) => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);
      drawPod(
        ctx,
        w / 2,
        h * 0.55,
        Math.min(w, h) * 0.36,
        reduced ? 0.1 : Math.sin(t * 0.00018) * 0.5,
        0,
        0.18,
      );
      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [reduced]);

  return (
    <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-6 text-center">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <div className="relative z-10">
        <p className="font-serif text-[clamp(3rem,14vw,12rem)] leading-none tracking-[0.12em] text-ivory">
          KYZEN
        </p>
        <p className="mt-6 text-[11px] uppercase tracking-[0.45em] text-gold/80">
          The Essence of Cardamom
        </p>
        <p className="mt-6 text-sm text-ivory/40">
          Made for the moments worth savouring.
        </p>
        <div className="mt-12">
          <MagneticButton as="a" href="#shop">
            Shop Cardamom
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-ivory/10 px-6 py-10 md:px-12">
      <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-4 text-[10px] uppercase tracking-[0.3em] text-ivory/30 md:flex-row">
        <span>KYZEN</span>
        <span>Premium Green Cardamom</span>
        <span>© {new Date().getFullYear()}</span>
      </div>
    </footer>
  );
}
