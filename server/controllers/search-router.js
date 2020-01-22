const request = require('request-promise-native');

const makeUrl = (path) => {
  const url = process.env.API_URL || 'https://explorer-api.staging.blockstack.xyz';
  return url + path;
};

async function resolveQuery(query) {
  const searchUrl = makeUrl(`/api/v2/search/${query}`);
  let result;
  try {
    const requestResult = await request.get({
      uri: searchUrl,
      json: true,
      simple: false,
      resolveWithFullResponse: true,
    });
    if (requestResult.statusCode !== 404 && requestResult.statusCode !== 200) {
      throw new Error(
        `Search fetch failed with unexpected status code ${requestResult.statusCode}: ${JSON.stringify(
          requestResult.body,
        )}`,
      );
    }
    result = requestResult.body;
  } catch (error) {
    console.error(`Error fetching: ${searchUrl}`);
    throw error;
  }

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
    console.error(`Internal server error while handling search query`);
    console.error(error);
    res.statusCode = 500;
    app.renderError(error, req, res, '/search');
  }
}

module.exports = {
  handleSearchQuery,
};
