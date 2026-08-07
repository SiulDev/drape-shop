// Script de UNA sola vez para migrar tu catálogo local (public/images/*.jpg)
// hacia Supabase (Storage + tabla products).
//
// Uso:
//   node scripts/seed.mjs
//
// Requiere haber corrido supabase/schema.sql y tener el .env completo.

import "dotenv/config";
import { createClient } from "@supabase/supabase-js";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { products as legacyProducts } from "../src/data/products.ts";

const supabase = createClient(process.env.PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function run() {
  for (const p of legacyProducts) {
    const fileName = p.img.replace("/images/", "");
    const filePath = path.join(process.cwd(), "public", "images", fileName);
    const fileBuffer = await readFile(filePath);

    const { error: uploadError } = await supabase.storage
      .from("products")
      .upload(fileName, fileBuffer, { contentType: "image/jpeg", upsert: true });

    if (uploadError) {
      console.error(`❌ Error subiendo ${fileName}:`, uploadError.message);
      continue;
    }

    const { data: publicUrl } = supabase.storage.from("products").getPublicUrl(fileName);

    const { error: insertError } = await supabase.from("products").upsert(
      {
        slug: p.slug,
        name: p.name,
        brand: p.brand,
        price_usd: p.price,
        in_stock: p.stock > 0, // el número de stock local se colapsa a booleano
        image_url: publicUrl.publicUrl,
      },
      { onConflict: "slug" }
    );

    if (insertError) {
      console.error(`❌ Error insertando ${p.name}:`, insertError.message);
    } else {
      console.log(`✅ ${p.name}`);
    }
  }

  console.log("\nListo. Revisa la tabla `products` en tu dashboard de Supabase.");
}

run();
