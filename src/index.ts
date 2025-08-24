import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { prettyJSON } from 'hono/pretty-json'
import { secureHeaders } from 'hono/secure-headers'
import { compress } from 'hono/compress'
import type { Server } from 'http';
const app = new Hono()
app.use(cors(), prettyJSON(), secureHeaders(), compress())

import appConfig from './config/appConfig.ts'

app.get('/', (c) => {
  // const env1 = env(c)
  // console.log(env1)
  return c.text('Hello Hono!')
})

const server = serve({
  fetch: app.fetch,
  port: appConfig.PORT,
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`);
});

(server as any).keepAliveTimeout = 65000;
(server as any).headersTimeout = 66000;

const httpServer = server as Server;

httpServer.keepAliveTimeout = 60 * 1000; 
httpServer.headersTimeout = 65 * 1000;

process.on('SIGINT', () => {
  server.close(() => {
    console.log('Server is closed.');
    process.exit(0);
  });
});