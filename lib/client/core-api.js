const fetch = require('cross-fetch');
const moment = require('moment');

moment.updateLocale('en', {
  relativeTime: {
    future: 'in %s',
    past: '%s ago',
    s: '1s',
    ss: '%ss',
    m: '1m',
    mm: '%dm',
    h: '1h',
    hh: '%dh',
    d: '1d',
    dd: '%dd',
    M: '1m',
    MM: '%dM',
    y: '1Y',
    yy: '%dY',
  },
});

const coreApi = 'https://core.blockstack.org';
const explorerApi = 'https://explorer.blockstack.org';

const fetchJSON = async (url) => {
  try {
    const response = await fetch(url);
    if (response.status !== 200) {
      return null;
    }
    return response.json();
  } catch (e) {
    return console.error(e);
  }
};

/**
 * Addresses
 */
const fetchAddressCore = (address) => {
  const url = `${coreApi}/v1/addresses/bitcoin/${address}`;
  return fetchJSON(url);
};

const fetchAddressInsight = (address) => fetchJSON(`${explorerApi}/insight-api/addr/${address}`);

const fetchAddress = async (address) => {
  const [coreData, insightData] = await Promise.all([fetchAddressCore(address), fetchAddressInsight(address)]);
  return {
    ...coreData,
    ...insightData,
  };
};

/**
 * Names
 */
const fetchName = async (name) => {
  try {
    const url = `${coreApi}/v2/users/${name}`;
    const data = await fetchJSON(url);
    return data ? data[name] : data;
  } catch (e) {
    console.log(e);
    return null;
  }
};

const fetchNameOperations = (blockHeight) => {
  const url = `${coreApi}/v1/blockchains/bitcoin/operations/${blockHeight}`;
  return fetchJSON(url);
};

const fetchNameRecord = async (name) => {
  try {
    const data = await fetchJSON(`${coreApi}/v1/names/${name}/history`);
    const nameops = Object.values(data)
      .map((op) => op[0])
      .reverse();
    return {
      history: nameops,
      ...nameops[0],
    };
  } catch (e) {
    console.log(e);
    return null;
  }
};

/**
 * Blocks
 */

const fetchBlocks = async (params = '') => {
  try {
    const url = `${explorerApi}/insight-api/blocks${params}`;
    const data = await fetchJSON(url);
    return data ? data.blocks : data;
  } catch (e) {
    console.log(e);
    return null;
  }
};

const fetchBlockTXs = async (hash, pageNum = 0) => {
  try {
    const url = `${explorerApi}/insight-api/txs?block=${hash}&pageNum=${pageNum}`;
    const res = await fetchJSON(url);
    return res.txs;
  } catch (e) {
    console.log(e);
    return null;
  }
};

const fetchBlock = async (hash) => {
  try {
    const block = await fetchJSON(`${explorerApi}/insight-api/block/${hash}`);
    block.nameOperations = await fetchNameOperations(block.height);
    block.transactions = await fetchBlockTXs(hash);
    return block;
  } catch (e) {
    console.log(e);
    return null;
  }
};

/**
 * Transactions
 */
const fetchTX = (tx) => {
  const url = `${explorerApi}/insight-api/tx/${tx}`;
  return fetchJSON(url);
};
module.exports = {
  fetchName,
  fetchAddress,
  fetchTX,
  fetchBlocks,
  fetchNameOperations,
  fetchNameRecord,
  fetchBlock,
  fetchBlockTXs,
};
