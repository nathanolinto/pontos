export const roundValue = (value: number) => {
  const integer = Number(Math.floor(value));
  const lastTwoNumbers = integer % 100;
  const integerWithoutLast = integer - lastTwoNumbers;
  let sum = 0;
  if (lastTwoNumbers >= 25 && lastTwoNumbers < 75) {
    sum = 50;
  } else if (lastTwoNumbers >= 75) {
    sum = 100;
  }
  return integerWithoutLast + sum;
};
