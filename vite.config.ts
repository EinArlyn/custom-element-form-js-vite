import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
// @ts-ignore
import { terser } from 'rollup-plugin-terser';

export default defineConfig({
  plugins: [vue()],
  optimizeDeps: {
    exclude: [
      '@einarlyn/bpmn-form-extended',
      '@bpmn-io/properties-panel',
      '@bpmn-io/form-js',
    ],
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  build: {
    rollupOptions: {
      plugins: [terser({
        compress: {
          drop_console: false,
          pure_funcs: ['RangeField', 'formFields.register'],
        },
        mangle: {
          reserved: ['RangeField', 'formFields'],
          keep_classnames: true,
          keep_fnames: true,
        },
        format: {
          comments: false,
        },
        module: true,
      })],
      external: [
        '@einarlyn/bpmn-form-extended',
        '@bpmn-io/properties-panel',
        '@bpmn-io/form-js',
      ],
      output: {
        globals: {
          '@einarlyn/bpmn-form-extended': '@einarlyn/bpmn-form-extended',
          '@bpmn-io/properties-panel': '@bpmn-io/properties-panel',
          '@bpmn-io/form-js': '@bpmn-io/form-js',
        },
        manualChunks(id) {
          if (
            id.includes('@einarlyn/bpmn-form-extended') ||
            id.includes('@bpmn-io/properties-panel') ||
            id.includes('@bpmn-io/form-js')
          ) {
            console.log('id', id);
            return 'no-minify';
          }
        },
      },
    },
    commonjsOptions: {
      include: [/node_modules/],
      exclude: [
        '@einarlyn/bpmn-form-extended',
        '@bpmn-io/properties-panel',
        '@bpmn-io/form-js',
      ],
      transformMixedEsModules: true,
    },
    terserOptions: {
      mangle: {
        keep_classnames: true,
        keep_fnames: true,
        reserved: ['RangeField', 'formFields'],
      },
      compress: {
        drop_console: false,
        pure_funcs: ['RangeField', 'formFields.register'],
      },
      format: {
        comments: false,
      },
    },
  }
});
