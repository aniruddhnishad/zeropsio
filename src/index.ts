import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { prettyJSON } from 'hono/pretty-json'
import { secureHeaders } from 'hono/secure-headers'

import appConfig from './config/appConfig.js'

const PORT: number = appConfig.PORT

const app = new Hono()
app.use(cors(), prettyJSON(), secureHeaders())

app.get('/', (c) => {
  // const env1 = env(c)
  // console.log(env1)
  return c.text('Hello Hono!')
})

const server = serve({
  fetch: app.fetch,
  port: PORT,
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`);
});

(server as any).keepAliveTimeout = 65000;
(server as any).headersTimeout = 66000;