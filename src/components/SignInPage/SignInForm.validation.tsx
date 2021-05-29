import { REGEXP } from '../../constants/regularExpression';

export const getEmailErrorMessage = (email: string) => {
  if (!REGEXP.EMAIL.test(email)) {
    return '이메일 형식이 아닙니다.';
  }

  return '';
};

export const getPasswordErrorMessage = (password: string) => {
  if (!(4 <= password.length && password.length <= 20)) {
    return '비밀번호는 최소 4글자 이상 20글자 이하여야 합니다.';
  }

  return '';
};
