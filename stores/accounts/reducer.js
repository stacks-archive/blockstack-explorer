import defaults from 'lodash/defaults';

import * as constants from './constants';

const makeReducer = (data) => {
  let initialState = {};
  // console.log('data',data);

  if (data.rows) {
    initialState.accountsByAddress = {}
    data.rows.forEach((account) => {
      initialState.accountsByAddress[account.address] = account;
    });
  } else {
    const emptyState = {
      selectedAccount: null,
      selectedAddress: null,
    }

    initialState = defaults(data.accounts, emptyState);
  }

  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case constants.SELECT_ACCOUNT: {
        return {
          ...state,
          selectedAccount: state.accountsByAddress[action.address],
          selectedAddress: action.address,
        }
      }
      default:
        return state;
    }
  };

  return reducer;
};

export default makeReducer;