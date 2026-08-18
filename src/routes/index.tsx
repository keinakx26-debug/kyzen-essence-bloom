import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { Nav } from "@/components/kyzen/Nav";
import { Hero } from "@/components/kyzen/Hero";
import { CardamomJourney } from "@/components/kyzen/CardamomJourney";
import { SizeSelector } from "@/components/kyzen/SizeSelector";
import { WhyKyzen } from "@/components/kyzen/WhyKyzen";
import { OriginSection } from "@/components/kyzen/OriginSection";
import { RitualSection } from "@/components/kyzen/RitualSection";
import { FinalMoment, Footer } from "@/components/kyzen/FinalMoment";
import { useSmoothScroll } from "@/lib/useSmoothScroll";
import { useReducedMotion } from "@/lib/motion";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "KYZEN — The Essence of Cardamom" },
      {
        name: "description",
        content:
          "KYZEN premium green cardamom: hand selected, aroma sealed, available in 10g, 20g, 50g and 100g.",
      },
      { property: "og:title", content: "KYZEN — The Essence of Cardamom" },
      {
        property: "og:description",
        content:
          "Premium green cardamom, carefully selected and packed to preserve its natural aroma.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const reduced = useReducedMotion();
  useSmoothScroll(!reduced);

  return (
    <main className="bg-background text-ivory">
      <Nav />
      <Hero />
      <CardamomJourney />
      <SizeSelector />
      <WhyKyzen />
      <OriginSection />
      <RitualSection />
      <FinalMoment />
      <Footer />
      <Toaster />
    </main>
  );
}
