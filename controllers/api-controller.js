const express = require('express');
const { decorateApp } = require('@awaitjs/express');
const { getTotals } = require('../lib/addresses');
const NameOpsAggregator = require('../lib/aggregators/name-ops');
const { fetchName, fetchTX, fetchAddress } = require('../lib/client/core-api');

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
  });

  APIController.getAsync('/transactions/:tx', async (req, res) => {
    const txInfo = await fetchTX(req.params.tx);
    res.json(txInfo);
  });

  APIController.getAsync('/addresses/:address', async (req, res) => {
    const { address } = req.params;
    const data = await fetchAddress(address);
    res.json(data);
  });

  APIController.getAsync('/search/:query', async (req, res) => {
    const { query } = req.params;
    const fetches = [fetchTX(query), fetchAddress(query)];

    const [tx, btcAddress] = await Promise.all(fetches);

    console.log(tx);
    console.log(btcAddress);

    if (tx) {
      return res.json({
        pathname: '/transaction',
        as: `/tx/${query}`,
        id: query,
        data: tx,
      });
    }
    if (btcAddress) {
      return res.json({
        pathname: '/address/single',
        as: `/address/${query}`,
        id: query,
        data: btcAddress,
      });
    }

    return res.json({
      success: false,
    });
  });

  return APIController;
};

module.exports = makeAPIController;
