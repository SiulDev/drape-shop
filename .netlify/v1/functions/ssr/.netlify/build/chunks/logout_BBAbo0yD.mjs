import { t as __exportAll } from "./rolldown-runtime_BBjsoOtd.mjs";
import { t as ADMIN_COOKIE } from "./session_Bi15S1uf.mjs";
//#region src/pages/api/admin/logout.ts
var logout_exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	prerender: () => false
});
var POST = async ({ cookies, redirect }) => {
	cookies.delete(ADMIN_COOKIE.name, { path: "/" });
	return redirect("/admin/login");
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/admin/logout@_@ts
var page = () => logout_exports;
//#endregion
export { page };
