import { REGEXP } from '../../constants/regularExpression';
import { VALIDATION } from '../../constants/validation';

export const getEmailErrorMessage = (email: string) => {
  if (!REGEXP.EMAIL.test(email)) {
    return '이메일 형식이 아닙니다.';
  }

  return null;
};

export const getAgeErrorMessage = (age: string) => {
  if (isNaN(Number(age))) {
    return '나이는 숫자여야 합니다.';
  }

  if (!(VALIDATION.MIN_AGE <= Number(age) && Number(age) <= VALIDATION.MAX_AGE)) {
    return `나이는 ${VALIDATION.MIN_AGE}살 이상 ${VALIDATION.MAX_AGE}살 이하여야 합니다.`;
  }

  return null;
};

export const getPasswordErrorMessage = (password: string) => {
  if (!(VALIDATION.MIN_PASSWORD_LENGTH <= password.length && password.length <= VALIDATION.MAX_PASSWORD_LENGTH)) {
    return `비밀번호는 최소 ${VALIDATION.MIN_PASSWORD_LENGTH}글자에서 최대 ${VALIDATION.MAX_PASSWORD_LENGTH}글자여야 합니다.`;
  }

  return null;
};

export const getConfirmPasswordErrorMessage = (password: string, confirmPassword: string) => {
  if (
    !(
      VALIDATION.MIN_PASSWORD_LENGTH <= confirmPassword.length &&
      confirmPassword.length <= VALIDATION.MAX_PASSWORD_LENGTH
    )
  ) {
    return `비밀번호는 최소 ${VALIDATION.MIN_PASSWORD_LENGTH}글자에서 최대 ${VALIDATION.MAX_PASSWORD_LENGTH}글자여야 합니다.`;
  }

  if (password !== confirmPassword) {
    return '동일한 비밀번호를 입력해주세요.';
  }

  return null;
};
