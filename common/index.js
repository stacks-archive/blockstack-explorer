import fetch from 'cross-fetch';
import idx from 'idx';
import { formatValue } from '@common/lib/units';

/**
 * Simple get json fn
 * @param {string} url - the url you want to fetch
 */
const getJSON = async (url) => {
  try {
    const request = await fetch(url);
    return request.json();
  } catch (e) {
    throw Error(e);
  }
};

/**
 * Prepend api calls with the API_URL or fallback
 * @param {string} path - the path you want to append to the api url
 */
const makeUrl = (path) => {
  const url = process.env.API_URL || 'https://explorer-api.blockstack.org';
  return url + path;
};

/**
 * Blockstack: get a profile image url from profile.json
 * @param {object} user - the path you want to append to the api url
 */
const getProfileImage = (user) => idx(user, (_) => _.profile.image[0].contentUrl);

/**
 * Get the hostname of a url
 * @param {string} url - the url you want the hostname of
 */
const extractHostname = (url) => {
  let hostname;
  // find & remove protocol (http, ftp, etc.) and get hostname

  if (url.indexOf('//') > -1) {
    hostname = url.split('/')[2];
  } else {
    hostname = url.split('/')[0];
  }

  // find & remove port number
  hostname = hostname.split(':')[0];
  // find & remove "?"
  hostname = hostname.split('?')[0];

  return hostname;
};

/**
 * Get root domain of a string (URL)
 * @param {string} url - the url you want the domain of
 */
const extractRootDomain = (url) => {
  let domain = extractHostname(url);
  const splitArr = domain.split('.');
  const arrLen = splitArr.length;

  // extracting the root domain here
  // if there is a subdomain
  if (arrLen > 2) {
    domain = `${splitArr[arrLen - 2]}.${splitArr[arrLen - 1]}`;
    // check to see if it's using a Country Code Top Level Domain (ccTLD) (i.e. ".me.uk")
    if (splitArr[arrLen - 2].length === 2 && splitArr[arrLen - 1].length === 2) {
      // this is using a ccTLD
      domain = `${splitArr[arrLen - 3]}.${domain}`;
    }
  }
  return domain;
};

/**
 * Get unique items in an array
 * @param {array} array - the array you want to remove duplicate items from
 */
const uniq = (array) => [...new Set(array)];

/**
 * Generates a human readable title for transactions
 */
const txTitle = (operation, valueStacks) => {
  if (operation === 'SENT') {
    return `Sent ${formatValue(valueStacks)} STX`;
  }
  if (operation === 'RECEIVED') {
    return `Received ${formatValue(valueStacks)} STX`;
  }
  if (valueStacks) {
    return `${operation} ${formatValue(valueStacks)} STX`;
  }
  return operation;
};

export { getJSON, makeUrl, getProfileImage, extractRootDomain, uniq, txTitle };
