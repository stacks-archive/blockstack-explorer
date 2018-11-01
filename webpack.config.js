const path = require('path');

module.exports = {
  resolve: {
    alias: {
      'styled-components': path.resolve(__dirname, 'node_modules', 'styled-components'),
      '@components': path.resolve(__dirname, 'components'),
      '@containers': path.resolve(__dirname, 'containers'),
      '@common': path.resolve(__dirname, 'common'),
      '@pages': path.resolve(__dirname, 'pages'),
      '@utils': path.resolve(__dirname, 'utils'),
      '@stores': path.resolve(__dirname, 'stores'),
      '@styled': path.resolve(__dirname, 'styled'),
      '@client': path.resolve(__dirname, 'lib', 'client'),
      '@lib': path.resolve(__dirname, 'lib'),
    },
  },
};
