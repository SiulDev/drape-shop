import { createHmac } from "node:crypto";
//#region src/lib/session.ts
var COOKIE_NAME = "drape_admin";
var MAX_AGE_SECONDS = 3600 * 8;
function getSessionSecret() {
	return "drape-admin-session-secret-2026-local";
}
function sign(value, secret) {
	return createHmac("sha256", secret).update(value).digest("hex");
}
function createSessionCookieValue(secret) {
	const payload = `admin:${Date.now()}`;
	return `${payload}.${sign(payload, secret)}`;
}
var ADMIN_COOKIE = {
	name: COOKIE_NAME,
	maxAge: MAX_AGE_SECONDS
};
//#endregion
export { createSessionCookieValue as n, getSessionSecret as r, ADMIN_COOKIE as t };
