const crypto = require('crypto');

const randomAddress = () => crypto.randomBytes(20).toString('hex');

const rows = [];
const count = 10;

for (let index = 0; index < count; index++) {
  const total = Math.round(Math.random() * 50000);
  const vestingTotal = Math.round(Math.random() * 100000);
  let vestedCount = vestingTotal;
  const vestingPeriods = 24;
  const vesting = {};
  for (let period = 1; period < vestingPeriods; period++) {
    const periodAmount = vestingTotal / vestingPeriods;
    vestedCount -= periodAmount;
    vesting[period * 4320] = periodAmount;
  }

  vesting[vestingPeriods * 4320] = vestedCount;

  rows.push({
    address: randomAddress(),
    type: 'STACKS',
    value: total,
    vesting,
    vesting_total: vestingTotal,
  });
}

module.exports = {
  history: [],
  rows,
};
