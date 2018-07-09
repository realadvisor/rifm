module.exports = {
  presets: [
    ['@babel/env', { modules: false, loose: true }],
    '@babel/flow',
    '@babel/react',
  ],
  plugins: [['@babel/proposal-class-properties', { loose: true }]],
};

if (process.env.NODE_ENV === 'test') {
  module.exports.plugins.push('@babel/transform-modules-commonjs');
}
