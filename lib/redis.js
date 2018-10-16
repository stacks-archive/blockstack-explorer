const redis = require('redis');
const { promisify } = require('util');

const url = process.env.REDIS_URL || 'redis://127.0.0.1:6379'
const client = redis.createClient(url, {
  prefix: 'blockstack-explorer',
});

client.getAsync = promisify(client.get).bind(client);
client.setAsync = promisify(client.set).bind(client);

module.exports = client;