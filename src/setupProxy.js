const { createProxyMiddleware } = require('http-proxy-middleware')
module.exports = function (app) {
  app.use(
    createProxyMiddleware('/api', {
      target: 'https://res.hopeshow.com',
      changeOrigin: true,
      pathRewrite: { '^/api': '' }
    })
  )
}