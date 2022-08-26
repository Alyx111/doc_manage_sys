const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    // port:8080,
    // 可设置多个代理
    proxy: { // 目的是解决跨域，若测试环境不需要跨域，则不需要进行该配置
      '/api': {
        target: 'http://10.151.110.92:9400', // 目标 API 地址
        ws: true, // 如果要代理 websockets
        changeOrigin: true, // 将主机标头的原点更改为目标URL
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
})
