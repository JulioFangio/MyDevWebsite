// Script pour activer l'adaptateur Netlify seulement pour le build
import { writeFileSync } from 'fs';

const netlifyConfig = `import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import netlify from '@astrojs/netlify';

export default defineConfig({
  output: 'server',
  adapter: netlify(),
  integrations: [tailwind()],
});`;

writeFileSync('astro.config.mjs', netlifyConfig);
console.log('✅ Configuration Netlify activée pour le build');