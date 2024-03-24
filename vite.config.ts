import { defineConfig } from 'vite'
import { fileURLToPath } from 'url'
import vue from '@vitejs/plugin-vue'
// @ts-ignore
import path from "path";

const __dirname = fileURLToPath(new URL('.', import.meta.url));

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      'preact/hooks': fileURLToPath(new URL('./node_modules/preact/hooks/dist/hooks.module.js', import.meta.url)),
      'preact/jsx-runtime': fileURLToPath(new URL('./node_modules/preact/jsx-runtime/dist/jsxRuntime.module.js', import.meta.url)),
      'preact/compat': fileURLToPath(new URL('./node_modules/preact/compat/dist/compat.module.js', import.meta.url)),
      'preact': fileURLToPath(new URL('./node_modules/preact/dist/preact.module.js', import.meta.url)),
      '../preact/hooks': fileURLToPath(new URL('./node_modules/preact/hooks/dist/hooks.module.js', import.meta.url)),
      '../preact/jsx-runtime': fileURLToPath(new URL('./node_modules/preact/jsx-runtime/dist/jsxRuntime.module.js', import.meta.url)),
      '../preact': fileURLToPath(new URL('./node_modules/preact/dist/preact.module.js', import.meta.url)),
    },
  },
})
