import { t as __exportAll } from "./rolldown-runtime_BBjsoOtd.mjs";
import { t as supabase } from "./supabase_DULDKpzO.mjs";
//#region src/pages/api/admin/products/create.ts
var create_exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	prerender: () => false
});
function slugify(text) {
	return text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
var POST = async ({ request, redirect }) => {
	const form = await request.formData();
	const name = String(form.get("name") ?? "").trim();
	const brand = String(form.get("brand") ?? "").trim();
	const price = Number(form.get("price"));
	const inStock = form.get("in_stock") === "on";
	const imageFile = form.get("image");
	if (!name || !brand || Number.isNaN(price)) return redirect("/admin?error=Faltan campos requeridos");
	const slug = `${slugify(name)}-${Date.now().toString(36)}`;
	let imageUrl = null;
	if (imageFile && imageFile.size > 0) {
		const path = `${slug}.${imageFile.name.split(".").pop() || "jpg"}`;
		const { error: uploadError } = await supabase.storage.from("products").upload(path, imageFile, {
			contentType: imageFile.type,
			upsert: true
		});
		if (uploadError) return redirect(`/admin?error=${encodeURIComponent("Error subiendo imagen: " + uploadError.message)}`);
		const { data: publicUrl } = supabase.storage.from("products").getPublicUrl(path);
		imageUrl = publicUrl.publicUrl;
	}
	const { error: insertError } = await supabase.from("products").insert({
		slug,
		name,
		brand,
		price_usd: price,
		in_stock: inStock,
		image_url: imageUrl
	});
	if (insertError) return redirect(`/admin?error=${encodeURIComponent(insertError.message)}`);
	return redirect("/admin?success=1");
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/admin/products/create@_@ts
var page = () => create_exports;
//#endregion
export { page };
