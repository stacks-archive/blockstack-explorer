const redis = require('../lib/redis');

redis.flushdb((err, success) => {
  if (err) console.error(err);
  console.log('Cleared cache. Success:', success);
  process.exit();
});
