import { defineConfig } from 'vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
import vue from '@vitejs/plugin-vue';
import minifyBundles from './src/plugins/minifyBundles';
import Components from 'unplugin-vue-components/vite';

export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [
        AntDesignVueResolver({
          importStyle: false, // css in js
        }),
      ],
    }),
  ],
  optimizeDeps: {
    exclude: [
      '@einarlyn/bpmn-form-extended',
      // '@bpmn-io/properties-panel',
      // '@bpmn-io/form-js',
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
      plugins: [minifyBundles()],
    },
    minify: false,
  },
});
