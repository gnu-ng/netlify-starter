const Waline = require('@waline/vercel');
const serverless = require('serverless-http');

const app = Waline({
  env: 'netlify',
});

// 关键 basePath，让子路径能正确匹配
module.exports.handler = serverless(app, {
  basePath: '/.netlify/functions/comment',
});
