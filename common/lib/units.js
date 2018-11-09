const stacksValue = (value) => {
  return `${+`${Math.round(`${value * 10e-7}e+7`)}e-7`} STX`;
}

export { stacksValue };
