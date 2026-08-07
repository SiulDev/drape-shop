// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// Sitio 100% estático por ahora (sin admin, sin server-side).
// Cuando retomemos Supabase, aquí se vuelve a agregar output:'server' + adapter.
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
});
