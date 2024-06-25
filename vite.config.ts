import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import minifyBundles from './src/plugins/minifyBundles';
// import path from "path";

export default defineConfig({
  plugins: [vue()],
  optimizeDeps: {
    exclude: [
      '@einarlyn/bpmn-form-extended',
      '@bpmn-io/properties-panel',
      '@bpmn-io/form-js',
    ],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('bpmn-form-extended')) {
            return 'customFormEditor';
          }

          return 'app';
        },
      },
      plugins: [
        minifyBundles(),
      ]
    },
    minify: false,
  },
});
