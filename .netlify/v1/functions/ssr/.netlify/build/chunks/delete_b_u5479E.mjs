import { t as __exportAll } from "./rolldown-runtime_BBjsoOtd.mjs";
import { t as supabase } from "./supabase_DULDKpzO.mjs";
//#region src/pages/api/admin/products/delete.ts
var delete_exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	prerender: () => false
});
var POST = async ({ request, redirect }) => {
	const form = await request.formData();
	const id = String(form.get("id"));
	const imagePath = form.get("image_path");
	if (imagePath) await supabase.storage.from("products").remove([String(imagePath)]);
	const { error } = await supabase.from("products").delete().eq("id", id);
	if (error) return redirect(`/admin?error=${encodeURIComponent(error.message)}`);
	return redirect("/admin");
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/admin/products/delete@_@ts
var page = () => delete_exports;
//#endregion
export { page };
