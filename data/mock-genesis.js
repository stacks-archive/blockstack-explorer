const crypto = require("crypto");

const randomAddress = () => {
  return crypto.randomBytes(20).toString('hex');
}

const rows = [];
const count = 10;

for (let index = 0; index < count; index++) {
  const total = Math.round((Math.random() * 1000))
  const vestingTotal = Math.round((Math.random() * 1000));
  let vestedCount = vestingTotal;
  const vestingPeriods = Math.round((Math.random() * 12));
  const vesting = {};
  for (let period = 1; period < vestingPeriods; period++) {
    const periodAmount = Math.round((Math.random() * vestedCount));
    vestedCount -= periodAmount;
    vesting[period * 25] = periodAmount;
  }

  vesting[(vestingPeriods) * 25] = vestedCount;

  rows.push({
    address: randomAddress(),
    type: 'STACKS',
    value: total,
    vesting: vesting,
    vesting_total: vestingTotal,
  });
}

module.exports = {
  history: [

  ],
  rows: rows,
}