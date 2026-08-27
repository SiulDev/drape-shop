import { defineConfig } from 'astro/config';
import keystatic from '@keystatic/astro';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  // Las integraciones de Astro
  integrations: [
    react(),
    keystatic()
  ],
  // El motor de Tailwind v4 vive aquí ahora
  vite: {
    plugins: [tailwindcss()],
  },
  output: 'static',
});
