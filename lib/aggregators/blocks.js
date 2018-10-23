const moment = require('moment');
const Aggregator = require('./aggregator');
const { fetchBlocks, fetchNameOperations } = require('../client/core-api');

class BlocksAggregator extends Aggregator {
  static key(date) {
    if (!date) {
      const now = moment()
        .utc()
        .format('YYYY-MM-DD');
      return `Blocks:${now}`;
    }
    return `Blocks:${date}`;
  }

  static async setter(date) {
    const query = date ? `?blockDate=${date}` : '';
    const blocks = await fetchBlocks(query);
    const nameOpsPromises = blocks.map(
      (block) =>
        new Promise(async (resolve) => {
          const { time } = block;
          block.nameOps = [];
          try {
            const nameOps = await fetchNameOperations(block.height);
            nameOps.forEach((op, index) => {
              nameOps[index].timeAgo = moment(time * 1000).fromNow(true);
              nameOps[index].time = time * 1000;
            });
            block.nameOps = nameOps;
            resolve(block);
          } catch (error) {
            resolve(block);
          }
        }),
    );
    return Promise.all(nameOpsPromises);
  }
}

module.exports = BlocksAggregator;
