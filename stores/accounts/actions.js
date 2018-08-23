import fetch from 'cross-fetch';
import * as constants from './constants';

// export const doSelectAccount = (address) => ({
//   type: constants.SELECT_ACCOUNT,
//   address,
// });

const selectingAccount = (address) => ({
  type: constants.SELECTING_ACCOUNT,
  address,
});

const selectedAccount = (account) => ({
  type: constants.SELECTED_ACCOUNT,
  account,
});

export const doSelectAccount = (address) =>
  async function innerSelectAccount(dispatch) {
    dispatch(selectingAccount(address));
    let url;
    if (typeof process !== 'undefined') {
      url = process.env.BASE_URL;
    }
    url += `/api/accounts/${address}`;
    console.log(url);
    const request = await fetch(url);
    const account = await request.json();
    // console.log(account);
    dispatch(selectedAccount(account));
    return true;
  };
