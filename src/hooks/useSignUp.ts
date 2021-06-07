import { useSnackbar } from 'notistack';
import axios from 'axios';
import { SignUp } from '../types';
import MESSAGE from '../constants/message';
import BACKEND from '../constants/backend';
import {
  isValidAge,
  isValidEmail,
  isValidPassword,
  isValidPasswordConfirm,
} from '../pages/SignUpPage/SignUpPageValidation';

const useSignUp = () => {
  const { enqueueSnackbar } = useSnackbar();

  const requestSignUp = async ({ server, email, age, password, passwordConfirm }: SignUp) => {
    if (!isValidEmail(email)) {
      enqueueSnackbar(MESSAGE.ERROR.INVALID_EMAIL);

      return;
    }

    if (!isValidAge(age)) {
      enqueueSnackbar(MESSAGE.ERROR.INVALID_AGE);

      return;
    }

    if (!isValidPassword(password)) {
      enqueueSnackbar(MESSAGE.ERROR.INVALID_PASSWORD);

      return;
    }

    if (!isValidPasswordConfirm(password, passwordConfirm)) {
      enqueueSnackbar(MESSAGE.ERROR.DIFFERENT_PASSWORD);

      return;
    }

    try {
      await axios.post(`${BACKEND[server].baseUrl}/members`, {
        email,
        age,
        password,
      });
      enqueueSnackbar(MESSAGE.SUCCESS.SIGN_UP, {
        variant: 'success',
      });

      return true;
    } catch (error) {
      enqueueSnackbar(MESSAGE.ERROR.SIGN_UP_FAILURE, {
        variant: 'error',
      });
    }

    return false;
  };

  const checkDuplicateEmail = async ({ server, email }: Pick<SignUp, 'server' | 'email'>) => {
    await axios.post(`${BACKEND[server].baseUrl}/members/exists`, { email });
  };

  return {
    requestSignUp,
    checkDuplicateEmail,
  };
};

export default useSignUp;
