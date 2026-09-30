const Waline = require('@waline/vercel');
const serverless = require('serverless-http');

const app = Waline({
  env: 'netlify',
});

module.exports.handler = serverless(app, {
  basePath: '/.netlify/functions/comment',
});
