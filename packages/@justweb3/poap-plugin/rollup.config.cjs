const nrwlConfig = require('@nrwl/react/plugins/bundle-rollup');
const svgr = require('@svgr/rollup').default;
const preserveDirectives = require('rollup-preserve-directives').default;
const nodeResolve = require('@rollup/plugin-node-resolve').default;
const commonjs = require('@rollup/plugin-commonjs');
const path = require('path');

module.exports = (config) => {
  const nxConfig = nrwlConfig(config);
  nxConfig.input = {
    index: path.join(__dirname, 'src/index.ts'),
    'server/getPoaps': path.join(__dirname, 'src/server/getPoaps.ts'),
  };
  return {
    ...nxConfig,
    plugins: [
      ...nxConfig.plugins,
      nodeResolve({
        preferBuiltins: false,
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      }),
      commonjs(),
      preserveDirectives(),
    ],
  };
};
