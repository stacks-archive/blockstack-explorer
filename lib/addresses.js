const fs = require('fs-extra');

const getAccounts = async () => {
  const addressList = await fs.readJson('./data/fake-genesis-block.json');

  const addresses = {};
  addressList.forEach((account) => {
    const { address } = account;
    if (address.length !== -1) {
      addresses[address] = account;
    }
  });

  return addresses;
};

const getTotals = (accounts) => {
  const addresses = Object.keys(accounts);
  const totals = {
    initalValue: 0,
    vestedValues: 0,
    vestedAtBlocks: {},
    addressCount: addresses.length,
    cumulativeVestedAtBlocks: {},
  };

  let cumulativeVested = 0;

  addresses.forEach((address) => {
    const account = accounts[address];
    totals.initalValue += account.value;
    totals.vestedValues += account.vesting_total;
    Object.keys(account.vesting).forEach((block) => {
      totals.vestedAtBlocks[block] = totals.vestedAtBlocks[block] || 0;
      totals.vestedAtBlocks[block] += account.vesting[block];
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
