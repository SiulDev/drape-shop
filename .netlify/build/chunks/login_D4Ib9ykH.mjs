import { t as __exportAll } from "./rolldown-runtime_BBjsoOtd.mjs";
import { n as createSessionCookieValue, r as getSessionSecret, t as ADMIN_COOKIE } from "./session_Bi15S1uf.mjs";
//#region src/pages/api/admin/login.ts
var login_exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	prerender: () => false
});
var POST = async ({ request, cookies, redirect }) => {
	if ((await request.formData()).get("password") !== "12345678") return redirect("/admin/login?error=1");
	const cookieValue = createSessionCookieValue(getSessionSecret());
	cookies.set(ADMIN_COOKIE.name, cookieValue, {
		path: "/",
		httpOnly: true,
		secure: true,
		sameSite: "lax",
		maxAge: ADMIN_COOKIE.maxAge
	});
	return redirect("/admin");
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/admin/login@_@ts
var page = () => login_exports;
//#endregion
export { page };
