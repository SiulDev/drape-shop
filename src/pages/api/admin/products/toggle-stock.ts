import type { APIRoute } from "astro";
import { supabaseAdmin } from "../../../../lib/supabase-admin";

export const prerender = false;

export const POST: APIRoute = async ({ request, redirect }) => {
  const form = await request.formData();
  const id = String(form.get("id"));
  const inStock = form.get("in_stock") === "true";

  const { error } = await supabaseAdmin.from("products").update({ in_stock: !inStock }).eq("id", id);

  if (error) {
    return redirect(`/admin?error=${encodeURIComponent(error.message)}`);
  }

  return redirect("/admin");
};
