const express = require('express');
const next = require('next');
const secure = require('express-force-https');
const morgan = require('morgan');
const { decorateApp } = require('@awaitjs/express');
const { createMiddleware: createPrometheusMiddleware } = require('@promster/express');
const { createServer } = require('@promster/server');
require('dotenv').config();

const makeAppController = require('./controllers/app-controller');

const dev = process.env.NODE_ENV !== 'production';

const port = parseInt(process.env.PORT, 10) || 3000;
const app = next({ dev });
const handle = app.getRequestHandler();

const setup = async () => {
  try {
    await app.prepare();

    const server = decorateApp(express());

    server.use(createPrometheusMiddleware({ 
      app,
      options: {
        normalizePath: (path) => {
          if (path.startsWith('/address/stacks/SP1P72Z3704VMT3DMHPP2CB8TGQWGDBHD3RPR9GZS')) {
            return '/address/stacks/SP1P72Z3704VMT3DMHPP2CB8TGQWGDBHD3RPR9GZS'
          }
          if (path.startsWith('/address/stacks')) {
            return '/address/stacks'
          }
          return '/'
        }
      }
    }));

    // Create `/metrics` endpoint on separate server
    createServer({ port: 9151 }).then(() => console.log('@promster/server started on port 9151.'));

    server.use(morgan('combined'));

    if (!dev) {
      server.use(secure);
    }

    server.set('views', './common/server-views');
    server.set('view engine', 'pug');

    server.use((req, res, _next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Headers', '*');
      _next();
    });

    server.get('/robots.txt', (req, res) => {
      res.send(`
User-agent: *
Allow: /$
Disallow: /
      `);
    });

    server.use('/', makeAppController(app));

    server.get('*', (req, res) => handle(req, res));

    server.listen(port, (err) => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

setup();
