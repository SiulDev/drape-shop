import { t as __exportAll } from "./rolldown-runtime_BBjsoOtd.mjs";
import { t as supabase } from "./supabase_DULDKpzO.mjs";
//#region src/pages/api/admin/products/update-price.ts
var update_price_exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	prerender: () => false
});
var POST = async ({ request, redirect }) => {
	const form = await request.formData();
	const id = String(form.get("id"));
	const price = Number(form.get("price"));
	if (Number.isNaN(price)) return redirect("/admin?error=Precio inválido");
	const { error } = await supabase.from("products").update({ price_usd: price }).eq("id", id);
	if (error) return redirect(`/admin?error=${encodeURIComponent(error.message)}`);
	return redirect("/admin");
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/admin/products/update-price@_@ts
var page = () => update_price_exports;
//#endregion
export { page };
