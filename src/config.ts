// Config global del sitio.
// Cuando conectes Supabase, BS_RATE debería venir de una tabla `settings`
// actualizada por un cron en Python que consuma la API del BCV (o la que uses).

export const WHATSAPP_NUMBER = "584120000000"; // formato: 58 + código de área + número, sin '+' ni espacios

export const BS_RATE = 145.32; // ⚠️ placeholder — reemplazar por fetch a Supabase / API de tasa

export const SITE = {
  name: "DRAPE",
  tagline: "Piezas originales, directo a tu clóset.",
};
