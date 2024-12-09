import type { StorybookConfig } from '@storybook/react-vite';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { mergeConfig } from 'vite';
import react from '@vitejs/plugin-react';

const config: StorybookConfig = {
  stories: ['../src/stories/**/*.@(mdx|stories.@(js|jsx|ts|tsx))'],
  addons: ['@storybook/addon-essentials', '@storybook/addon-interactions'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },

  viteFinal: async (config) =>
    mergeConfig(config, {
      plugins: [
        react(),
        nxViteTsPaths(),
        // MillionLint.vite({
        //   filter: {
        //     // I want a regex to exclude all the react tsx components with Icon at the end
        //     exclude: /Icon$/,
        //   },
        // }),
      ],
      define: {
        'process.env': process.env,
      },
      optimizeDeps: {
        exclude: ['@xmtp/user-preferences-bindings-wasm'],
      },
    }),
  typescript: {
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      include: ['src/**/*.{ts,tsx}'],
    },
  },
};

export default config;

// To customize your Vite configuration you can use the viteFinal field.
// Check https://storybook.js.org/docs/react/builders/vite#configuration
// and https://nx.dev/recipes/storybook/custom-builder-configs
