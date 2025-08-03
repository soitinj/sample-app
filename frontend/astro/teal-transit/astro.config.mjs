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

  /* SSR build does not support exposing --host through astro preview
  To listen all network interfaces, entry.mjs needs to be edited after build.
  entry.mjs: _args = { ..., "host" :true }
  Then, run server through ./node/dist/server/entry.mjs
  */
  // To enable SSR, output needs to be 'server' or 'hybrid'
  output: 'static',
  adapter: node({
    mode: 'standalone'
  })
});
