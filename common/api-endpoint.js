/**
 * Prepend api calls with the API_URL or fallback
 * @param {string} path - the path you want to append to the api url
 */
module.exports.makeUrl = (path) => {
  const url = process.env.API_URL || 'https://explorer-api.staging.blockstack.xyz';
  return url + path;
};
