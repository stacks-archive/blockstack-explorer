const express = require('express');

const { getTotals } = require('../lib/addresses');

const makeAPIController = (accounts) => {
  const APIController = express.Router();
  const totals = getTotals(accounts);

  APIController.get('/accounts/global', (req, res) => {
    res.json(totals);
  });

  APIController.get('/accounts/:address', (req, res) => {
    const account = accounts[req.params.address];

    res.json(account);
  });

  return APIController;
};

module.exports = makeAPIController;
