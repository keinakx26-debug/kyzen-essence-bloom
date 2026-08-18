import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { products } from "@/data/products";
import { PacketVisual } from "./PacketVisual";
import { MagneticButton } from "./MagneticButton";
import { toast } from "sonner";

export function SizeSelector() {
  const [active, setActive] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const current = products[active]!;

  useEffect(() => {
    if (!heroRef.current || !infoRef.current) return;
    gsap.fromTo(
      heroRef.current,
      { scale: 0.92, opacity: 0, filter: "blur(10px)" },
      { scale: 1, opacity: 1, filter: "blur(0px)", duration: 0.9, ease: "expo.out" },
    );
    gsap.fromTo(
      infoRef.current.children,
      { y: 18, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, stagger: 0.06, ease: "power3.out" },
    );
  }, [active]);

  return (
    <section id="shop" className="relative px-6 py-28 md:px-12 md:py-40">
      <div className="mx-auto max-w-[1400px]">
        <header className="text-center">
          <h2 className="font-serif text-[clamp(2.4rem,7vw,6rem)] leading-none text-ivory">
            CHOOSE YOUR SIZE
          </h2>
          <p className="mt-5 text-sm text-ivory/45">
            The right amount for every ritual.
          </p>
        </header>

        <div className="mt-20 grid items-center gap-16 lg:grid-cols-[1.1fr_1fr]">
          <div ref={heroRef} className="mx-auto w-[min(320px,70vw)]">
            <PacketVisual product={current} tilt />
          </div>

          <div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2">
              {products.map((p, i) => (
                <button
                  key={p.size}
                  onClick={() => setActive(i)}
                  className={`group rounded-lg border px-5 py-6 text-left transition-all duration-500 ${
                    i === active
                      ? "border-gold/60 bg-gold/5"
                      : "border-ivory/10 hover:border-ivory/30"
                  }`}
                >
                  <span
                    className={`block font-serif text-3xl transition-colors ${
                      i === active ? "text-ivory" : "text-ivory/50"
                    }`}
                  >
                    {p.size.toUpperCase()}
                  </span>
                  <span className="mt-1 block text-[10px] uppercase tracking-[0.25em] text-ivory/40">
                    {p.name}
                  </span>
                </button>
              ))}
            </div>

            <div ref={infoRef} className="mt-12">
              <p className="text-[11px] uppercase tracking-[0.3em] text-gold/80">
                {current.name}
              </p>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-ivory/55">
                {current.description}
              </p>
              <p className="mt-8 font-serif text-4xl text-ivory">{current.price}</p>
              <div className="mt-8">
                <MagneticButton
                  onClick={() =>
                    toast.success(`KYZEN ${current.size} added to cart`, {
                      description: `${current.name} · ${current.price}`,
                    })
                  }
                >
                  Add to Cart
                </MagneticButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
