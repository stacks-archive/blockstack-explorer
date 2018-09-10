const fs = require('fs-extra');
const papaparse = require('papaparse');
const moment = require('moment');

const { blockToTime } = require('../lib/addresses');

const run = async () => {
  let accounts = await fs.readJson('./data/genesis.json');
  accounts = accounts.map((account) => ({
    lock_send_date: moment(blockToTime(account.lock_send)).format(),
    ...account,
  }));
  const csv = papaparse.unparse(accounts);
  await fs.writeFile('./data/genesis.csv', csv);
};

run();
