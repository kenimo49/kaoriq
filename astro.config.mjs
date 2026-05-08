// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://kaoriq.com',
  integrations: [
    sitemap({
      // 韓国語は事業として停止中のため、検索エンジンへ広告しない
      filter: (page) => !page.startsWith('https://kaoriq.com/ko/'),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
