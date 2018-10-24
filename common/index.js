import fetch from 'cross-fetch';
import idx from 'idx';

const getJSON = async (url) => {
  try {
    const request = await fetch(url);
    return request.json();
  } catch (e) {
    throw Error(e);
  }
};

const makeUrl = (path) => {
  const url = process.env.API_URL || 'https://blockstack-explorer-api.herokuapp.com';
  return url + path;
};

const getProfileImage = (user) => idx(user, (_) => _.profile.image[0].contentUrl);

function extractHostname(url) {
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
}

// To address those who want the "root domain," use this function:
function extractRootDomain(url) {
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
}

const uniq = (a) => [...new Set(a)];
export { getJSON, makeUrl, getProfileImage, extractRootDomain, uniq };
