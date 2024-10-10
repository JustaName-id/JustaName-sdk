const nrwlConfig = require('@nrwl/react/plugins/bundle-rollup')
const preserveDirectives = require('rollup-preserve-directives').default

module.exports = (config) => {
  const nxConfig = nrwlConfig(config)
  return {
    ...nxConfig,
    plugins: [
      ...nxConfig.plugins,
      preserveDirectives()
    ]
  }
}