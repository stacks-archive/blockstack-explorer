import numeral from 'numeral';
import BigNumber from 'bignumber.js'

export const formatValue = (v) => {
  const number = parseFloat(v);
  return number >= 1000 ? numeral(number).format('0,0.[000]') : number;
};

export const formatLargeNumber = (v, decimals = 0) => {
  const largeNumber = new BigNumber(v)
  return largeNumber.toFormat(decimals)
}

export const stacksValue = (value) => `${formatValue(+`${Math.round(`${value * 10e-7}e+7`)}e-7`)} STX`;

export const btcValue = (value) => +`${formatValue(Math.round(`${value * 10e-9}e+9`))}e-9`;
