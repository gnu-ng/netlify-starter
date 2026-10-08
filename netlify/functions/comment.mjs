import http from 'node:http';
import Waline from '@waline/vercel';
import serverless from 'serverless-http';
import { withLambda } from '@netlify/aws-lambda-compat';

const app = Waline({
  env: 'netlify',
});

const lambdaHandler = serverless(http.createServer(app), {
  basePath: '/.netlify/functions/comment',
});

export default withLambda(lambdaHandler);
