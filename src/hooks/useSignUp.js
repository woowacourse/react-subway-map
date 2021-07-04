import { unwrapResult } from '@reduxjs/toolkit';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { ROUTE, SIGN_UP } from '../constants';
import { signUp } from '../redux/userSlice';
import {
  getAgeValidationMessage,
  getEmailValidationMessage,
  getPasswordValidationMessage,
} from '../services/SingUpValidator';
import useAuthorization from './commons/useAuthorization';

const useSignUp = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [emailMessage, setEmailMessage] = useState('');
  const [age, setAge] = useState('');
  const [ageMessage, setAgeMessage] = useState('');
  const [password, setPassword] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');
  const [isValidSignup, setIsValidSignup] = useState(false);

  const { enqueueSnackbar } = useSnackbar();
  useAuthorization();

  useEffect(() => {
    if (!emailMessage && !ageMessage && !passwordMessage) {
      if (!!email && !!age && !!password) {
        setIsValidSignup(true);
      } else setIsValidSignup(false);
    } else {
      setIsValidSignup(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [emailMessage, ageMessage, passwordMessage]);

  const handleSignUpFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await dispatch(signUp({ email, age, password }));
      unwrapResult(response);

      enqueueSnackbar(SIGN_UP.SUCCEED);
      history.push(ROUTE.LOGIN);
    } catch (error) {
      enqueueSnackbar(SIGN_UP.FAIL);
    }
  };

  const handleEmailInput = ({ target: { value } }) => {
    setEmail(value);
    setEmailMessage(getEmailValidationMessage(value));
  };

  const handleAgeInput = ({ target: { value } }) => {
    setAge(value);
    setAgeMessage(getAgeValidationMessage(value));
  };

  const handlePasswordInput = ({ target: { value } }) => {
    setPassword(value);
    setPasswordMessage(getPasswordValidationMessage(value));
  };

  return {
    email,
    age,
    password,
    emailMessage,
    ageMessage,
    passwordMessage,
    isValidSignup,
    handleSignUpFormSubmit,
    handleEmailInput,
    handleAgeInput,
    handlePasswordInput,
  };
};

export default useSignUp;
