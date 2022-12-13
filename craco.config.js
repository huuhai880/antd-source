const path = require('path')

module.exports = {
  reactScriptsVersion: 'react-scripts',
  style: {
    sass: {
      loaderOptions: {
        sassOptions: {
          //includePaths: ['node_modules', 'src/assets']
        }
      }
    }
  },
  webpack: {
    alias: {
      '@src': path.resolve(__dirname, 'src'),
      '@hooks': path.resolve(__dirname, 'src/utils/hooks'),
      '@store': path.resolve(__dirname, 'src/redux'),
      '@configs': path.resolve(__dirname, 'src/configs')
    }
  }
}
