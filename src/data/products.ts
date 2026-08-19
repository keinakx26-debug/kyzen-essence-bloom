import { assets } from "@/config/assets";

// Central product data — edit prices / copy here only.
export type Product = {
  size: string;
  name: string;
  price: string;
  weightLabel: string;
  description: string;
  image: string; // resolved from src/config/assets.ts
};

export const products: Product[] = [
  {
    size: "10g",
    name: "Everyday",
    price: "₹249",
    weightLabel: "10G",
    description: "A small pouch for daily chai and quiet mornings.",
    image: assets.products["10g"]!,
  },
  {
    size: "20g",
    name: "Essential",
    price: "₹449",
    weightLabel: "20G",
    description: "The balanced pouch — enough for a season of rituals.",
    image: assets.products["20g"]!,
  },
  {
    size: "50g",
    name: "Family",
    price: "₹999",
    weightLabel: "50G",
    description: "Shared kitchens, long weekends, generous hands.",
    image: assets.products["50g"]!,
  },
  {
    size: "100g",
    name: "Reserve",
    price: "₹1,849",
    weightLabel: "100G",
    description: "Our fullest expression. Aroma sealed at origin.",
    image: assets.products["100g"]!,
  },
];
