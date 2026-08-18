import { useEffect, useRef } from "react";
import { drawPacket, drawPod, drawSeed } from "@/lib/cardamom-draw";
import { mapRange, easeInOut, easeOut, useGsap, useIsMobile, useReducedMotion } from "@/lib/motion";
import { products } from "@/data/products";

/**
 * The signature scroll sequence.
 *
 * Progress timeline (0 -> 1 across the pinned scroll distance):
 *   0.00-0.16  pod hero shot, slow rotate + dolly in
 *   0.16-0.30  pod splits open
 *   0.30-0.46  seeds escape and float with depth
 *   0.46-0.60  seeds gather and morph into the 10g packet
 *   0.60-0.74  packet rotates a full 360deg
 *   0.74-1.00  10g -> 20g -> 50g -> 100g cross-transitions
 */

const SEED_COUNT = 80;

export function CardamomJourney() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progress = useRef(0);
  const velocity = useRef(0);
  const { gsap, ScrollTrigger } = useGsap();
  const reduced = useReducedMotion();
  const mobile = useIsMobile();

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const stages = Array.from(
      section.querySelectorAll<HTMLElement>("[data-stage]"),
    );

    // Deterministic seed field so renders are stable across frames.
    const seeds = Array.from({ length: SEED_COUNT }, (_, i) => {
      const a = (i / SEED_COUNT) * Math.PI * 2 * 3.7;
      return {
        a,
        rr: 0.12 + ((i * 37) % 100) / 100 * 0.32,
        driftX: Math.cos(a * 1.7) * (0.4 + ((i * 13) % 60) / 100),
        driftY: Math.sin(a * 1.3) * (0.5 + ((i * 29) % 70) / 100),
        depth: ((i * 17) % 100) / 100,
        spin: ((i * 23) % 100) / 100 - 0.5,
      };
    });

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const st = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom bottom",
      pin: canvas.parentElement,
      pinSpacing: false,
      scrub: true,
      onUpdate: (self) => {
        progress.current = self.progress;
        velocity.current = self.getVelocity();
      },
    });

    let raf = 0;
    let smooth = 0;
    const render = (time: number) => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      const p = progress.current;
      smooth += (p - smooth) * 0.12;
      const t = reduced ? 0 : time;
      ctx.clearRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;
      const base = Math.min(w, h);

      // ---- ambient aroma dust -------------------------------------------
      ctx.save();
      for (let i = 0; i < 40; i++) {
        const px = ((i * 97) % 100) / 100;
        const py = (((i * 53) % 100) / 100 + t * 0.00002 * (1 + (i % 3))) % 1;
        ctx.globalAlpha = 0.05 + (i % 5) * 0.02;
        ctx.fillStyle = "#c9a961";
        ctx.beginPath();
        ctx.arc(px * w, (1 - py) * h, 1 + (i % 3) * 0.5, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      // ---- stage 1 + 2 : pod --------------------------------------------
      const podAlpha = 1 - mapRange(smooth, 0.34, 0.5);
      const podOpen = easeInOut(mapRange(smooth, 0.16, 0.32));
      const dolly = 0.42 + easeOut(mapRange(smooth, 0, 0.34)) * 0.28;
      const podRot = smooth * 3.2 + Math.sin(t * 0.0003) * 0.1;
      drawPod(ctx, cx, cy, base * dolly, podRot, podOpen, podAlpha);

      // ---- stage 3 + 4 : seeds float then gather ------------------------
      const spread = easeOut(mapRange(smooth, 0.22, 0.5));
      const gather = easeInOut(mapRange(smooth, 0.46, 0.6));
      const seedsAlpha =
        mapRange(smooth, 0.18, 0.28) * (1 - mapRange(smooth, 0.56, 0.62));
      const vel = Math.max(-1, Math.min(1, velocity.current / 3000));

      if (seedsAlpha > 0.001) {
        const packW = base * 0.3;
        const packH = packW * 1.45;
        for (let i = 0; i < seeds.length; i++) {
          const s = seeds[i]!;
          // start: packed inside the pod cavity
          const sx = cx + Math.cos(s.a) * base * 0.06 * s.rr;
          const sy = cy + Math.sin(s.a) * base * 0.22 * s.rr;
          // mid: floating field with depth
          const fx =
            sx + s.driftX * base * 0.45 * spread + Math.sin(t * 0.0004 + i) * 6;
          const fy =
            sy -
            s.driftY * base * 0.4 * spread +
            Math.cos(t * 0.0005 + i) * 6 +
            vel * 24 * s.depth;
          // end: distributed over the packet silhouette
          const gx = cx + (((i * 41) % 100) / 100 - 0.5) * packW * 0.92;
          const gy = cy + (((i * 61) % 100) / 100 - 0.5) * packH * 0.92;

          const x = fx + (gx - fx) * gather;
          const y = fy + (gy - fy) * gather;
          const size = base * 0.011 * (0.6 + s.depth) * (1 - gather * 0.45);
          drawSeed(
            ctx,
            x,
            y,
            size,
            s.a + t * 0.0006 * s.spin * 4 + spread * s.spin * 6,
            s.depth,
            seedsAlpha,
          );
        }
      }

      // ---- stage 5 + 6 : packet forms, rotates, changes size ------------
      const packetIn = easeOut(mapRange(smooth, 0.54, 0.64));
      if (packetIn > 0.001) {
        const rotStart = 0.62;
        const rotEnd = 0.76;
        const spinT = easeInOut(mapRange(smooth, rotStart, rotEnd));
        const baseW = base * 0.3;
        const baseH = baseW * 1.45;

        if (smooth < 0.78) {
          drawPacket(
            ctx,
            cx,
            cy,
            baseW * (0.86 + packetIn * 0.14),
            baseH * (0.86 + packetIn * 0.14),
            spinT * Math.PI * 2,
            products[0]!.size,
            packetIn,
          );
        } else {
          // cross-transitions: outgoing pushes back + fades, incoming steps forward
          const segs = products.length - 1; // 3 transitions
          const local = mapRange(smooth, 0.78, 0.995) * segs;
          const idx = Math.min(segs - 1, Math.floor(local));
          const k = easeInOut(local - idx);
          const out = products[idx]!;
          const inc = products[idx + 1]!;
          const scaleFor = (i: number) => 1 + i * 0.06; // family grows subtly

          // outgoing
          drawPacket(
            ctx,
            cx,
            cy - k * base * 0.02,
            baseW * scaleFor(idx) * (1 - k * 0.22),
            baseH * scaleFor(idx) * (1 - k * 0.22),
            -k * 0.5,
            out.size,
            1 - k,
          );
          // incoming
          drawPacket(
            ctx,
            cx,
            cy + (1 - k) * base * 0.02,
            baseW * scaleFor(idx + 1) * (0.78 + k * 0.22),
            baseH * scaleFor(idx + 1) * (0.78 + k * 0.22),
            (1 - k) * 0.6,
            inc.size,
            k,
          );
        }
      }

      // ---- stage copy opacity, driven off the same timeline -------------
      for (const el of stages) {
        const from = parseFloat(el.dataset['from'] || "0");
        const to = parseFloat(el.dataset['to'] || "1");
        const a =
          mapRange(smooth, from, from + 0.05) *
          (1 - mapRange(smooth, to - 0.05, to));
        el.style.opacity = String(a);
        el.style.transform = `translateY(${(1 - a) * 24}px)`;
      }

      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      st.kill();
    };
  }, [ScrollTrigger, gsap, reduced]);

  // Shorter scroll distance on mobile so the story stays tight.
  const height = reduced ? "auto" : mobile ? "380vh" : "620vh";

  return (
    <section
      id="cardamom"
      ref={sectionRef}
      className="relative"
      style={{ height }}
    >
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

        {/* Stage copy — opacity is driven by the render loop above */}
        <div className="pointer-events-none absolute inset-0">
          <StageCopy from={0.0} to={0.2} index="01" title="THE POD" sub="Where the journey begins." />
          <StageCopy
            from={0.18}
            to={0.36}
            index="02"
            title="THE HEART OF CARDAMOM"
            sub="Inside every pod lies its character."
          />
          <StageCopy
            from={0.34}
            to={0.52}
            index="03"
            title="NATURAL AROMA"
            sub="Distinctive. Warm. Unmistakable."
          />
          <StageCopy from={0.5} to={0.66} index="04" title="FROM POD TO PACK" sub="" />
          <StageCopy from={0.64} to={0.8} index="10G" title="PURE CARDAMOM." sub="" />
          <StageCopy from={0.79} to={0.86} index="10G" title="EVERYDAY" sub="" />
          <StageCopy from={0.855} to={0.925} index="20G" title="ESSENTIAL" sub="" />
          <StageCopy from={0.92} to={0.96} index="50G" title="FAMILY" sub="" />
          <StageCopy from={0.955} to={1.01} index="100G" title="RESERVE" sub="" />
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
      <h3 className="mt-3 font-serif text-2xl leading-tight text-ivory md:text-4xl">
        {title}
      </h3>
      {sub && (
        <p className="mt-3 text-xs leading-relaxed text-ivory/45 md:text-sm">{sub}</p>
      )}
    </div>
  );
}
