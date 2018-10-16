import fetch from 'cross-fetch';

const makeUrl = (path) => {
  let url;
  let password;
  if (typeof process !== 'undefined') {
    url = process.env.BASE_URL;
    password = process.env.ADMIN_PASSWORD;
  }
  url += path;
  if (password) {
    url += `?username=admin&password=${password}`;
  }
  return url;
};

const getJSON = async (url) => {
  const request = await fetch(url, {
    credentials: 'include',
  });
  const json = await request.json();
  return json;
};

export const fetchAccount = async (address) => {
  try {
    const url = makeUrl(`/api/accounts/${address}`);
    const account = await getJSON(url);
    return account;
  } catch (error) {
    return null;
  }
};

export const fetchTotals = async () => {
  const url = makeUrl('/api/accounts/global');
  const totals = await getJSON(url);
  return totals;
};
