const nrwlConfig = require('@nrwl/react/plugins/bundle-rollup')
const svgr = require('@svgr/rollup').default
const preserveDirectives = require('rollup-preserve-directives').default
module.exports = (config) => {
  const nxConfig = nrwlConfig(config)
  return {
    ...nxConfig,
    plugins: [...nxConfig.plugins, preserveDirectives()],
  }
}