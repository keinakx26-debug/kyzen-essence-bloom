/**
 * KYZEN — central asset configuration.
 *
 * This is the ONLY place asset paths live. Every visual in the site reads from
 * here, so replacing a placeholder with real photography is a one-line change.
 *
 * Currently every entry points at a CDN-hosted asset pointer (`.asset.json`).
 * To swap in your own file, either:
 *   1. drop the photo in /public/assets/... and set the string to that path, or
 *   2. re-upload through Lovable assets and swap the import.
 *
 * FUTURE PROFESSIONAL PHOTOGRAPHY SLOTS
 *   1. cardamomPile   — wide cinematic shot of many green cardamom pods
 *   2. cardamomPod    — one isolated hero pod, transparent background
 *   3. cardamomSeeds  — macro of an opened pod with its seeds
 *   4. products['10g'] — actual KYZEN 10g transparent pouch  (real artwork in place)
 *   5. products['20g'] — actual KYZEN 20g transparent pouch  (placeholder: 10g artwork)
 *   6. products['50g'] — actual KYZEN 50g transparent pouch  (placeholder: 10g artwork)
 *   7. products['100g'] — actual KYZEN 100g transparent pouch (placeholder: 10g artwork)
 *   8. lifestyle      — premium tea / coffee / dessert / everyday photography
 */

import logo from "@/assets/kyzen-logo.png.asset.json";
import pile from "@/assets/cardamom-pile.jpg.asset.json";
import pod from "@/assets/cardamom-pod.png.asset.json";
import seeds from "@/assets/cardamom-seeds.jpg.asset.json";
import packFront from "@/assets/pack-front.png.asset.json";
import packBack from "@/assets/pack-back.png.asset.json";
import plantation from "@/assets/plantation.jpg.asset.json";
import tea from "@/assets/tea.jpg.asset.json";
import coffee from "@/assets/coffee.jpg.asset.json";
import dessert from "@/assets/dessert.jpg.asset.json";
import everyday from "@/assets/everyday.jpg.asset.json";

export const assets = {
  logo: logo.url,
  cardamomPile: pile.url,
  cardamomPod: pod.url,
  cardamomSeeds: seeds.url,
  /** Real KYZEN pouch artwork — front and back of the 10g pack. */
  packFront: packFront.url,
  packBack: packBack.url,
  products: {
    // 10g uses the real pouch artwork. The larger sizes reuse it until the
    // actual 20g / 50g / 100g product photographs are supplied.
    "10g": packFront.url,
    "20g": packFront.url,
    "50g": packFront.url,
    "100g": packFront.url,
  } as Record<string, string>,
  lifestyle: {
    plantation: plantation.url,
    tea: tea.url,
    coffee: coffee.url,
    dessert: dessert.url,
    everyday: everyday.url,
  },
} as const;
