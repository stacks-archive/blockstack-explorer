const fs = require('fs-extra');
const moment = require('moment');

// the start of the blockchain (TBD)
const startBlock = 538161;
const start = moment('2018/8/23 21:16:55 +0000', 'YYYY-MM-DD HH:mm:ss ZZ');

const blockToTime = (block) => {
  // 10 minutes per block
  const blocksSinceTimestamp = block - startBlock;
  const minutes = blocksSinceTimestamp * 10;
  const time = moment(start).add(minutes, 'minutes');
  return time.valueOf();
};

const getAccounts = async () => {
  const accounts = await fs.readJson('./data/fake-genesis-block.json');

  const addresses = {};
  accounts.forEach((account) => {
    const { address } = account;
    if (address.length !== -1) {
      const cumulativeVestedAtBlocks = {};
      let cumulativeVested = 0;
      Object.keys(account.vesting).forEach((block) => {
        const date = blockToTime(block);
        cumulativeVested += account.vesting[block];
        cumulativeVestedAtBlocks[date] = cumulativeVested;
      });
      addresses[address] = {
        ...account,
        cumulativeVestedAtBlocks,
      };
    }
  });

  return {
    accountsByAddress: addresses,
    accounts,
  };
};

const getTotals = ({ accounts }) => {
  const totals = {
    initalValue: 0,
    vestedValues: 0,
    vestedAtBlocks: {},
    addressCount: accounts.length,
    cumulativeVestedAtBlocks: {},
  };

  let cumulativeVested = 0;

  accounts.forEach((account) => {
    totals.initalValue += account.value;
    totals.vestedValues += account.vesting_total;
    Object.keys(account.vesting).forEach((block) => {
      const date = blockToTime(block);
      totals.vestedAtBlocks[date] = totals.vestedAtBlocks[date] || 0;
      totals.vestedAtBlocks[date] += account.vesting[block];
    });
  });

  Object.keys(totals.vestedAtBlocks).forEach((block) => {
    const amount = totals.vestedAtBlocks[block];
    cumulativeVested += amount;
    totals.cumulativeVestedAtBlocks[block] = cumulativeVested;
  });

  return totals;
};

module.exports = {
  getAccounts,
  getTotals,
};
