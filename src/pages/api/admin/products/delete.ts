import type { APIRoute } from "astro";
import { supabase } from "../../../../lib/supabase";

export const prerender = false;

export const POST: APIRoute = async ({ request, redirect }) => {
  const form = await request.formData();
  const id = String(form.get("id"));
  const imagePath = form.get("image_path");

  if (imagePath) {
    await supabase.storage.from("products").remove([String(imagePath)]);
  }

  const { error } = await supabase.from("products").delete().eq("id", id);

  if (error) {
    return redirect(`/admin?error=${encodeURIComponent(error.message)}`);
  }

  return redirect("/admin");
};
