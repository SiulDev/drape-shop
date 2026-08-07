import type { APIRoute } from "astro";
import { supabaseAdmin } from "../../../../lib/supabase-admin";

export const prerender = false;

export const POST: APIRoute = async ({ request, redirect }) => {
  const form = await request.formData();
  const id = String(form.get("id"));
  const price = Number(form.get("price"));

  if (Number.isNaN(price)) {
    return redirect("/admin?error=Precio inválido");
  }

  const { error } = await supabaseAdmin.from("products").update({ price_usd: price }).eq("id", id);

  if (error) {
    return redirect(`/admin?error=${encodeURIComponent(error.message)}`);
  }

  return redirect("/admin");
};
