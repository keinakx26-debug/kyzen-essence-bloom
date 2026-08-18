import { useState } from "react";
import type { Product } from "@/data/products";
import { cn } from "@/lib/utils";

/**
 * Renders the real packet artwork from /public/images when present and falls
 * back to a CSS placeholder packet — drop the PNGs in later, no code changes.
 */
export function PacketVisual({
  product,
  className,
  tilt = false,
}: {
  product: Product;
  className?: string;
  tilt?: boolean;
}) {
  const [broken, setBroken] = useState(false);

  const tiltHandlers = tilt
    ? {
        onMouseMove: (e: React.MouseEvent<HTMLDivElement>) => {
          const r = e.currentTarget.getBoundingClientRect();
          const rx = ((e.clientY - r.top) / r.height - 0.5) * -8;
          const ry = ((e.clientX - r.left) / r.width - 0.5) * 10;
          e.currentTarget.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`;
        },
        onMouseLeave: (e: React.MouseEvent<HTMLDivElement>) => {
          e.currentTarget.style.transform =
            "perspective(900px) rotateX(0deg) rotateY(0deg)";
        },
      }
    : {};

  return (
    <div
      {...tiltHandlers}
      className={cn(
        "relative aspect-[2/3] w-full transition-transform duration-500 ease-out",
        className,
      )}
    >
      {!broken ? (
        <img
          src={product.image}
          alt={`KYZEN ${product.size} premium green cardamom packet`}
          onError={() => setBroken(true)}
          className="h-full w-full object-contain"
          loading="lazy"
        />
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-between rounded-md bg-[linear-gradient(140deg,#1d3a2a,#0f2018_55%,#081410)] px-4 py-6 shadow-[0_30px_60px_-25px_rgba(0,0,0,0.9)] ring-1 ring-gold/15">
          <div className="h-1 w-full rounded-full bg-ivory/10" />
          <div className="text-center">
            <p className="font-serif text-2xl tracking-[0.3em] text-ivory">KYZEN</p>
            <div className="mx-auto mt-2 h-px w-12 bg-gold/70" />
            <p className="mt-3 text-[8px] uppercase tracking-[0.22em] text-gold/80">
              Premium Green Cardamom
            </p>
          </div>
          <p className="font-serif text-3xl text-ivory/90">
            {product.size.toUpperCase()}
          </p>
          <div className="h-1 w-full rounded-full bg-ivory/10" />
        </div>
      )}
      <div className="pointer-events-none absolute -bottom-6 left-1/2 h-6 w-3/4 -translate-x-1/2 rounded-[50%] bg-black/60 blur-xl" />
    </div>
  );
}
