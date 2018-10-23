const express = require('express');
const { decorateApp } = require('@awaitjs/express');
const { getTotals } = require('../lib/addresses');
const NameOpsAggregator = require('../lib/aggregators/name-ops');
const BlocksAggregator = require('../lib/aggregators/blocks');
const { fetchName, fetchTX, fetchAddress, fetchNameRecord, fetchBlock } = require('../lib/client/core-api');

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
    const { name } = req.params;
    const [person, nameRecord] = await Promise.all([fetchName(name), fetchNameRecord(name)]);
    await res.json({
      nameRecord,
      ...person,
    });
  });

  APIController.getAsync('/transactions/:tx', async (req, res) => {
    const txInfo = await fetchTX(req.params.tx);
    await res.json(txInfo);
  });

  APIController.getAsync('/addresses/:address', async (req, res) => {
    const { address } = req.params;
    const data = await fetchAddress(address);
    await res.json(data);
  });

  APIController.getAsync('/blocks', async (req, res) => {
    const { date } = req.query;
    const blocks = await BlocksAggregator.fetch(date);
    await res.json(blocks);
  });

  APIController.getAsync('/blocks/:hash', async (req, res) => {
    const { hash } = req.params;
    const block = await fetchBlock(hash);
    await res.json(block);
  });

  APIController.getAsync('/search/:query', async (req, res) => {
    const { query } = req.params;
    const fetches = [fetchTX(query), fetchAddress(query), fetchBlock(query)];

    const [tx, btcAddress, block] = await Promise.all(fetches);

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
    if (block) {
      return res.json({
        pathname: '/blocks/single',
        as: `/blocks/${block.hash}`,
        data: block,
        hash: query,
      });
    }

    return res.json({
      success: false,
    });
  });

  return APIController;
};

module.exports = makeAPIController;
