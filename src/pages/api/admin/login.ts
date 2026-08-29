import type { APIRoute } from "astro";
import {
  createSessionCookieValue,
  ADMIN_COOKIE,
  getSessionSecret,
} from "../../../lib/session";

export const prerender = false;

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  const form = await request.formData();
  const password = form.get("password");

  if (password !== import.meta.env.ADMIN_PASSWORD) {
    return redirect("/admin/login?error=1");
  }

  const cookieValue = createSessionCookieValue(getSessionSecret());
  cookies.set(ADMIN_COOKIE.name, cookieValue, {
    path: "/",
    httpOnly: true,
    secure: import.meta.env.PROD,
    sameSite: "lax",
    maxAge: ADMIN_COOKIE.maxAge,
  });

  return redirect("/admin");
};
