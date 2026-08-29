import { defineMiddleware } from "astro:middleware";
import { isValidSession, ADMIN_COOKIE, getSessionSecret } from "./lib/session";

export const onRequest = defineMiddleware((context, next) => {
  const { pathname } = context.url;

  const isProtectedAdminRoute = pathname.startsWith("/admin") && pathname !== "/admin/login";
  if (!isProtectedAdminRoute) return next();

  const cookie = context.cookies.get(ADMIN_COOKIE.name)?.value;
  if (!isValidSession(cookie, getSessionSecret())) {
    return context.redirect("/admin/login");
  }

  return next();
});
