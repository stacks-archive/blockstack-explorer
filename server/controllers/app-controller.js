const express = require('express');

const makeAppController = (app) => {
  const renderAndCache = async (req, res, pagePath) => {
    try {
      const html = await app.renderToHTML(req, res, pagePath, {});
      app.sendHTML(req, res, html, req.method);
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

  AppController.get('/transactions', async (req, res) => {
    await renderAndCache(req, res, '/transaction/list');
  });

  AppController.get('/verifier', async (req, res) => {
    await renderAndCache(req, res, '/verifier');
  });

  return AppController;
};

module.exports = makeAppController;
