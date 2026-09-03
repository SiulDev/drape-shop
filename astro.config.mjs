import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  // El motor de Tailwind v4 vive aquí ahora
  vite: {
    plugins: [tailwindcss()],
  },

  output: 'static',
  adapter: cloudflare(),
});