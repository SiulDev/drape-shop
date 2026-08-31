import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

import netlify from '@astrojs/netlify';
import keystatic from '@keystatic/astro';

export default defineConfig({
  // El motor de Tailwind v4 vive aquí ahora
  vite: {
    plugins: [tailwindcss()],
  },

  output: 'static',
  adapter: netlify(),
  integrations: [keystatic()],
});
