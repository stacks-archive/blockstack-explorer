import Router from 'next/router';
import * as c32check from 'c32check';
import { fetchSearch } from '@common/lib/client/api';

/**
 * Take a free-form search query (from the navigation),
 * and redirect the user to the right page
 * @param {string} query - the query you want results for
 * TODO: validate BTC addresses, txids, STAX addresses and block heights/hashes
 */
const search = async (query) => {
  const blockstackID = /^([A-Za-z0-9_]+\.){1,2}[A-Za-z0-9_]+$/;

  if (blockstackID.test(query)) {
    Router.push(
      {
        pathname: '/names/single',
        query: {
          name: query,
        },
      },
      `/name/${query}`,
    );
    return true;
  }

  try {
    c32check.c32ToB58(query);
    Router.push(
      {
        pathname: '/address/stacks',
        query: { address: query },
      },
      `/address/stacks/${query}`,
    );
    return true;
  } catch (error) {
    // move on, not a stacks address
  }

  const searchData = await fetchSearch(query);

  if (searchData.success === false) {
    return null;
  }

  if (searchData.type === 'tx') {
    Router.push(
      {
        pathname: '/transaction/single',
        query: {
          id: searchData.id,
        },
      },
      `/tx/${searchData.id}`,
    );
    return true;
  }

  if (searchData.type === 'block') {
    Router.push(
      {
        pathname: '/blocks/single',
        query: {
          id: searchData.id,
        },
      },
      `/block/${searchData.id}`,
    );
    return true;
  }

  if (searchData.type === 'btc-address') {
    Router.push(
      {
        pathname: '/address/single',
        query: {
          address: searchData.id,
        },
      },
      `/address/${searchData.id}`,
    );
    return true;
  }

  console.log(searchData);
  throw new Error(`Unexpected search result data: ${searchData}`);
};

export { search };

export default search;
