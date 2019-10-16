export const stacksValue = (value) => `${+`${Math.round(`${value * 10e-7}e+7`)}e-7`} STX`;

export const btcValue = (value) => +`${Math.round(`${value * 10e-9}e+9`)}e-9`;
