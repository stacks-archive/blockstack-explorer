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

module.exports = {
  getAccounts,
};
