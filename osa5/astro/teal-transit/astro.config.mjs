import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  integrations: [react()],

  // Vite configurations can still be passed to an Astro project!
  vite: {
    server: {
      proxy: {
        '/api': {
          target: 'http://localhost:3003',
          changeOrigin: true,
        },
      },
    },
    test: {
      environment: 'jsdom',
      globals: true,
      setupFiles: './testSetup.js',
    }  
  },
  output: 'static',
  adapter: node({
    mode: 'standalone'
  })
});