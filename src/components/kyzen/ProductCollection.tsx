import { useEffect, useRef } from "react";
import { products } from "@/data/products";
import { mapRange, easeInOut, useGsap, useIsMobile, useReducedMotion } from "@/lib/motion";

/**
 * THE KYZEN COLLECTION — the signature size transition.
 * 10G -> 20G -> 50G -> 100G, each pack scaling and drifting with controlled
 * momentum so the family reads as one product, never four swapped images.
 */
export function ProductCollection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const progress = useRef(0);
  const { ScrollTrigger } = useGsap();
  const reduced = useReducedMotion();
  const mobile = useIsMobile();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || reduced) return;
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

    let raf = 0;
    let smooth = 0;
    const render = () => {
      const p = progress.current;
      smooth += (p - smooth) * 0.12;
      const span = 1 / products.length;
      itemRefs.current.forEach((el, i) => {
        if (!el) return;
        const centre = span * (i + 0.5);
        const d = (smooth - centre) / span; // -1 before, 0 hero, +1 after
        const k = Math.max(-1.6, Math.min(1.6, d));
        const near = 1 - Math.min(1, Math.abs(k));
        const alpha = easeInOut(Math.max(0, near));
        el.style.opacity = String(alpha);
        el.style.transform = `translate3d(${-k * 18}vw, ${Math.abs(k) * 4}vh, 0) scale(${
          (0.78 + near * 0.22) * (1 + i * 0.04)
        }) perspective(1200px) rotateY(${k * 10}deg)`;
        el.style.filter = `blur(${(1 - near) * 8}px)`;
        el.style.zIndex = String(Math.round(near * 10));
      });

      const label = section.querySelector<HTMLElement>("[data-collection-label]");
      if (label) {
        const idx = Math.min(products.length - 1, Math.floor(smooth / span));
        const cur = products[idx]!;
        label.dataset['idx'] = String(idx);
        const sizeEl = label.querySelector<HTMLElement>("[data-size]");
        const nameEl = label.querySelector<HTMLElement>("[data-name]");
        if (sizeEl && sizeEl.textContent !== cur.size.toUpperCase())
          sizeEl.textContent = cur.size.toUpperCase();
        if (nameEl && nameEl.textContent !== cur.name.toUpperCase())
          nameEl.textContent = cur.name.toUpperCase();
        const local = (smooth % span) / span;
        label.style.opacity = String(
          mapRange(local, 0, 0.18) * (1 - mapRange(local, 0.84, 1)),
        );
      }
      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(raf);
      st.kill();
    };
  }, [ScrollTrigger, reduced]);

  if (reduced) {
    return (
      <section id="collection" className="px-6 py-24 md:px-12">
        <h2 className="text-center font-serif text-4xl text-ivory">THE KYZEN COLLECTION</h2>
        <div className="mx-auto mt-14 grid max-w-[1100px] grid-cols-2 gap-10 md:grid-cols-4">
          {products.map((p) => (
            <figure key={p.size} className="text-center">
              <img
                src={p.image}
                alt={`KYZEN ${p.size} premium green cardamom pouch`}
                loading="lazy"
                className="mx-auto w-full object-contain"
              />
              <figcaption className="mt-4 font-serif text-2xl text-ivory">
                {p.size.toUpperCase()}
                <span className="mt-1 block text-[10px] uppercase tracking-[0.28em] text-ivory/45">
                  {p.name}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section
      id="collection"
      ref={sectionRef}
      className="relative"
      style={{ height: mobile ? "300vh" : "420vh" }}
    >
      <div className="sticky top-0 flex h-[100svh] w-full items-center justify-center overflow-hidden">
        <h2 className="absolute top-[14svh] w-full text-center font-serif text-[clamp(1.6rem,4vw,3rem)] tracking-[0.12em] text-ivory/80">
          THE KYZEN COLLECTION
        </h2>

        {products.map((p, i) => (
          <div
            key={p.size}
            ref={(el) => {
              itemRefs.current[i] = el;
            }}
            className="absolute w-[min(280px,54vw)] will-change-transform"
            style={{ opacity: 0 }}
          >
            <img
              src={p.image}
              alt={`KYZEN ${p.size} premium green cardamom pouch`}
              loading="lazy"
              className="w-full object-contain drop-shadow-[0_40px_60px_rgba(0,0,0,0.75)]"
            />
          </div>
        ))}

        <div
          data-collection-label
          className="absolute bottom-[12svh] w-full text-center"
          style={{ opacity: 0 }}
        >
          <p data-size className="font-serif text-5xl text-ivory md:text-7xl">
            10G
          </p>
          <p
            data-name
            className="mt-2 text-[11px] uppercase tracking-[0.36em] text-gold/80"
          >
            EVERYDAY
          </p>
        </div>
      </div>
    </section>
  );
}
