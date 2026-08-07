import type { APIRoute } from "astro";
import { ADMIN_COOKIE } from "../../../lib/session";

export const prerender = false;

export const POST: APIRoute = async ({ cookies, redirect }) => {
  cookies.delete(ADMIN_COOKIE.name, { path: "/" });
  return redirect("/admin/login");
};
