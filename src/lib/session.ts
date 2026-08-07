import { createHmac, timingSafeEqual } from "node:crypto";

const COOKIE_NAME = "drape_admin";
const MAX_AGE_SECONDS = 60 * 60 * 8; // 8 horas

function sign(value: string, secret: string) {
  return createHmac("sha256", secret).update(value).digest("hex");
}

/** Genera el valor "payload.firma" que se guarda en la cookie al hacer login. */
export function createSessionCookieValue(secret: string) {
  const payload = `admin:${Date.now()}`;
  return `${payload}.${sign(payload, secret)}`;
}

/** Verifica que la cookie no fue alterada y que no expiró. */
export function isValidSession(cookieValue: string | undefined, secret: string) {
  if (!cookieValue) return false;

  const [payload, signature] = cookieValue.split(".");
  if (!payload || !signature) return false;

  const expected = sign(payload, secret);
  const a = Buffer.from(signature);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return false;

  const timestamp = Number(payload.split(":")[1]);
  if (Number.isNaN(timestamp)) return false;

  const ageSeconds = (Date.now() - timestamp) / 1000;
  return ageSeconds < MAX_AGE_SECONDS;
}

export const ADMIN_COOKIE = { name: COOKIE_NAME, maxAge: MAX_AGE_SECONDS };
