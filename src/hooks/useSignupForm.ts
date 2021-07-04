import { ChangeEventHandler, FormEventHandler, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { SIGNUP_VALUE } from '../constants/values';
import REGEX from '../constants/regex';
import PATH from '../constants/path';

import { SnackBarContext } from '../contexts/SnackBarProvider';
import { LoadingContext } from '../contexts/LoadingContext';

import { ERROR_MESSAGE, SUCCESS_MESSAGE } from '../constants/messages';
import api from '../apis';
import useDebounce from './useDebounce';
import useInput from './useInput';
import { Validation } from '../types';

const DEBOUNCE_DELAY = 500;

const useSignupFrom = () => {
  const [email, setEmail] = useState<string>('');
  const [age, onAgeChange] = useInput('');
  const [password, onPasswordChange] = useInput('');
  const [passwordConfirm, onPasswordConfirmChange] = useInput('');
  const [isEmailDuplicated, setIsEmailDuplicated] = useState(false);

  const history = useHistory();
  const addMessage = useContext(SnackBarContext)?.addMessage;
  const callWithLoading = useContext(LoadingContext)?.callWithLoading;

  const isEmailFormatValid = !email || REGEX.EMAIL.test(email);
  const isAgeValid =
    !age ||
    (Number(age) >= SIGNUP_VALUE.AGE_MIN_VALUE && Number(age) <= SIGNUP_VALUE.AGE_MAX_VALUE);
  const isPasswordValid = !password || REGEX.PASSWORD.test(password);
  const isPasswordMatched = !passwordConfirm || password === passwordConfirm;
  const isFormCompleted =
    email !== '' &&
    age !== '' &&
    password !== '' &&
    passwordConfirm !== '' &&
    isEmailFormatValid &&
    !isEmailDuplicated &&
    isAgeValid &&
    isPasswordValid &&
    isPasswordMatched;

  const emailMessage = email
    ? isEmailFormatValid
      ? isEmailDuplicated
        ? ERROR_MESSAGE.DUPLICATED_EMAIL
        : SUCCESS_MESSAGE.AVAILABLE_EMAIL
      : ERROR_MESSAGE.INVALID_EMAIL
    : '';
  const ageErrorMessage = isAgeValid ? '' : ERROR_MESSAGE.INVALID_AGE;
  const passwordErrorMessage = isPasswordValid ? '' : ERROR_MESSAGE.INVALID_PASSWORD;
  const passwordMatchedErrorMessage = isPasswordMatched
    ? ''
    : ERROR_MESSAGE.INVALID_PASSWORD_CONFIRM;

  const requestCheckEmailDuplicated = useDebounce(async (value: string) => {
    const { isSucceeded, result } = await api.user.checkEmailDuplicated(value);

    if (isSucceeded && result !== null) {
      setIsEmailDuplicated(result);
    } else {
      addMessage?.(ERROR_MESSAGE.DEFAULT);
    }
  }, DEBOUNCE_DELAY);

  const onEmailChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setEmail(event.target.value);

    if (isEmailFormatValid) {
      requestCheckEmailDuplicated(event.target.value);
    }
  };

  const onSignup: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    if (!isFormCompleted) {
      return;
    }

    callWithLoading?.(async () => {
      const { isSucceeded, message } = await api.user.signup({
        email,
        password,
        age: Number(age),
      });

      addMessage?.(message);

      if (isSucceeded) {
        history.push(PATH.LOGIN);
      }
    });
  };

  const formValue = { email, age, password, passwordConfirm };
  const handler = {
    onEmailChange,
    onAgeChange,
    onPasswordChange,
    onPasswordConfirmChange,
    onSignup,
  };
  // TODO: type 고민해보기
  const validation: { [key: string]: Validation } = {
    email: { text: emailMessage, isValid: isEmailFormatValid && !isEmailDuplicated },
    age: { text: ageErrorMessage, isValid: isAgeValid },
    password: { text: passwordErrorMessage, isValid: isPasswordValid },
    passwordConfirm: { text: passwordMatchedErrorMessage, isValid: isPasswordMatched },
    form: { text: '', isValid: isFormCompleted },
  };

  return {
    formValue,
    handler,
    validation,
  };
};

export default useSignupFrom;
