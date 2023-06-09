const { createProxyMiddleware } = require('http-proxy-middleware')
module.exports = function (app) {
  app.use(
    createProxyMiddleware('/api', {
      target: 'http://172.16.0.10:19217',
      changeOrigin: true,
      pathRewrite: { '^/api': '' }
    })
  )
}