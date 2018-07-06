import * as constants from './constants';

export const doSelectAccount = (address) => {
  return {
    type: constants.SELECT_ACCOUNT,
    address,
  }
};
