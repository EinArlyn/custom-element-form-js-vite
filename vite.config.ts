import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      'preact/hooks': path.resolve(__dirname, 'node_modules/preact/hooks/dist/hooks.module.js'),
      'preact/jsx-runtime': path.resolve(__dirname, 'node_modules/preact/jsx-runtime/dist/jsxRuntime.module.js'),
      'preact/compat': path.resolve(__dirname, 'node_modules/preact/compat/dist/compat.module.js'),
      'preact': path.resolve(__dirname, 'node_modules/preact/dist/preact.module.js'),
      '../preact/hooks': path.resolve(__dirname, 'node_modules/preact/hooks/dist/hooks.module.js'),
      '../preact/jsx-runtime': path.resolve(__dirname, 'node_modules/preact/jsx-runtime/dist/jsxRuntime.module.js'),
      '../preact': path.resolve(__dirname, 'node_modules/preact/dist/preact.module.js')
    },
  },
})
