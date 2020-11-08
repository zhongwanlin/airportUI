const autoprefixer = require('autoprefixer');
module.exports = {
  devServer: {
    overlay: {
      warnings: false,
      errors: false
    }
  },
  lintOnSave: false,
  outputDir: './dist',
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/', // 测试和本地环境
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          autoprefixer()
        ]
      }
    }
  }
};
