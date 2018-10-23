const moment = require('moment');
const flatten = require('lodash/flatten');

const Aggregator = require('./aggregator');
const BlocksAggregator = require('./blocks');

class NameOpsAggregator extends Aggregator {
  static async setter() {
    const daysBack = Array(...new Array(8)).map((val, i) => i);
    const dates = daysBack.map((x, index) =>
      moment()
        .utc()
        .subtract(index, 'days')
        .format('YYYY-MM-DD'),
    );
    const getBlocks = dates.map((date) => BlocksAggregator.set(date));
    const blocks = await Promise.all(getBlocks);

    const nameOperations = blocks.map(({ nameOps }) => nameOps.filter((op) => op.opcode === 'NAME_REGISTRATION'));

    return flatten(nameOperations);
  }
}

module.exports = NameOpsAggregator;
