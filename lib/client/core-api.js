const fetch = require('cross-fetch');
const flatten = require('lodash/flatten');
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

const fetchName = async (name) => {
  const url = `${coreApi}/v2/users/${name}`;
  const data = await fetchJSON(url);
  return data ? data[name] : data;
};

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

const fetchTX = (tx) => {
  const url = `${explorerApi}/insight-api/tx/${tx}`;
  console.log(url);
  return fetchJSON(url);
};

const fetchBlocks = async (params = '') => {
  const url = `${explorerApi}/insight-api/blocks${params}`;
  const data = await fetchJSON(url);
  return data ? data.blocks : data;
};

const fetchNameOperations = (blockHeight) => {
  const url = `${coreApi}/v1/blockchains/bitcoin/operations/${blockHeight}`;
  return fetchJSON(url);
};

const fetchNameRecord = async (name) => {
  const data = await fetchJSON(`${coreApi}/v1/names/${name}/history`);
  const nameops = Object.values(data).map((op) => op[0]).reverse();
  const nameRecord = {
    history: nameops,
    ...nameops[0]
  }

  return nameRecord;
}

const fetchNameOps = async () => {
  // const daysBack = new Array(8);
  const daysBack = Array(...new Array(8)).map((val, i) => i);
  const dates = daysBack.map((x, index) =>
    moment()
      .utc()
      .subtract(index, 'days')
      .format('YYYY-MM-DD'),
  );
  const getBlocks = dates.map(
    (date) =>
      new Promise(async (resolve, reject) => {
        const blocks = await fetchBlocks(`?blockDate=${date}`);
        resolve(blocks);
      }),
  );
  const blocks = flatten(await Promise.all(getBlocks));
  // console.log('total blocks', blocks.length)
  const getOps = blocks.map(
    (block) =>
      new Promise(async (resolve, reject) => {
        const { time } = block;
        try {
          const nameOps = (await fetchNameOperations(block.height)).filter((op) => op.opcode === 'NAME_REGISTRATION');
          nameOps.forEach((op, index) => {
            nameOps[index].timeAgo = moment(time * 1000).fromNow(true);
            nameOps[index].time = time * 1000;
          });
          resolve(nameOps);
        } catch (error) {
          resolve([]);
        }
      }),
  );
  return flatten(await Promise.all(getOps));
};

module.exports = {
  fetchName,
  fetchAddress,
  fetchTX,
  fetchBlocks,
  fetchNameOperations,
  fetchNameOps,
  fetchNameRecord,
};
