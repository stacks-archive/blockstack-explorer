const express = require('express');
const next = require('next');
const LRUCache = require('lru-cache');
const secure = require('express-force-https');
const morgan = require('morgan');
const { decorateApp } = require('@awaitjs/express');
require('dotenv').config();

const makeAppController = require('./controllers/app-controller');

const dev = process.env.NODE_ENV !== 'production';

const port = parseInt(process.env.PORT, 10) || 3000;
const app = next({ dev });
const handle = app.getRequestHandler();

// This is where we cache our rendered HTML pages
const ssrCache = new LRUCache({
  max: 10,
  maxAge: dev ? 1000 * 30 : 1000 * 60 * 60, // 1hour
});

const setup = async () => {
  try {
    await app.prepare();

    const server = decorateApp(express());

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

    server.get('/clear-cache', (req, res) => {
      if (req.query.key === process.env.API_KEY) {
        console.log('Clearing cache from API');
        ssrCache.reset();
        res.json({ success: true });
      } else {
        res.status(400).json({ success: false });
      }
    });

    server.get('/robots.txt', (req, res) => {
      res.send(`
User-agent: *
Allow: /$
Disallow: /
      `);
    });

    server.use('/', makeAppController(app, ssrCache));

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
