const env = require('./env-config.js');

module.exports = {
  presets: ['next/babel'],
  plugins: [
    ['transform-define', env],
    'styled-components',
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          '@components': './components',
          '@containers': './containers',
          '@stores': './stores',
          '@pages': './pages',
          '@common': './common',
          '@utils': './utils',
          '@client': './lib/client',
          '@styled': './styled',
        },
      },
    ],
    '@babel/plugin-transform-regenerator',
    '@babel/plugin-transform-runtime',
  ],
};
