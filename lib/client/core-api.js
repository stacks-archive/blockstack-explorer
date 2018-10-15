import fetch from 'cross-fetch';

const coreApi = 'https://core.blockstack.org';
const explorerApi = 'https://explorer.blockstack.org';

const fetchJSON = async (url) => {
  const response = await fetch(url);
  if (response.status !== 200) {
    return null;
  }
  const data = await response.json();
  return data;
}

export const fetchName = async (name) => {
  const url = `${coreApi}/v2/users/${name}`;
  const data = await fetchJSON(url);
  return data ? data[name] : data;
};

export const fetchAddress = (address) => {
  const url = `${coreApi}/v1/addresses/bitcoin/${address}`;
  return fetchJSON(url);
}

export const fetchTX = (tx) => {
  const url = `${explorerApi}/insight-api/tx/${tx}`;
  return fetchJSON(url);
}