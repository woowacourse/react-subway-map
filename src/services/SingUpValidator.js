import { SIGN_UP } from '../constants';

export const getEmailValidationMessage = (email) => {
  if (email[0] === '@') {
    return SIGN_UP.EMAIL_SHOULD_INCLUDE_ID;
  } else if (email.includes(' ')) {
    return SIGN_UP.EMAIL_CANNOT_INCLUDE_BLANK;
  } else if (/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(email)) {
    return SIGN_UP.EMAIL_CANNOT_INCLUDE_KOREAN;
  }
  return '';
};

export const getEmailValidationMessageAfterBlurred = (email) => {
  if (!/^[a-z0-9_+.-]+@([a-z0-9-]+\.)+[a-z0-9]{2,4}$/.test(email)) {
    return SIGN_UP.EMAIL_SHOULD_BE_IN_VALID_FORMAT;
  }
  return '';
};

export const getAgeValidationMessage = (age) => {
  if (age < SIGN_UP.MIN_AGE || age > SIGN_UP.MAX_AGE) {
    return SIGN_UP.AGE_SHOULD_BE_IN_RANGE;
  } else if (age.includes(' ')) {
    return SIGN_UP.AGE_CANNOT_INCLUDE_BLANK;
  } else if (!/^[0-9]*$/.test(age)) {
    return SIGN_UP.AGE_SHOULD_BE_IN_NUMBER;
  }
  return '';
};

export const getPasswordValidationMessage = (password) => {
  if (password.length < SIGN_UP.PASSWORD_LENGTH_MIN || password.length > SIGN_UP.PASSWORD_LENGTH_MAX) {
    return SIGN_UP.PASSWORD_SHOULD_BE_IN_RANGE;
  } else if (password.includes(' ')) {
    return SIGN_UP.PASSWORD_CANNOT_INCLUDE_BLANK;
  } else if (!/[a-zA-Z]/.test(password)) {
    return SIGN_UP.PASSWORD_SHOULD_INCLUDE_ENGLISH;
  } else if (!/[0-9]/.test(password)) {
    return SIGN_UP.PASSWORD_SHOULD_INCLUDE_NUMBER;
  } else if (!/^[a-zA-Z0-9]*$/.test(password)) {
    return SIGN_UP.PASSWORD_SHOULD_BE_ONLY_ENGLISH_AND_NUMBER;
  }
  return '';
};
