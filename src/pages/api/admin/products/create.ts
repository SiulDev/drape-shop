import type { APIRoute } from "astro";
import { supabase } from "../../../../lib/supabase";

export const prerender = false;

function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // quita acentos
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export const POST: APIRoute = async ({ request, redirect }) => {
  const form = await request.formData();

  const name = String(form.get("name") ?? "").trim();
  const brand = String(form.get("brand") ?? "").trim();
  const price = Number(form.get("price"));
  const inStock = form.get("in_stock") === "on";
  const imageFile = form.get("image") as File | null;

  if (!name || !brand || Number.isNaN(price)) {
    return redirect("/admin?error=Faltan campos requeridos");
  }

  const slug = `${slugify(name)}-${Date.now().toString(36)}`;
  let imageUrl: string | null = null;

  if (imageFile && imageFile.size > 0) {
    const ext = imageFile.name.split(".").pop() || "jpg";
    const path = `${slug}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from("products")
      .upload(path, imageFile, { contentType: imageFile.type, upsert: true });

    if (uploadError) {
      return redirect(`/admin?error=${encodeURIComponent("Error subiendo imagen: " + uploadError.message)}`);
    }

    const { data: publicUrl } = supabase.storage.from("products").getPublicUrl(path);
    imageUrl = publicUrl.publicUrl;
  }

  const { error: insertError } = await supabase.from("products").insert({
    slug,
    name,
    brand,
    price_usd: price,
    in_stock: inStock,
    image_url: imageUrl,
  });

  if (insertError) {
    return redirect(`/admin?error=${encodeURIComponent(insertError.message)}`);
  }

  return redirect("/admin?success=1");
};
