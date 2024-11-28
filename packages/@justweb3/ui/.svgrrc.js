module.exports = {
  typescript: true,
  dimensions: false,
  svgo: true,
  replaceAttrValues: {
    'var(--justweb3-primary-color)':
      '{props.fill || "var(--justweb3-primary-color)"}',
  },
  template: require('./src/template/template.js'),
};
