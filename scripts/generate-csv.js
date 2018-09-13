const fs = require('fs-extra');
const papaparse = require('papaparse');
const moment = require('moment-timezone');

const { blockToTime } = require('../lib/addresses');

const run = async () => {
  let accounts = await fs.readJson('./data/genesis.json');
  accounts = accounts.map((account) => {
    const date = moment(blockToTime(account.lock_send)).utc(false);
    return {
      lock_send_datetime: date.format('MM/DD/YYYY hh:mm a z'),
      lock_send_date: date.format('MM/DD/YYYY'),
      ...account,
    };
  });
  const csv = papaparse.unparse(accounts);
  await fs.writeFile('./data/genesis.csv', csv);
};

run();
