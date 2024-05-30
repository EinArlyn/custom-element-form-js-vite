import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  optimizeDeps: {
    include: ['classnames'],
    exclude: ['@einarlyn/bpmn-form-extended'],
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  build: {
    minify: false,
  },
});
