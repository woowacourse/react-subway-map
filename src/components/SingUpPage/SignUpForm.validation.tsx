import { REGEXP } from '../../constants/regularExpression';

export const getEmailErrorMessage = (email: string) => {
  if (!REGEXP.EMAIL.test(email)) {
    return '이메일 형식이 아닙니다.';
  }

  return '';
};

export const getAgeErrorMessage = (age: string) => {
  if (isNaN(Number(age))) {
    return '나이는 숫자여야 합니다.';
  }

  if (!(1 <= Number(age) && Number(age) <= 200)) {
    return '나이는 1살 이상 200살 이하여야 합니다.';
  }

  return '';
};

export const getPasswordErrorMessage = (password: string) => {
  if (!(4 <= password.length && password.length <= 20)) {
    return '비밀번호는 최소 4글자에서 최대 20 글자여야 합니다.';
  }

  return '';
};

export const getConfirmPasswordErrorMessage = (password: string, confirmPassword: string) => {
  if (!(4 <= confirmPassword.length && confirmPassword.length <= 20)) {
    return '비밀번호는 최소 4글자에서 최대 20 글자여야 합니다.';
  }

  if (password !== confirmPassword) {
    return '동일한 비밀번호를 입력해주세요.';
  }

  return '';
};
