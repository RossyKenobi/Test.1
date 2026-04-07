import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import clerk from '@clerk/astro';

export default defineConfig({
  output: 'hybrid',
  adapter: vercel(),
  integrations: [clerk()],
  vite: {
    ssr: {
      noExternal: ['cookie', 'nanoid', 'clsx', '@clerk/astro'],
    },
  },
});
