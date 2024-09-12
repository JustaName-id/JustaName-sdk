// import typescript from '@rollup/plugin-typescript';
// import strip from 'rollup-plugin-strip-shebang';
// import { nodeResolve } from '@rollup/plugin-node-resolve';
// import commonjs from '@rollup/plugin-commonjs';

const strip = require('rollup-plugin-strip-shebang');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs').default;

module.exports = (config) => {
  return {
    ...config,
    output: {
      ...config.output,
      banner: '#!/usr/bin/env node', // Adds the shebang
    },
    plugins: [
      ...config.plugins,
      strip(), // Strips the shebang
      nodeResolve({ browser: false, exportConditions: ['node'] }), // Resolves node modules
      commonjs({ sourceMap: false }), // Converts CommonJS modules to ES6
    ],
  };
};
//   input: 'packages/create-justaname-app/src/index.ts',
//   output: {
//     file: 'packages/create-justaname-app/dist/index.js',
//     format: 'esm', // This matches the "format" provided in the NX config
//     sourcemap: false, // Matches the "sourceMap" setting in the "production" configuration
//   },
//   plugins: [
//     strip(), // Strips the shebang
//     nodeResolve(), // Resolves node modules
//     commonjs(), // Converts CommonJS modules to ES6
//     typescript({
//       tsconfig: 'packages/create-justaname-app/tsconfig.lib.json', // Uses the specific tsconfig
//       outputToFilesystem: true,
//     }),
//   ],
// };
