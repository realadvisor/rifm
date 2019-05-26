const path = require('path');

module.exports = {
  webpack: config => {
    config.resolve.alias['rifm'] = path.resolve('./src/index.js');
    return config;
  },
};
