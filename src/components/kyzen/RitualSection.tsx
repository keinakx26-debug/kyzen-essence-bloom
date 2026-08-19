import { assets } from "@/config/assets";

const RITUALS = [
  { t: "TEA", s: "A single crushed pod, steeped slow.", img: assets.lifestyle.tea },
  { t: "COFFEE", s: "Warmth folded into the bitterness.", img: assets.lifestyle.coffee },
  { t: "DESSERTS", s: "Cream, saffron, cardamom.", img: assets.lifestyle.dessert },
  { t: "EVERYDAY", s: "The quiet note in ordinary hours.", img: assets.lifestyle.everyday },
];

export function RitualSection() {
  return (
    <section id="contact" className="px-6 py-28 md:px-12 md:py-40">
      <div className="mx-auto max-w-[1400px]">
        <p className="text-[11px] uppercase tracking-[0.35em] text-gold/70">
          The Ritual
        </p>
        <div className="mt-12 grid gap-px border-t border-ivory/10 md:grid-cols-4">
          {RITUALS.map((r) => (
            <article
              key={r.t}
              className="group relative overflow-hidden border-b border-ivory/10 px-2 py-14 md:border-b-0"
            >
              <div
                className="absolute inset-0 scale-105 bg-cover bg-center opacity-0 transition-all duration-700 group-hover:scale-100 group-hover:opacity-25"
                style={{ backgroundImage: `url(${r.img})` }}
              />
              <div className="relative">
                <h3 className="font-serif text-3xl text-ivory/80 transition-colors duration-500 group-hover:text-ivory md:text-4xl">
                  {r.t}
                </h3>
                <p className="mt-4 max-w-[16rem] text-xs leading-relaxed text-ivory/35 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  {r.s}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
