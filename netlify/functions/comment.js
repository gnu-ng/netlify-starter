const Waline = require('@waline/vercel');
const serverless = require('serverless-http');

const app = Waline({
  env: 'netlify',
});

const serverlessHandler = serverless(app);

module.exports.handler = async (event, context) => {
  // 把 Netlify 的函数前缀去掉，让 Waline 能匹配到 /ui、/api 等路由
  const prefix = '/.netlify/functions/comment';

  if (typeof event.path === 'string' && event.path.startsWith(prefix)) {
    event.path = event.path.slice(prefix.length) || '/';
  }
  if (typeof event.rawPath === 'string' && event.rawPath.startsWith(prefix)) {
    event.rawPath = event.rawPath.slice(prefix.length) || '/';
  }
  if (event.requestContext && event.requestContext.http && typeof event.requestContext.http.path === 'string') {
    const p = event.requestContext.http.path;
    if (p.startsWith(prefix)) {
      event.requestContext.http.path = p.slice(prefix.length) || '/';
    }
  }

  return serverlessHandler(event, context);
};
