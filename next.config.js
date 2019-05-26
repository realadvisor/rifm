const path = require('path');

module.exports = {
  webpack: config => {
    const rifmPath =
      process.env.NODE_ENV === 'production'
        ? './dist/rifm.esm.js'
        : './src/index.js';

    config.resolve.alias['rifm'] = path.resolve(rifmPath);
    return config;
  },
};
