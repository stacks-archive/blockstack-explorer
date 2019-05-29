const path = require('path');
const webpackConfig = require('./webpack.config');

module.exports = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders }) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      ...webpackConfig.resolve.alias,
    };
    config.module.rules.push({
      test: /\.(woff|woff2|eot|ttf|svg)$/,
      loader: 'url-loader?limit=100000',
      include: [path.resolve(__dirname, 'assets/fonts')],
    });
    return config;
  },
  webpackDevMiddleware: (config) => config,
};
