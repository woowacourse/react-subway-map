import { FormEventHandler, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../apis';
import { ERROR_MESSAGE } from '../constants/messages';
import PATH from '../constants/path';
import { LoadingContext } from '../contexts/LoadingContext';
import { SnackBarContext } from '../contexts/SnackBarProvider';
import { UserContext } from '../contexts/UserContextProvider';
import useInput from './useInput';

const useLoginForm = () => {
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');
  const [loginErrorMessage, setLoginErrorMessage] = useState('');

  const history = useHistory();

  const addMessage = useContext(SnackBarContext)?.addMessage;
  const setIsLoggedIn = useContext(UserContext)?.setIsLoggedIn;
  const callWithLoading = useContext(LoadingContext)?.callWithLoading;

  const onLogin: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    const isFormCompleted = email === '' || password === '';

    if (isFormCompleted) {
      setLoginErrorMessage(ERROR_MESSAGE.INCOMPLETE_LOGIN_FORM);

      return;
    }

    callWithLoading?.(async () => {
      const { isSucceeded, message, result } = await api.user.login({ email, password });

      addMessage?.(message);
      setIsLoggedIn?.(isSucceeded);

      if (isSucceeded) {
        localStorage.setItem('accessToken', result);
        history.push(PATH.ROOT);
      }
    });
  };

  return {
    formValue: { email, password },
    handler: { onEmailChange, onPasswordChange, onLogin },
    loginErrorMessage,
  };
};

export default useLoginForm;
