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
      '@src': path.resolve(__dirname, 'src')
    }
  }
}
