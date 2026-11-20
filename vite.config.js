import adapter from '@sveltejs/adapter-static';
import { sveltekit } from '@sveltejs/kit/vite';
import { mdsvex } from 'mdsvex';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    mdsvex({ extensions: ['.md'] }),
    sveltekit({
      adapter: adapter({ fallback: '404.html' }),
      prerender: { handleHttpError: 'fail' }
    })
  ]
});
