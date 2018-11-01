const express = require('express');

const dev = process.env.NODE_ENV !== 'production';

/*
 * NB: make sure to modify this to take into account anything that should trigger
 * an immediate page change (e.g a locale stored in req.session)
 */
function getCacheKey(req) {
  return `${req.url}`;
}

const makeAppController = (app, cache) => {
  const renderAndCache = async (req, res, pagePath) => {
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
  };

  const AppController = express.Router();

  /**
   * Routes
   */

  // Home
  AppController.get('/', async (req, res) => {
    await renderAndCache(req, res, '/');
  });
  // Names
  AppController.get('/names', async (req, res) => {
    await renderAndCache(req, res, '/names');
  });
  // Names: single
  AppController.get('/name/:name', async (req, res) => {
    await renderAndCache(req, res, '/names/single');
  });
  // Address: Single
  AppController.get('/address/:address', async (req, res) => {
    await renderAndCache(req, res, '/address/single');
  });
  AppController.get('/app/address/:address', (req, res) => {
    res.redirect(`/address/stacks/${req.params.address}`);
  });
  // Stacks address: Single
  AppController.get('/address/stacks/:address', async (req, res) => {
    await renderAndCache(req, res, '/address/stacks');
  });
  // Blocks
  AppController.get('/blocks', async (req, res) => {
    await renderAndCache(req, res, '/blocks');
  });
  // Blocks: single
  AppController.get('/nameops/:hash', async (req, res) => {
    await renderAndCache(req, res, '/blocks/single');
  });
  AppController.get('/block/:hash', async (req, res) => {
    await renderAndCache(req, res, '/blocks/single');
  });
  // Transaction: single
  AppController.get('/tx/:tx', async (req, res) => {
    await renderAndCache(req, res, '/transaction/single');
  });

  return AppController;
};

module.exports = makeAppController;
