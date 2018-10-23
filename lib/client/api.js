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
  const url = makeUrl(`/api/names/${name}`);
  return getJSON(url);
};

export const fetchBlockstackApps = async () => {
  const appData = await fetch('https://app-co-api.herokuapp.com/api/apps');
  const { apps } = await appData.json();
  return [...apps.filter(({ authentication }) => authentication === 'Blockstack')];
};

export const fetchSearch = async (query) => getJSON(makeUrl(`/api/search/${query}`));

export const fetchTX = async (id) => getJSON(makeUrl(`/api/transactions/${id}`));

export const fetchAddress = async (id) => getJSON(makeUrl(`/api/addresses/${id}`));
