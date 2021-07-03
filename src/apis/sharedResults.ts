import { ERROR_MESSAGE } from '../constants/messages';

const unauthorizedResult = {
  isSucceeded: false,
  message: ERROR_MESSAGE.UNAUTHORIZED,
  result: {
    auth: false,
  },
};

const unauthorizedPostResult = {
  isSucceeded: false,
  message: ERROR_MESSAGE.UNAUTHORIZED,
  result: {
    auth: false,
    duplicated: false,
  },
};

const unauthorizedDeleteResult = {
  isSucceeded: false,
  message: ERROR_MESSAGE.UNAUTHORIZED,
  result: {
    auth: false,
    duplicated: false,
  },
};

export { unauthorizedResult, unauthorizedDeleteResult, unauthorizedPostResult };
