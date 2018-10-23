const express = require('express');
const { decorateApp } = require('@awaitjs/express');
const { getTotals } = require('../lib/addresses');
const NameOpsAggregator = require('../lib/aggregators/name-ops');
const { fetchName, fetchTX } = require('../lib/client/core-api');

const makeAPIController = (Genesis) => {
  const APIController = decorateApp(express.Router());
  const totals = getTotals(Genesis);

  APIController.getAsync('/accounts/global', async (req, res) => res.json(totals));

  APIController.getAsync('/accounts/:address', async (req, res) => {
    const account = Genesis.accountsByAddress[req.params.address];

    if (account) {
      await res.json(account);
    } else {
      res.status(404).send('Missing Account');
    }
  });

  APIController.getAsync('/name-operations', async (req, res) => {
    const nameOperations = await NameOpsAggregator.get();
    await res.json({
      nameOperations,
    });
  });

  APIController.getAsync('/names/:name', async (req, res) => {
    const name = await fetchName(req.params.name);
    res.json(name);
  })

  APIController.getAsync('/transactions/:tx', async (req, res) => {
    const txInfo = await fetchTX(req.params.tx);
    res.json(txInfo);
  })

  return APIController;
};

module.exports = makeAPIController;
