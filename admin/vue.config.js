const autoprefixer = require('autoprefixer');
module.exports = {
  devServer: {
    overlay: {
      warnings: false,
      errors: false
    }
  },
  lintOnSave: false,
  outputDir: './web',
  publicPath: process.env.NODE_ENV === 'production' ? '/lostFound/web/' : '/', // 测试和本地环境
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
