export const isValidEmail = (value) => {
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  return emailRegex.test(value);
};

export const isValidAge = (value) => {
  const ageRegex = /^[1-9][0-9]*$/;

  return ageRegex.test(value) && Number(value) <= 200;
};

export const isValidPassword = (value) => {
  const passwordRegex = /^.+$/;

  return passwordRegex.test(value);
};
