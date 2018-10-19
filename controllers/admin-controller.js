const express = require('express');

const { makeVisitsCSV, makeUnvisitedCSV } = require('../lib/data');

const makeAdminController = (app) => {
  const AdminController = express.Router();

  function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    return res.redirect('/login');
  }

  AdminController.use(ensureAuthenticated);

  AdminController.get('/traffic', async (req, res) => {
    console.log('traffic data');
    const html = await app.renderToHTML(req, res, '/admin/traffic', {});
    res.send(html);
  });

  AdminController.get('/data/visits', async (req, res) => {
    console.log('making visits');
    const visits = await makeVisitsCSV();
    res.setHeader('Content-disposition', 'attachment; filename=visits.csv');
    res.set('Content-Type', 'text/csv');
    res.status(200).send(visits);
  });

  AdminController.get('/data/unvisited', async (req, res) => {
    const unvisited = await makeUnvisitedCSV();
    res.setHeader('Content-disposition', 'attachment; filename=unvisited.csv');
    res.set('Content-Type', 'text/csv');
    res.status(200).send(unvisited);
  });

  return AdminController;
};

module.exports = makeAdminController;
