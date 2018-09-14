const express = require('express');
const { track } = require('../lib/analytics');

const dev = process.env.NODE_ENV !== 'production';

/*
 * NB: make sure to modify this to take into account anything that should trigger
 * an immediate page change (e.g a locale stored in req.session)
 */
function getCacheKey(req) {
  return `${req.url}`;
}

const makeAppController = (app, cache) => {
  async function renderAndCache(req, res, pagePath) {
    const key = getCacheKey(req);

    // If we have a page in the cache, let's serve it
    if (cache.has(key) && !dev) {
      res.setHeader('x-cache', 'HIT');
      console.log(`cache hit: ${req.url}`);
      res.send(cache.get(key));
      return;
    }

    try {
      const html = await app.renderToHTML(req, res, pagePath, {});
      if (res.statusCode !== 200) {
        res.send(html);
        return;
      }

      cache.set(key, html);

      res.setHeader('x-cache', 'MISS');
      console.log(`cache miss: ${req.url}`);
      res.send(html);
    } catch (err) {
      app.renderError(err, req, res, pagePath);
    }
  }

  const AppController = express.Router();

  // function ensureAuthenticated(req, res, next) {
  //   if (req.isAuthenticated()) {
  //     return next();
  //   }
  //   return res.redirect('/login');
  // }

  // AppController.use(ensureAuthenticated);

  // Use the `renderAndCache` utility defined below to serve pages
  AppController.get('/', (req, res) => {
    renderAndCache(req, res, '/');
  });

  AppController.get('/global', async (req, res) => {
    track('view_global', req);
    renderAndCache(req, res, '/global');
  });

  AppController.get('/address/:address', (req, res) => {
    track('view_address', req, { address: req.params.address });
    renderAndCache(req, res, '/address');
  });

  return AppController;
};

module.exports = makeAppController;
