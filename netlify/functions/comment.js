const Waline = require('@waline/vercel');
const serverless = require('serverless-http');

const app = Waline({
  env: 'netlify',
  async postSave(comment) {
    // 评论保存后可在这里做额外处理
  },
});

// 关键：去掉错误的 http.createServer，并设置 basePath
module.exports.handler = serverless(app, {
  basePath: '/.netlify/functions/comment',
});
