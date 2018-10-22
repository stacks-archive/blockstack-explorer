import { getJSON, makeUrl } from '../common';

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
  const account = await getJSON(url);
  return account;
}
