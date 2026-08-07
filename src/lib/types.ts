// Refleja 1:1 la tabla `products` de Supabase (ver supabase/schema.sql).
export type Product = {
  id: string;
  slug: string;
  name: string;
  brand: string;
  price_usd: number;
  in_stock: boolean;
  image_url: string | null;
};
