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

  AppController.get('/', async (req, res) => {
    await renderAndCache(req, res, '/');
  });

  AppController.get('/global', async (req, res) => {
    track('view_global', req);
    await renderAndCache(req, res, '/global');
  });

  AppController.get('/names', async (req, res) => {
    track('view_names', req);
    await renderAndCache(req, res, '/names');
  });

  AppController.get('/names/:name', async (req, res) => {
    track('view_names', req, { name: req.params.name });
    await renderAndCache(req, res, '/names');
  });

  AppController.get('/address/:address', async (req, res) => {
    track('view_address', req, { address: req.params.address });
    await renderAndCache(req, res, '/address');
  });

  AppController.get('/blocks', async (req, res) => {
    track('view_blocks', req);
    await renderAndCache(req, res, '/blocks');
  });

  AppController.get('/blocks/:block', async (req, res) => {
    track('view_blocks', req, { block: req.params.block });
    await renderAndCache(req, res, '/blocks');
  });

  return AppController;
};

module.exports = makeAppController;
