import * as constants from './constants';

const initialState = {
  selectedAddress: null,
  selectedAccount: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.SELECT_ACCOUNT: {
      return {
        ...state,
        selectedAccount: state.accountsByAddress[action.address],
        selectedAddress: action.address,
      };
    }
    case constants.SELECTING_ACCOUNT: {
      return {
        ...state,
        selectedAddress: action.address,
      };
    }
    case constants.SELECTED_ACCOUNT: {
      return {
        ...state,
        selectedAccount: action.account,
      };
    }
    default:
      return state;
  }
};

export default reducer;
