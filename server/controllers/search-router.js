const fetch = require('cross-fetch');
const serverUtil = require('../util');
const apiEndpoint = require('../../common/api-endpoint');

// TODO: all this detection logic should probably be moved to the API search endpoint.
async function resolveQuery(query) {
  // Fast test if query can only be a possible user ID.
  const blockstackID = serverUtil.isValidBlockstackName(query);
  if (blockstackID) {
    return { page: `/name/${blockstackID}` };
  }

  // Fast test if query can only be a STX address.
  const stxAddress = serverUtil.isValidStxAddress(query);
  if (stxAddress) {
    return { page: `/address/stacks/${stxAddress}` };
  }

  // Fast test if query can only be a BTC address.
  const btcAddress = serverUtil.isValidBtcAddress(query);
  if (btcAddress) {
    return { page: `/address/${btcAddress}` };
  }

  // Fast test if the query can be a value hex hash string.
  const hash = serverUtil.isValidSha256Hash(query);
  if (hash) {
    // Determine what the hash corresponds to -- currently, search allows looking
    // up a btc block, btc tx, or Stacks tx by hash.
    const searchUrl = apiEndpoint.makeUrl(`/api/v2/search/hash/${hash}`);
    const fetchResult = await fetch(searchUrl);
    const result = await fetchResult.json();
    if (!result || !result.found) {
      return { isHashSearch: true };
    }
    // TODO: [stacks-v2] support for searching many more object types by hash
    switch (result.type) {
      case 'btc_block':
        return { page: `/block/${result.hash}` };
      case 'btc_tx':
        return { page: `/tx/${result.hash}` };
      default:
        throw new Error('Unexpected result from search by hash');
    }
  }

  // TODO: [stacks-v2] support for searching Stacks blocks by height
  const blockHeight = serverUtil.isValidBtcBlockHeight(query);
  if (blockHeight) {
    const searchUrl = apiEndpoint.makeUrl(`/api/v2/search/hash-from-height/${blockHeight}`);
    const fetchResult = await fetch(searchUrl);
    const result = await fetchResult.json();
    if (!result || !result.found) {
      return null;
    }
    return { page: `/block/${result.hash}` };
  }
  return null;
}

/**
 * Take a free-form search query (from the navigation),
 * and redirect the user to the right page
 * @param {import('next-server').Server} app - next.js server
 * @param {import('express').Request} req - request
 * @param {import('express').Response} res - request
 */
async function handleSearchQuery(app, req, res) {
  try {
    const searchTerm = req.query.search;
    const result = await resolveQuery(searchTerm);
    if (!result || !result.page) {
      res.statusCode = 404;
      // const html = await app.renderToHTML(req, res, '/search', { message: result.message });
      // app.sendHTML(req, res, html, req.method);
      await app.render(req, res, '/search', { ...result });
    } else {
      res.redirect(result.page);
    }
  } catch (error) {
    res.statusCode = 500;
    app.renderError(error, req, res, '/search');
  }
}

module.exports = {
  handleSearchQuery,
};
