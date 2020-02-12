import BigNumber from 'bignumber.js';

export const formatLargeNumber = (v, decimals = 0) => {
  const largeNumber = new BigNumber(v);
  return largeNumber.toFormat(decimals);
};

export const stacksValue = (value, fromMicroStacks = true, fixedDecimals = false) => {
  let num = new BigNumber(value);
  if (fromMicroStacks) {
    num = num.shiftedBy(-6);
  }
  const stxString = fixedDecimals ? num.toFormat(6) : num.decimalPlaces(6).toFormat();
  return `${stxString} STX`;
};

export const btcValue = (value) => `${formatLargeNumber(new BigNumber(value).shiftedBy(-8), 8)} BTC`;
