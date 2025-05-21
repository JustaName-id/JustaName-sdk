const nrwlConfig = require('@nrwl/react/plugins/bundle-rollup');
const svgr = require('@svgr/rollup').default;
const preserveDirectives = require('rollup-preserve-directives').default;
const autoprefixer = require('autoprefixer');
const postcss = require('rollup-plugin-postcss');
const postcssImport = require('postcss-import');

module.exports = (config) => {
  const nxConfig = nrwlConfig(config);

  const pluginsWithoutNxPostcss = nxConfig.plugins
    ? nxConfig.plugins.filter(
        (plugin) => !(plugin && plugin.name === 'postcss')
      )
    : [];

  const finalPlugins = [
    postcss({
      plugins: [
        postcssImport(),
        require('tailwindcss')('./tailwind.config.js'),
        autoprefixer(),
      ],
      autoModules: true,
      extract: 'index.esm.css',
      sourceMap: process.env.NODE_ENV !== 'production',
    }),
    ...pluginsWithoutNxPostcss,
    preserveDirectives(),
  ];

  return {
    ...nxConfig,
    plugins: finalPlugins,
  };
};
