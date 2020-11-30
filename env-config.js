require('dotenv').config();

module.exports = {
  'process.env.API_URL': process.env.API_URL || 'https://explorer-api.blockstack.org',
};
