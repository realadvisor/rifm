module.exports = {
  presets: [['@babel/env', { loose: true }], '@babel/flow', '@babel/react'],
  plugins: [['@babel/proposal-class-properties', { loose: true }]],
};
