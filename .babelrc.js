module.exports = {
  presets: [
    ['@babel/env', { modules: false, loose: true }],
    '@babel/flow',
    '@babel/react',
  ],
  plugins: [['@babel/proposal-class-properties', { loose: true }]],
};

if (process.env.NODE_ENV === 'test') {
  module.exports = {
    presets: [
      ['@babel/env', { modules: false, loose: false }],
      '@babel/flow',
      '@babel/react',
    ],
    plugins: [
      ['@babel/proposal-class-properties', { loose: true }],
      '@babel/transform-modules-commonjs',
    ],
  };
}
