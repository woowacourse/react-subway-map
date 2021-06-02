const isValidLength = (value: string, minLength: number = 0, maxLength: number) => {
  return minLength <= value.length && value.length <= maxLength;
};

export { isValidLength };
