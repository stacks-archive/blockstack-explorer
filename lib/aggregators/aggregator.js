const redis = require('../redis');

class Aggregator {
  static key() {
    return this.name;
  }

  static async set() {
    const key = this.key();
    const value = await this.setter();
    return redis.setAsync(key, JSON.stringify(value));
  }

  static async get() {
    const value = await redis.getAsync(this.key());
    return JSON.parse(value);
  }
}

module.exports = Aggregator;
