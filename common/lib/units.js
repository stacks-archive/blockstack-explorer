import numeral from 'numeral';

export const formatValue = (v) => numeral(parseInt(v, 10)).format('0,0[.]000000');

export const stacksValue = (value) => `${formatValue(+`${Math.round(`${value * 10e-7}e+7`)}e-7`)} STX`;

export const btcValue = (value) => +`${formatValue(Math.round(`${value * 10e-9}e+9`))}e-9`;
