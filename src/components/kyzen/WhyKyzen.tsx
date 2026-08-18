import { useEffect, useRef } from "react";
import { useGsap, useReducedMotion } from "@/lib/motion";

const ITEMS = [
  { n: "01", t: "HAND SELECTED", s: "Sorted pod by pod for size, colour and integrity." },
  { n: "02", t: "PREMIUM GREEN CARDAMOM", s: "Only the deepest green, most aromatic grades." },
  { n: "03", t: "AROMA SEALED", s: "Packed cold to hold the volatile oils in place." },
];

export function WhyKyzen() {
  const ref = useRef<HTMLDivElement>(null);
  const { gsap, ScrollTrigger } = useGsap();
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !ref.current) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-why]").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 60, opacity: 0, filter: "blur(10px)" },
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 1.2,
            ease: "expo.out",
            scrollTrigger: { trigger: el, start: "top 85%" },
          },
        );
      });
    }, ref);
    return () => ctx.revert();
  }, [gsap, ScrollTrigger, reduced]);

  return (
    <section id="story" ref={ref} className="px-6 py-28 md:px-12 md:py-40">
      <div className="mx-auto max-w-[1400px]">
        <h2 className="font-serif text-[clamp(2.6rem,10vw,9rem)] leading-none text-ivory/90">
          WHY KYZEN
        </h2>
        <div className="mt-20 space-y-px border-t border-ivory/10">
          {ITEMS.map((i) => (
            <div
              key={i.n}
              data-why
              className="grid grid-cols-1 gap-4 border-b border-ivory/10 py-10 md:grid-cols-[120px_1fr_1fr] md:items-baseline md:py-14"
            >
              <span className="font-serif text-3xl text-gold/70">{i.n}</span>
              <h3 className="font-serif text-2xl text-ivory md:text-4xl">{i.t}</h3>
              <p className="text-sm leading-relaxed text-ivory/45">{i.s}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
