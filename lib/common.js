import fetch from 'cross-fetch';

const getJSON = async (url) => {
  try {
    const request = await fetch(url, {
      credentials: 'include',
    });
    return request.json();
  } catch (e) {
    throw Error(e);
  }
};

const makeUrl = (path) => {
  let url;
  let password;
  if (typeof process !== 'undefined') {
    url = process.env.BASE_URL || 'http://localhost:3000';
    password = process.env.ADMIN_PASSWORD;
  } else {
    url = window.location.origin;
  }
  url += path;
  if (password) {
    url += `?username=admin&password=${password}`;
  }
  return url;
};

export { getJSON, makeUrl };
