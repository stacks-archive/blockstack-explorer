const NameOpsAggregator = require('../lib/aggregators/name-ops');

const run = async () => {
  await NameOpsAggregator.set();
}

run().catch((e) => {
  console.error(e);
}).finally(() => {
  console.log('Done!');
  process.exit();
})