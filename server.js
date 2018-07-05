const express = require('express');
const next = require('next');
const LRUCache = require('lru-cache');

const dev = process.env.NODE_ENV !== 'production';

// const { getApps } = require('./common/lib/api');
// const RSSController = require('./common/controllers/rss-controller');

const port = parseInt(process.env.PORT, 10) || 3000;
const app = next({ dev });
const handle = app.getRequestHandler();

// This is where we cache our rendered HTML pages
const ssrCache = new LRUCache({
  max: 10,
  maxAge: dev ? 1000 * 30 : 1000 * 60 * 60, // 1hour
});

/*
 * NB: make sure to modify this to take into account anything that should trigger
 * an immediate page change (e.g a locale stored in req.session)
 */
function getCacheKey(req) {
  return `${req.url}`;
}

async function renderAndCache(req, res, pagePath) {
  const key = getCacheKey(req);

  // If we have a page in the cache, let's serve it
  if (ssrCache.has(key) && !dev) {
    res.setHeader('x-cache', 'HIT');
    console.log('cache hit');
    res.send(ssrCache.get(key));
    return;
  }

  try {
    // const data = await getApps(apiServer);
    // data.apiServer = apiServer;
    const data = {};

    // If not let's render the page into HTML
    const html = await app.renderToHTML(req, res, pagePath, data);

    // Something is wrong with the request, let's skip the cache
    if (res.statusCode !== 200) {
      res.send(html);
      return;
    }

    // Let's cache this page
    ssrCache.set(key, html);

    res.setHeader('x-cache', 'MISS');
    console.log('cache miss');
    res.send(html);
  } catch (err) {
    app.renderError(err, req, res, pagePath);
  }
}

app.prepare().then(() => {
  const server = express();

  server.set('views', './common/server-views');
  server.set('view engine', 'pug');

  server.use((req, res, _next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    _next();
  });

  // Use the `renderAndCache` utility defined below to serve pages
  server.get('/', (req, res) => {
    renderAndCache(req, res, '/');
  });

  server.get('/address/:address', (req, res) => {
    renderAndCache(req, res, '/address');
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

  // server.use('/rss', RSSController);

  server.get('*', (req, res) => handle(req, res));

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
