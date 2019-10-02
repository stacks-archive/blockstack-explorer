// require('babel-register');

module.exports = {
  extends: ['airbnb', 'plugin:prettier/recommended', 'prettier/react'],
  rules: {
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.js', '.jsx'],
      },
    ],
    'no-unused-expressions': [
      'error',
      {
        allowTaggedTemplates: true,
      },
    ],
    'no-underscore-dangle': [0],
    'import/prefer-default-export': [0],
    'no-console': [0],
    'react/forbid-prop-types': [0],
    'no-param-reassign': [0],
    'import/no-extraneous-dependencies': [0],
    'react/prefer-stateless-function': [0],
    'react/prop-types': [1],
    'no-restricted-globals': [0],
  },
  env: {
    es6: true,
    browser: true,
  },
  parser: 'babel-eslint',
  globals: {
    gtag: true,
  },
  settings: {
    'import/resolver': {
      webpack: true,
      'babel-module': {
        alias: {
          '@components': './components',
          '@containers': './containers',
          '@stores': './stores',
          '@pages': './pages',
          '@common': './lib/common',
          '@utils': './utils',
          '@client': './lib/client',
          '@styled': './styled',
          '@lib': './lib',
        },
      },
    },
  },
};
