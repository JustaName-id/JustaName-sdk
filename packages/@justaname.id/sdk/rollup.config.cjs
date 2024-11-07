const { nodeResolve } = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs')

module.exports = (config) => {
  return {
    ...config,
    plugins: [
      nodeResolve({
        extensions: ['.js', '.ts', '.tsx'],
      }),
      commonjs(),
      ...config.plugins,
    ],
  };
}