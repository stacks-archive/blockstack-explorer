import fetch from 'cross-fetch';
import { getJSON, makeUrl } from '../../index';

/**
 * Fetch all new name registrations in the past 7 days.
 */
const fetchNameOperations = async () => {
  const url = makeUrl('/api/name-operations');
  const { nameOperations } = await getJSON(url);
  return nameOperations;
};

/**
 * Fetch information for a given BNS name.
 * @param {string} name - the name you want the data for
 */
const fetchName = async (name, page = 0) => {
  try {
    const url = makeUrl(`/api/names/${name}?page=${page}`);
    return getJSON(url);
  } catch (error) {
    console.log(error);
    return null;
  }
};

/**
 * Fetch all names.
 * @param {string} page
 */
const fetchNames = async (page) => {
  try {
    let url = makeUrl(`/api/names`);
    if (page) {
      url += `?page=${page}`;
    }
    return getJSON(url);
  } catch (error) {
    console.log(error);
    return null;
  }
};
/**
 * Fetch all namespaces, including the number of names in that namespace.
 */
const fetchNamespaces = async () => {
  const url = makeUrl('/api/namespaces');
  return getJSON(url);
};

/**
 * Fetch all namespaces, including the number of names in that namespace.
 * @param {string} namespace
 * @param {string} page
 */
const fetchNamespaceNames = async (namespace, page) => {
  let url = makeUrl(`/api/namespaces/${namespace}`);
  if (page) {
    url += `?page=${page}`;
  }
  return getJSON(url);
};

/**
 * Pass a query to search by
 * @param {string} query - the query you want results for
 */
const fetchSearch = async (query) => getJSON(makeUrl(`/api/search/${query}`));

/**
 * Get tx data with a txid
 * @param {string} txid - the Transaction ID
 */
const fetchTX = async (txid) => getJSON(makeUrl(`/api/transactions/${txid}`));

/**
 * Get data for a specific BTC address
 * @param {string} id - the BTC address
 */
const fetchAddress = async (id, page = 0) => getJSON(makeUrl(`/api/addresses/${id}?page=${page}`));

/**
 * Get data for a specific block.
 * @param {string} hashOrHeight - hash or height of the block you want
 */
const fetchBlock = async (hashOrHeight) => getJSON(makeUrl(`/api/blocks/${hashOrHeight}`));

/**
 * Fetch blocks on a given date
 * @param {string} date - The date to fetch blocks from. Use the format YYYY-MM-DD
 */
const fetchBlocks = (date) => {
  let url = makeUrl('/api/blocks');
  if (date) {
    url += `?date=${date}`;
  }
  return getJSON(url);
};

/**
 * Get genesis data for a specific Stacks address
 * @param {string} address - the Stacks address
 */
const fetchAccounts = async (address) => getJSON(makeUrl(`/api/accounts/${address}`));

/**
 * Fetch Apps from app.co and filter to ones that use blockstack as auth
 */
const fetchBlockstackApps = async () => {
  const appData = await fetch('https://api.app.co/api/apps');
  const { apps } = await appData.json();
  return [...apps.filter(({ authentication }) => authentication === 'Blockstack')];
};

/**
 * Fetch total names and subdomains
 */
const fetchNameCounts = async () => getJSON(makeUrl('/api/name-counts'));

/**
 * Fetch on-chain information for a Stacks address
 *
 * @param {string} address - the Stacks Address
 */
const fetchStacksAddress = async (address) => getJSON(makeUrl(`/api/stacks/addresses/${address}`));

const fetchHomeInfo = () => getJSON(makeUrl('/api/home'));

const fetchBlockV2 = (hash) => getJSON(makeUrl(`/api/v2/blocks/${hash}`));

const fetchBlocksV2 = (date, page) => {
  let url = makeUrl('/api/v2/blocks');
  if (date) {
    url += `?date=${date}`;
  }
  if (page) {
    url += `${date ? '&' : '?'}page=${page}`;
  }
  return getJSON(url);
};

const fetchSTXTransactions = (page = 0) => {
  const url = makeUrl(`/api/v2/transactions/stx?page=${page}`);
  return getJSON(url);
};

const fetchNameRegistrations = (page = 0) => {
  const url = makeUrl(`/api/v2/transactions/names?page=${page}`);
  return getJSON(url);
};

const fetchSubdomainRegistrations = (page = 0) => {
  const url = makeUrl(`/api/v2/transactions/subdomains?page=${page}`);
  return getJSON(url);
};

export {
  fetchNameOperations,
  fetchName,
  fetchNames,
  fetchNamespaces,
  fetchNamespaceNames,
  fetchSearch,
  fetchTX,
  fetchAddress,
  fetchBlock,
  fetchBlocks,
  fetchBlockstackApps,
  fetchNameCounts,
  fetchAccounts,
  fetchStacksAddress,
  fetchHomeInfo,
  fetchBlockV2,
  fetchBlocksV2,
  fetchSTXTransactions,
  fetchNameRegistrations,
  fetchSubdomainRegistrations,
};
