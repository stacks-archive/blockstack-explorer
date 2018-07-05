const path = require('path');
const webpackConfig = require('./webpack.config');

module.exports = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders }) => {
    config.resolve = webpackConfig.resolve;
    return config;
  },
  webpackDevMiddleware: (config) => config,
};
