import { useEffect, useRef } from "react";
import { assets } from "@/config/assets";
import { mapRange, easeInOut, easeOut, useGsap, useIsMobile, useReducedMotion } from "@/lib/motion";
import { products } from "@/data/products";

/**
 * The signature scroll sequence — built entirely from IMAGE LAYERS so any
 * placeholder can be swapped for real photography without touching the motion.
 *
 *   Layer 1  selected pod   (assets.cardamomPod)
 *   Layer 2  burst / seeds  (assets.cardamomSeeds)
 *   Layer 3  aroma dust     (canvas particles)
 *   Layer 4  KYZEN product  (assets.products['10g'])
 *
 * Progress timeline (0 -> 1 across the pinned scroll distance):
 *   0.00-0.24  one pod lifts out of the pile and travels toward the viewer
 *   0.24-0.40  the camera moves into the pod, it fills the frame
 *   0.36-0.58  the pod opens — seeds and aroma dust are revealed
 *   0.55-0.78  the seeds gather and resolve into the KYZEN 10g pouch
 *   0.78-1.00  quiet product presentation
 */
export function CardamomJourney() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const podRef = useRef<HTMLImageElement>(null);
  const seedRef = useRef<HTMLDivElement>(null);
  const packRef = useRef<HTMLDivElement>(null);
  const dustRef = useRef<HTMLCanvasElement>(null);
  const progress = useRef(0);
  const { ScrollTrigger } = useGsap();
  const reduced = useReducedMotion();
  const mobile = useIsMobile();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || reduced) return;

    const stages = Array.from(section.querySelectorAll<HTMLElement>("[data-stage]"));
    ScrollTrigger.refresh();

    const st = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        progress.current = self.progress;
      },
    });

    // ---- aroma dust ----------------------------------------------------
    const canvas = dustRef.current;
    const ctx = canvas?.getContext("2d") ?? null;
    const dots = Array.from({ length: mobile ? 26 : 56 }, (_, i) => ({
      x: Math.random(),
      y: Math.random(),
      r: 0.5 + (i % 4) * 0.4,
      s: 0.00006 + Math.random() * 0.00012,
      a: 0.05 + Math.random() * 0.18,
    }));
    const resize = () => {
      if (!canvas || !ctx) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    let raf = 0;
    let smooth = 0;
    const render = (time: number) => {
      const p = progress.current;
      smooth += (p - smooth) * 0.12;
      if (Math.abs(p - smooth) < 0.0015) smooth = p;

      // ---- layer 1: the selected pod -----------------------------------
      const pod = podRef.current;
      if (pod) {
        const lift = easeOut(mapRange(smooth, 0, 0.24));
        const dive = easeInOut(mapRange(smooth, 0.24, 0.42));
        const scale = 0.34 + lift * 0.5 + dive * 3.4;
        const y = (1 - lift) * 22 - dive * 6;
        const rot = -6 + lift * 8 + dive * 4;
        const alpha = 1 - mapRange(smooth, 0.34, 0.44);
        pod.style.transform = `translate3d(0, ${y}vh, 0) scale(${scale}) rotate(${rot}deg)`;
        pod.style.opacity = String(alpha);
        pod.style.filter = `blur(${dive * 7}px)`;
      }

      // ---- layer 2: the burst / seed reveal ----------------------------
      const seed = seedRef.current;
      if (seed) {
        const inA = easeOut(mapRange(smooth, 0.36, 0.48));
        const out = mapRange(smooth, 0.58, 0.7);
        seed.style.opacity = String(inA * (1 - out));
        seed.style.transform = `scale(${1.5 - inA * 0.5 + out * 0.25})`;
        seed.style.filter = `blur(${(1 - inA) * 14 + out * 10}px)`;
      }

      // ---- layer 3: aroma dust -----------------------------------------
      if (canvas && ctx) {
        const w = canvas.clientWidth;
        const h = canvas.clientHeight;
        const dustAlpha =
          mapRange(smooth, 0.4, 0.5) * (1 - mapRange(smooth, 0.72, 0.86));
        ctx.clearRect(0, 0, w, h);
        if (dustAlpha > 0.01) {
          const gather = easeInOut(mapRange(smooth, 0.58, 0.76));
          for (const d of dots) {
            d.y -= d.s * 16;
            if (d.y < -0.05) d.y = 1.05;
            // seeds/particles drift toward the centre as the pack forms
            const x = d.x + (0.5 - d.x) * gather;
            const y = d.y + (0.5 - d.y) * gather;
            ctx.globalAlpha = d.a * dustAlpha;
            ctx.fillStyle = "#c9a961";
            ctx.beginPath();
            ctx.arc(
              (x + Math.sin(time * 0.0002 + d.y * 9) * 0.008) * w,
              y * h,
              d.r * (1 - gather * 0.4),
              0,
              Math.PI * 2,
            );
            ctx.fill();
          }
          ctx.globalAlpha = 1;
        }
      }

      // ---- layer 4: the product ----------------------------------------
      const pack = packRef.current;
      if (pack) {
        const inA = easeOut(mapRange(smooth, 0.64, 0.82));
        const settle = easeInOut(mapRange(smooth, 0.8, 0.96));
        pack.style.opacity = String(inA);
        pack.style.transform = `translate3d(0, ${(1 - inA) * 6}vh, 0) scale(${
          0.82 + inA * 0.18 + settle * 0.04
        }) perspective(1200px) rotateY(${(1 - inA) * 12 - settle * 4}deg)`;
        pack.style.filter = `blur(${(1 - inA) * 10}px)`;
      }

      // ---- stage copy ----------------------------------------------------
      for (const el of stages) {
        const from = parseFloat(el.dataset['from'] || "0");
        const to = parseFloat(el.dataset['to'] || "1");
        const a =
          mapRange(smooth, from, from + 0.05) * (1 - mapRange(smooth, to - 0.05, to));
        el.style.opacity = String(a);
        el.style.transform = `translateY(${(1 - a) * 20}px)`;
      }

      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      st.kill();
    };
  }, [ScrollTrigger, reduced, mobile]);

  // Reduced motion: an elegant static composition instead of the sequence.
  if (reduced) {
    return (
      <section id="cardamom" className="px-6 py-24 md:px-12">
        <div className="mx-auto grid max-w-[1200px] items-center gap-12 md:grid-cols-2">
          <img
            src={assets.cardamomSeeds}
            alt="Opened green cardamom pod revealing its seeds"
            loading="lazy"
            className="w-full rounded-sm object-cover"
          />
          <div>
            <h2 className="font-serif text-4xl text-ivory">THE HEART OF CARDAMOM</h2>
            <p className="mt-4 text-sm text-ivory/55">
              Inside every pod lies its distinctive character.
            </p>
            <img
              src={products[0]!.image}
              alt="KYZEN 10g premium green cardamom pouch"
              loading="lazy"
              className="mt-10 w-56 object-contain"
            />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="cardamom"
      ref={sectionRef}
      className="relative"
      style={{ height: mobile ? "420vh" : "620vh" }}
    >
      <div className="pointer-events-none sticky top-0 h-[100svh] w-full overflow-hidden">
        {/* Layer 1 — the selected pod (FUTURE PHOTOGRAPHY: isolated hero pod) */}
        <img
          ref={podRef}
          src={assets.cardamomPod}
          alt="A single green cardamom pod lifting toward the viewer"
          width={1024}
          height={1024}
          className="absolute left-1/2 top-1/2 h-[90svh] w-[90svh] max-w-none -translate-x-1/2 -translate-y-1/2 object-contain will-change-transform"
        />

        {/* Layer 2 — the burst / seed reveal (FUTURE PHOTOGRAPHY: macro seeds) */}
        <div
          ref={seedRef}
          className="absolute inset-0 will-change-transform"
          style={{ opacity: 0 }}
        >
          <img
            src={assets.cardamomSeeds}
            alt="Cardamom seeds revealed inside an opened pod"
            loading="lazy"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,var(--background)_88%)]" />
        </div>

        {/* Layer 3 — aroma dust */}
        <canvas ref={dustRef} className="absolute inset-0 h-full w-full" />

        {/* Layer 4 — the KYZEN pouch */}
        <div
          ref={packRef}
          className="absolute left-1/2 top-1/2 w-[min(300px,58vw)] -translate-x-1/2 -translate-y-1/2 will-change-transform"
          style={{ opacity: 0 }}
        >
          <img
            src={products[0]!.image}
            alt="KYZEN 10g premium green cardamom pouch"
            loading="lazy"
            className="w-full object-contain drop-shadow-[0_40px_60px_rgba(0,0,0,0.75)]"
          />
        </div>

        {/* Stage copy — opacity driven by the render loop above */}
        <div className="pointer-events-none absolute inset-0">
          <StageCopy from={0.0} to={0.22} index="01" title="ONE POD" sub="A thousand pods. One worth discovering." />
          <StageCopy from={0.2} to={0.38} index="02" title="COME CLOSER" sub="" />
          <StageCopy
            from={0.38}
            to={0.58}
            index="03"
            title="THE HEART OF CARDAMOM"
            sub="Inside every pod lies its distinctive character."
          />
          <StageCopy from={0.58} to={0.76} index="04" title="FROM POD TO PACK" sub="" />
          <StageCopy from={0.78} to={0.99} index="10G" title="EVERYDAY" sub="Aroma sealed at origin." />
        </div>
      </div>
    </section>
  );
}

function StageCopy({
  from,
  to,
  index,
  title,
  sub,
}: {
  from: number;
  to: number;
  index: string;
  title: string;
  sub: string;
}) {
  return (
    <div
      data-stage
      data-from={from}
      data-to={to}
      style={{ opacity: 0 }}
      className="absolute bottom-16 left-6 max-w-xs md:bottom-auto md:left-12 md:top-1/2 md:-translate-y-1/2 lg:left-20"
    >
      <span className="block font-serif text-4xl text-gold/70 md:text-6xl">{index}</span>
      <h3 className="mt-3 font-serif text-2xl leading-tight text-ivory md:text-4xl">{title}</h3>
      {sub && <p className="mt-3 text-xs leading-relaxed text-ivory/45 md:text-sm">{sub}</p>}
    </div>
  );
}
