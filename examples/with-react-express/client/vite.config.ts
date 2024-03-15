/// <reference types='vitest' />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { join } from 'path';
import dts from 'vite-plugin-dts';
export default defineConfig({
  root: __dirname,
  cacheDir: '../../../node_modules/.vite/examples/with-react-express/client',

  server: {
    port: 4200,
    host: 'localhost',
  },

  preview: {
    port: 4300,
    host: 'localhost',
  },

  plugins: [react(), nxViteTsPaths(),
    dts({
      entryRoot: 'src',
      tsconfigPath: join(__dirname, 'tsconfig.json'),
      exclude: ['../../../node_modules/**/*','node_modules/**/*'],
    }),
  ],
  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [ nxViteTsPaths() ],
  // },

  build: {
    outDir: '../../../dist/examples/with-react-express/client',
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
});
