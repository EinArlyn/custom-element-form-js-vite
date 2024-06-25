import { minify } from 'terser';

const minifyBundles = () => {
  return {
    name: 'minifyBundles',
    async generateBundle(_options: any, bundle: any) {
      for (const key in bundle) {
        if (bundle[key].type === 'chunk' && !key.includes('customFormEditor')) {
          const minifyCode = await minify(bundle[key].code, { sourceMap: false });
          bundle[key].code = minifyCode.code;
        } else if (bundle[key].type === 'chunk' && key.includes('customFormEditor')) {
          const minifyCode = await minify(bundle[key].code, {
            mangle: {
              reserved: ['RangeField', 'formFields.register', 'formFields']
            },
            sourceMap: false,
          });
          bundle[key].code = minifyCode.code;
        }
      }
      return bundle;
    },
  };
};

export default minifyBundles;
