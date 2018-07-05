module.exports = {
  presets: [
    ['@babel/env', { modules: false, loose: true }],
    ['@babel/stage-3', { loose: true }],
    '@babel/flow',
    '@babel/react',
  ],
};
