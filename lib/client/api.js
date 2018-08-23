import fetch from 'cross-fetch';

export const fetchAccount = async (address) => {
  let url;
  if (typeof process !== 'undefined') {
    url = process.env.BASE_URL;
  }
  url += `/api/accounts/${address}`;
  // console.log(url);
  const request = await fetch(url);
  const account = await request.json();
  return account;
};
