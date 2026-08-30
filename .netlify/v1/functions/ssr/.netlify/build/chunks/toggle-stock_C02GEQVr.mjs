import { t as __exportAll } from "./rolldown-runtime_BBjsoOtd.mjs";
import { t as supabase } from "./supabase_DULDKpzO.mjs";
//#region src/pages/api/admin/products/toggle-stock.ts
var toggle_stock_exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	prerender: () => false
});
var POST = async ({ request, redirect }) => {
	const form = await request.formData();
	const id = String(form.get("id"));
	const inStock = form.get("in_stock") === "true";
	const { error } = await supabase.from("products").update({ in_stock: !inStock }).eq("id", id);
	if (error) return redirect(`/admin?error=${encodeURIComponent(error.message)}`);
	return redirect("/admin");
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/admin/products/toggle-stock@_@ts
var page = () => toggle_stock_exports;
//#endregion
export { page };
