const isValidLength = (value: string, minLength: number = 0, maxLength: number) => {
  return minLength <= value.length && value.length <= maxLength;
};

const isValidRange = (value: number, minLength: number = 0, maxLength: number) => {
  return minLength <= value && value <= maxLength;
};

export { isValidLength, isValidRange };
