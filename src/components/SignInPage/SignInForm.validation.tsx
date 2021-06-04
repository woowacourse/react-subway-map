import { VALIDATION } from '../../constants/constant';
import { REGEXP } from '../../constants/regularExpression';

export const getEmailErrorMessage = (email: string) => {
  if (!REGEXP.EMAIL.test(email)) {
    return '이메일 형식이 아닙니다.';
  }

  return null;
};

export const getPasswordErrorMessage = (password: string) => {
  if (!(VALIDATION.MIN_PASSWORD_LENGTH <= password.length && password.length <= VALIDATION.MAX_PASSWORD_LENGTH)) {
    return `비밀번호는 최소 ${VALIDATION.MIN_PASSWORD_LENGTH}글자 이상 ${VALIDATION.MAX_PASSWORD_LENGTH}글자 이하여야 합니다.`;
  }

  return null;
};
