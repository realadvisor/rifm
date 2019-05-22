const path = require('path');

module.exports = {
  webpack: config => {
    config.resolve.alias['rifm'] = path.resolve('../dist/rifm.esm.js');
    return config;
  },
};
