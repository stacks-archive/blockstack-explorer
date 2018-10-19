const Aggregator = require('./aggregator');
const { fetchNameOps } = require('../client/core-api');

class NameOpsAggregator extends Aggregator {
  static setter() {
    return fetchNameOps();
  }
}

module.exports = NameOpsAggregator;
