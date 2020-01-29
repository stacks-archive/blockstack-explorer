const express = require('express');
const { handleSearchQuery } = require('./search-router');

/**
 * @param {import('next/dist/next-server/server/next-server').default} app - next.js server
 */
const makeAppController = (app) => {
  const renderAndCache = async (req, res, pagePath) => {
    try {
      await app.render(req, res, pagePath, req.params);
    } catch (err) {
      app.renderError(err, req, res, pagePath);
    }
  };

  const AppController = express.Router();

  /**
   * Routes
   */

  // Search query
  // Note: express cannot statically route based on query strings so middleware must be used.
  AppController.use(async (req, res, next) => {
    if (req.query.search) {
      await handleSearchQuery(app, req, res);
    } else {
      next();
    }
  });

  // Home
  AppController.get('/', async (req, res) => {
    await renderAndCache(req, res, '/');
  });
  // Search
  AppController.get('/search/:search', async (req, res) => {
    await renderAndCache(req, res, '/search');
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
  AppController.get('/block/:id', async (req, res) => {
    await renderAndCache(req, res, '/blocks/single');
  });
  // Transaction: single
  AppController.get('/tx/:tx', async (req, res) => {
    await renderAndCache(req, res, '/transaction/single');
  });

  AppController.get('/transactions', async (req, res) => {
    await renderAndCache(req, res, '/transaction/list');
  });

  AppController.get('/verifier', async (req, res) => {
    await renderAndCache(req, res, '/verifier');
  });

  return AppController;
};

module.exports = makeAppController;
