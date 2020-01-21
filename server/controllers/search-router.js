const fetch = require('cross-fetch');
const apiEndpoint = require('../../common/api-endpoint');

// TODO: all this detection logic should probably be moved to the API search endpoint.
async function resolveQuery(query) {
  const searchUrl = apiEndpoint.makeUrl(`/api/v2/search/${query}`);
  const fetchResult = await fetch(searchUrl);
  const result = await fetchResult.json();
  if (!result || !result.found) {
    return { isHashSearch: result.isHash };
  }

  if (result.type === 'name') {
    return { page: `/name/${result.name}` };
  }
  if (result.type === 'stacks-address') {
    return { page: `/address/stacks/${result.address}` };
  }
  if (result.type === 'btc-address') {
    return { page: `/address/${result.address}` };
  }
  if (result.type === 'btc-block') {
    return { page: `/block/${result.hash}` };
  }
  if (result.type === 'btc-tx') {
    return { page: `/tx/${result.hash}` };
  }

  throw new Error(`Unexpected result from search: ${JSON.stringify(result)}`);
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
