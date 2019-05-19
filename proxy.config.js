const proxy = [
  {
    context: '/api',
    target: 'http://localhost:9000',
    pathRewrite: { '^/api': '' }
  }
];
module.exports = proxy;