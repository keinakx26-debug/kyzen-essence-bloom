// Central product data — edit prices / images here only.
export type Product = {
  size: string;
  name: string;
  price: string;
  weightLabel: string;
  description: string;
  image: string; // drop real artwork at these paths in /public/images to replace placeholders
};

export const products: Product[] = [
  {
    size: "10g",
    name: "Everyday",
    price: "₹249",
    weightLabel: "10G",
    description: "A small pouch for daily chai and quiet mornings.",
    image: "/images/kyzen-10g.png",
  },
  {
    size: "20g",
    name: "Essential",
    price: "₹449",
    weightLabel: "20G",
    description: "The balanced tin — enough for a season of rituals.",
    image: "/images/kyzen-20g.png",
  },
  {
    size: "50g",
    name: "Family",
    price: "₹999",
    weightLabel: "50G",
    description: "Shared kitchens, long weekends, generous hands.",
    image: "/images/kyzen-50g.png",
  },
  {
    size: "100g",
    name: "Reserve",
    price: "₹1,849",
    weightLabel: "100G",
    description: "Our fullest expression. Aroma sealed at origin.",
    image: "/images/kyzen-100g.png",
  },
];
