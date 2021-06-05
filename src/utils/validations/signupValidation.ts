import { ERROR_MESSAGE, SUCCESS_MESSAGE } from '../../constants/messages';
import REGEX from '../../constants/regex';
import { SIGNUP_VALUE } from '../../constants/values';

const isEmailFormatValid = (email: string): boolean => {
  return !email || REGEX.EMAIL.test(email);
};

const isAgeValid = (age: string): boolean => {
  return (
    !age || (Number(age) >= SIGNUP_VALUE.AGE_MIN_VALUE && Number(age) <= SIGNUP_VALUE.AGE_MAX_VALUE)
  );
};

const isPasswordValid = (password: string): boolean => {
  return !password || REGEX.PASSWORD.test(password);
};

const isPasswordMatched = (password: string, passwordConfirm: string): boolean => {
  return !passwordConfirm || password === passwordConfirm;
};

const emailMessage = (email: string, isEmailDuplicated: boolean): string => {
  if (!email) return '';

  if (isEmailFormatValid(email)) {
    if (isEmailDuplicated) {
      return ERROR_MESSAGE.DUPLICATED_EMAIL;
    }
    return SUCCESS_MESSAGE.AVAILABLE_EMAIL;
  }

  return ERROR_MESSAGE.INVALID_EMAIL;
};

const ageErrorMessage = (age: string): string => {
  return isAgeValid(age) ? '' : ERROR_MESSAGE.INVALID_AGE;
};

const passwordErrorMessage = (password: string): string => {
  return isPasswordValid(password) ? '' : ERROR_MESSAGE.INVALID_PASSWORD;
};

const passwordMatchedErrorMessage = (password: string, passwordConfirm: string): string => {
  return isPasswordMatched(password, passwordConfirm) ? '' : ERROR_MESSAGE.INVALID_PASSWORD_CONFIRM;
};

const isFormCompleted = (
  isEmailDuplicated: boolean,
  {
    email,
    age,
    password,
    passwordConfirm,
  }: { email: string; age: string; password: string; passwordConfirm: string }
) => {
  return (
    email &&
    age &&
    password &&
    passwordConfirm &&
    isEmailFormatValid(email) &&
    !isEmailDuplicated &&
    isAgeValid(age) &&
    isPasswordValid(password) &&
    isPasswordMatched(password, passwordConfirm)
  );
};

export {
  isEmailFormatValid,
  isAgeValid,
  isPasswordValid,
  isPasswordMatched,
  emailMessage,
  ageErrorMessage,
  passwordErrorMessage,
  passwordMatchedErrorMessage,
  isFormCompleted,
};
