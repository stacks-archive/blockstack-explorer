const NameOpsAggregator = require('../lib/aggregators/name-ops');

const run = async () => {
  await NameOpsAggregator.set();
};

run()
  .catch((e) => {
    console.error(e);
    process.exit();
  })
  .then(() => {
    console.log('Done!');
    process.exit();
  });
