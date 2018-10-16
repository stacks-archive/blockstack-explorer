const fetch = require('cross-fetch');
const flatten = require('lodash/flatten');
const moment = require('moment');

moment.updateLocale('en', {
  relativeTime: {
    future: 'in %s',
    past: '%s ago',
    s: 'seconds',
    ss: '%ss',
    m: 'a minute',
    mm: '%dm',
    h: 'an hour',
    hh: '%dh',
    d: 'a day',
    dd: '%dd',
    M: 'a month',
    MM: '%dM',
    y: 'a year',
    yy: '%dY'
  }
});

const coreApi = 'https://core.blockstack.org';
const explorerApi = 'https://explorer.blockstack.org';

const fetchJSON = async (url) => {
  const response = await fetch(url);
  if (response.status !== 200) {
    return null;
  }
  const data = await response.json();
  return data;
}

const fetchName = async (name) => {
  const url = `${coreApi}/v2/users/${name}`;
  const data = await fetchJSON(url);
  return data ? data[name] : data;
};

const fetchAddress = (address) => {
  const url = `${coreApi}/v1/addresses/bitcoin/${address}`;
  return fetchJSON(url);
}

const fetchTX = (tx) => {
  const url = `${explorerApi}/insight-api/tx/${tx}`;
  return fetchJSON(url);
}

const fetchBlocks = async (params = '') => {
  const url = `${explorerApi}/insight-api/blocks${params}`;
  const data = await fetchJSON(url);
  return data ? data.blocks : data;
}

const fetchNameOperations = (blockHeight) => {
  const url = `${coreApi}/v1/blockchains/bitcoin/operations/${blockHeight}`;
  return fetchJSON(url);
}

const fetchNameOps = async () => {
  // const daysBack = new Array(8);
  const daysBack = Array.apply(null, new Array(8)).map((val, i) => i);
  const dates = daysBack.map((x, index) => {
    return moment().utc().subtract(index, 'days').format('YYYY-MM-DD');
  })
  const getBlocks = dates.map((date) => {
    return new Promise(async (resolve, reject) => {
      const blocks = await fetchBlocks(`?blockDate=${date}`);
      resolve(blocks);
    })
  });
  const blocks = flatten(await Promise.all(getBlocks));
  // console.log('total blocks', blocks.length)
  const getOps = blocks.map((block) => {
    return new Promise(async (resolve, reject) => {
      const { time } = block;
      const nameOps = (await fetchNameOperations(block.height)).filter((op) => {
        return op.opcode === 'NAME_REGISTRATION';
      });
      nameOps.forEach((op, index) => {
        nameOps[index].timeAgo = moment(time * 1000).fromNow(true);
        nameOps[index].time = time * 1000;
      });
      resolve(nameOps);
    })
  })
  const nameOps = flatten(await Promise.all(getOps));
  return nameOps;
}

module.exports = {
  fetchName,
  fetchAddress,
  fetchTX,
  fetchBlocks,
  fetchNameOperations,
  fetchNameOps,
}