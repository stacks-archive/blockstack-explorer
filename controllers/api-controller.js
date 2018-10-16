const express = require('express');
const { decorateApp } = require('@awaitjs/express');
// const passport = require('passport');

const { getTotals } = require('../lib/addresses');
const NameOpsAggregator = require('../lib/aggregators/name-ops');

const makeAPIController = (Genesis) => {
  const APIController = decorateApp(express.Router());
  const totals = getTotals(Genesis);

  // APIController.use(passport.authenticate('local', { failureRedirect: '/login' }));

  APIController.get('/accounts/global', (req, res) => {
    res.json(totals);
  });

  APIController.get('/accounts/:address', (req, res) => {
    const account = Genesis.accountsByAddress[req.params.address];

    if (account) {
      res.json(account);
    } else {
      res.status(404).send('Missing Account');
    }
  });

  APIController.getAsync('/name-operations', async (req, res) => {
    const nameOperations = await NameOpsAggregator.get();
    res.json({
      nameOperations,
    })
  })

  return APIController;
};

module.exports = makeAPIController;
