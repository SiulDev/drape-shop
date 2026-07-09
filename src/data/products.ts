export type Product = {
  slug: string;
  name: string;
  brand: string;
  price: number; // en USD, sigue siendo la moneda base
  stock: number;
  img: string;
};

// MVP: array local tipado.
// Fase 2: reemplazar por `const { data } = await supabase.from('products').select('*')`
// dentro de `products.astro` — el resto de componentes no cambia porque
// consumen el mismo shape `Product[]`.
export const products: Product[] = [
  { slug: "essentials-black", name: "Essentials Tee — Negro", brand: "Essentials", price: 35, stock: 6, img: "/images/essentials-black.jpg" },
  { slug: "essentials-white", name: "Essentials Tee — Blanco", brand: "Essentials", price: 35, stock: 4, img: "/images/essentials-white.jpg" },
  { slug: "essentials-sand", name: "Essentials Tee — Arena", brand: "Essentials", price: 35, stock: 3, img: "/images/essentials-sand.jpg" },
  { slug: "essentials-sage", name: "Essentials Tee — Sage", brand: "Essentials", price: 35, stock: 0, img: "/images/essentials-sage.jpg" },
  { slug: "corteiz-cream", name: "Corteiz Arch — Crema", brand: "Corteiz", price: 32, stock: 5, img: "/images/corteiz-cream.jpg" },
  { slug: "corteiz-white-outline", name: "Corteiz Arch — Blanco", brand: "Corteiz", price: 32, stock: 2, img: "/images/corteiz-white-outline.jpg" },
  { slug: "corteiz-script-white", name: "Corteiz Script — Blanco", brand: "Corteiz", price: 32, stock: 7, img: "/images/corteiz-script-white.jpg" },
  { slug: "chromehearts-black-cross", name: "Chrome Hearts Cross — Negro", brand: "Chrome Hearts", price: 45, stock: 2, img: "/images/chromehearts-black-cross.jpg" },
  { slug: "chromehearts-white-pink", name: "Chrome Hearts Flame — Blanco", brand: "Chrome Hearts", price: 45, stock: 1, img: "/images/chromehearts-white-pink.jpg" },
  { slug: "chromehearts-black-red", name: "Chrome Hearts Ring — Negro/Rojo", brand: "Chrome Hearts", price: 45, stock: 4, img: "/images/chromehearts-black-red.jpg" },
  { slug: "nudeproject-brown", name: "Nude Project — Marrón", brand: "Nude Project", price: 30, stock: 6, img: "/images/nudeproject-brown.jpg" },
  { slug: "npc-green", name: "NPC — Verde", brand: "Nude Project", price: 30, stock: 3, img: "/images/npc-green.jpg" },
  { slug: "faith-black", name: "Has Your Faith Fade — Negro", brand: "Otros", price: 28, stock: 5, img: "/images/faith-black.jpg" },
];

export const brands = ["Todo", ...Array.from(new Set(products.map((p) => p.brand)))];
