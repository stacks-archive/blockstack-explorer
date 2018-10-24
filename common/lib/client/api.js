import { getJSON, makeUrl } from '../../index';
import fetch from 'cross-fetch';

/**
 * Get latest name operations
 */
export const fetchNameOperations = async () => {
  const url = makeUrl('/api/name-operations');
  const { nameOperations } = await getJSON(url);
  return nameOperations;
};

/**
 * Fetch data for a specific name
 * @param {string} name - the name you want the data for
 */
export const fetchName = async (name) => {
  try {
    const url = makeUrl(`/api/names/${name}`);
    return getJSON(url);
  } catch (error) {
    console.log(error);
    return null;
  }
};

/**
 * Fetch Apps from app.co and filter to ones that use blockstack as auth
 */
export const fetchBlockstackApps = async () => {
  const appData = await fetch('https://app-co-api.herokuapp.com/api/apps');
  const { apps } = await appData.json();
  return [...apps.filter(({ authentication }) => authentication === 'Blockstack')];
};

/**
 * Pass a query to search by
 * @param {string} query - the query you want results for
 */
export const fetchSearch = async (query) => getJSON(makeUrl(`/api/search/${query}`));

/**
 * Get tx data with a txid
 * @param {string} txid - the Transaction ID
 */
export const fetchTX = async (txid) => getJSON(makeUrl(`/api/transactions/${txid}`));

/**
 * Get data for a specific BTC address
 * @param {string} id - the BTC address
 */
export const fetchAddress = async (id) => getJSON(makeUrl(`/api/addresses/${id}`));

/**
 * Get data for a specific block.
 * @param {string} hashOrHeight - hash or height of the block you want
 */
export const fetchBlock = async (hashOrHeight) => getJSON(makeUrl(`/api/blocks/${hashOrHeight}`));

/**
 * Fetch blocks on a given date
 * @param {string} date - The date to fetch blocks from. Use the format YYYY-MM-DD
 */
export const fetchBlocks = (date) => {
  let url = makeUrl('/api/blocks');
  if (date) {
    url += `?date=${date}`;
  }
  return getJSON(url);
};
