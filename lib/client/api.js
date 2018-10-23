import { getJSON, makeUrl } from '../common';
import fetch from 'cross-fetch';

export const fetchAccount = async (address) => {
  try {
    const url = makeUrl(`/api/accounts/${address}`);
    return getJSON(url);
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const fetchTotals = async () => {
  try {
    const url = makeUrl('/api/accounts/global');
    return getJSON(url);
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const fetchNameOperations = async () => {
  const url = makeUrl('/api/name-operations');
  const { nameOperations } = await getJSON(url);
  return nameOperations;
};

export const fetchName = async (name) => {
  try {
    const url = makeUrl(`/api/names/${name}`);
    return getJSON(url);
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const fetchBlockstackApps = async () => {
  const appData = await fetch('https://app-co-api.herokuapp.com/api/apps');
  const { apps } = await appData.json();
  return [...apps.filter(({ authentication }) => authentication === 'Blockstack')];
};

export const fetchSearch = async (query) => getJSON(makeUrl(`/api/search/${query}`));

export const fetchTX = async (id) => getJSON(makeUrl(`/api/transactions/${id}`));

export const fetchAddress = async (id) => getJSON(makeUrl(`/api/addresses/${id}`));

export const fetchBlock = async (hash) => getJSON(makeUrl(`/api/blocks/${hash}`));

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
