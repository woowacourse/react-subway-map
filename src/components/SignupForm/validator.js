export const isValidEmail = (value) => {
  const emailPattern =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  return emailPattern.test(value);
};

export const isValidAge = (value) => {
  const agePattern = /^[1-9][0-9]*$/;

  return agePattern.test(value) && Number(value) <= 200;
};

export const isValidPassword = (value) => {
  const passwordPattern = /^.+$/;

  return passwordPattern.test(value);
};
