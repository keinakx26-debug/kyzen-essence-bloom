import { useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/lib/motion";

/** CTA that drifts subtly toward the cursor. Disabled for reduced-motion users. */
export function MagneticButton({
  children,
  className,
  as = "button",
  onClick,
  href,
}: {
  children: ReactNode;
  className?: string;
  as?: "button" | "a";
  onClick?: () => void;
  href?: string;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const reduced = useReducedMotion();

  const move = (e: React.MouseEvent) => {
    if (reduced || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    gsap.to(ref.current, {
      x: (e.clientX - (r.left + r.width / 2)) * 0.25,
      y: (e.clientY - (r.top + r.height / 2)) * 0.35,
      duration: 0.6,
      ease: "power3.out",
    });
  };
  const leave = () => {
    if (!ref.current) return;
    gsap.to(ref.current, { x: 0, y: 0, duration: 0.7, ease: "expo.out" });
  };

  const classes = cn(
    "inline-flex items-center gap-3 rounded-full border border-gold/40 px-8 py-4 text-xs uppercase tracking-[0.28em] text-ivory transition-colors duration-500 hover:border-gold hover:bg-gold/10",
    className,
  );

  if (as === "a") {
    return (
      <a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        className={classes}
        onMouseMove={move}
        onMouseLeave={leave}
      >
        {children}
      </a>
    );
  }
  return (
    <button
      ref={ref as React.RefObject<HTMLButtonElement>}
      onClick={onClick}
      className={classes}
      onMouseMove={move}
      onMouseLeave={leave}
    >
      {children}
    </button>
  );
}
