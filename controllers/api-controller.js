const express = require('express');
const passport = require('passport');

const { getTotals } = require('../lib/addresses');

const makeAPIController = (Genesis) => {
  const APIController = express.Router();
  const totals = getTotals(Genesis);

  APIController.use(passport.authenticate('local', { failureRedirect: '/login' }));

  APIController.get('/accounts/global', (req, res) => {
    res.json(totals);
  });

  APIController.get('/accounts/:address', (req, res) => {
    const account = Genesis.accountsByAddress[req.params.address];

    res.json(account);
  });

  return APIController;
};

module.exports = makeAPIController;
