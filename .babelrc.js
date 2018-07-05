module.exports = {
  presets: [
    ['@babel/env', { modules: false, loose: true }],
    ['@babel/stage-3', { loose: true }],
    '@babel/flow',
    '@babel/react',
  ],
};

if (process.env.NODE_ENV === 'test') {
  module.exports.plugins = ['@babel/transform-modules-commonjs'];
}
