import { useEffect, useState } from "react";
import { ShoppingBag, Menu, X } from "lucide-react";

const LINKS = [
  { label: "SHOP", href: "#shop" },
  { label: "OUR STORY", href: "#story" },
  { label: "CARDAMOM", href: "#cardamom" },
  { label: "CONTACT", href: "#contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-background/70 py-3 backdrop-blur-xl"
            : "bg-transparent py-6"
        }`}
      >
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 md:px-12">
          <a
            href="#top"
            className={`font-serif tracking-[0.4em] text-ivory transition-all duration-500 ${
              scrolled ? "text-lg" : "text-xl md:text-2xl"
            }`}
          >
            KYZEN
          </a>

          <nav className="hidden items-center gap-10 md:flex">
            {LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="text-[11px] uppercase tracking-[0.25em] text-ivory/60 transition-colors duration-300 hover:text-ivory"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-5">
            <button
              aria-label="Cart"
              className="text-ivory/70 transition-colors hover:text-gold"
            >
              <ShoppingBag className="h-5 w-5" strokeWidth={1.2} />
            </button>
            <button
              aria-label="Menu"
              className="text-[11px] uppercase tracking-[0.25em] text-ivory/70 md:hidden"
              onClick={() => setOpen(true)}
            >
              <Menu className="h-5 w-5" strokeWidth={1.2} />
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen mobile menu */}
      <div
        className={`fixed inset-0 z-[60] flex flex-col bg-background transition-all duration-500 md:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-6">
          <span className="font-serif text-xl tracking-[0.4em] text-ivory">KYZEN</span>
          <button aria-label="Close menu" onClick={() => setOpen(false)}>
            <X className="h-6 w-6 text-ivory" strokeWidth={1.2} />
          </button>
        </div>
        <nav className="flex flex-1 flex-col justify-center gap-8 px-8">
          {LINKS.map((l, i) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              className="font-serif text-4xl text-ivory/90"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              {l.label}
            </a>
          ))}
        </nav>
        <p className="px-8 pb-10 text-[11px] uppercase tracking-[0.3em] text-gold/70">
          The essence of cardamom
        </p>
      </div>
    </>
  );
}
