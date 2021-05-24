export const isValidEmail = (value) => {
  const rEmail =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  return rEmail.test(value);
};

export const isValidAge = (value) => {
  const rAge = /^[1-9][0-9]*$/;

  return rAge.test(value) && Number(value) <= 200;
};

export const isValidPassword = (value) => {
  const rPassword = /^.+$/;

  return rPassword.test(value);
};
