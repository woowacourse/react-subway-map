import { AUTH, MESSAGE } from '../../constants/constant';
import { REGEXP } from '../../constants/regularExpression';

export const getEmailErrorMessage = (email: string) => {
  if (!REGEXP.EMAIL.test(email)) {
    return MESSAGE.ERROR.AUTH.INVALID_EMAIL;
  }

  return '';
};

export const getPasswordErrorMessage = (password: string) => {
  if (!(AUTH.PASSWORD_MIN_LENGTH <= password.length && password.length <= AUTH.PASSWORD_MAX_LENGTH)) {
    return MESSAGE.ERROR.AUTH.INVALID_PASSWORD_LENGTH;
  }

  return '';
};

export const getAgeErrorMessage = (age: string) => {
  if (isNaN(Number(age))) {
    return MESSAGE.ERROR.AUTH.INVALID_AGE;
  }

  if (!(AUTH.AGE_MIN <= Number(age) && Number(age) <= AUTH.AGE_MAX)) {
    return MESSAGE.ERROR.AUTH.INVALID_AGE_LENGTH;
  }

  return '';
};

export const getConfirmPasswordErrorMessage = (password: string, confirmPassword: string) => {
  if (!(AUTH.PASSWORD_MIN_LENGTH <= confirmPassword.length && confirmPassword.length <= AUTH.PASSWORD_MAX_LENGTH)) {
    return MESSAGE.ERROR.AUTH.INVALID_PASSWORD_LENGTH;
  }

  if (password !== confirmPassword) {
    return MESSAGE.ERROR.AUTH.NOT_SAME_PASSWORD;
  }

  return '';
};
