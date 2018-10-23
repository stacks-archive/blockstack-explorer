const redis = require('../redis');

class Aggregator {
  static key() {
    return this.name;
  }

  static async set(...args) {
    const key = this.key(...args);
    const value = await this.setter(...args);
    await redis.setAsync(key, JSON.stringify(value));
    return value;
  }

  static async get(...args) {
    const value = await redis.getAsync(this.key(...args));
    if (value) {
      return JSON.parse(value);
    }
    return null;
  }

  static async fetch(...args) {
    const key = this.key(...args);
    console.log(`Running aggregator: "${key}"`);
    const value = await this.get(...args);
    if (value) {
      console.log(`Found cached value for "${key}"`);
      return value;
    }
    console.log(`Cached value not found for "${key}". Fetching data.`);
    return this.set(...args);
  }
}

module.exports = Aggregator;
