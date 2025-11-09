import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  output: 'static',  // CRUCIAL pour Netlify Forms
  integrations: [tailwind()],
});