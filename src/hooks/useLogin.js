import { unwrapResult } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { ACCESS_TOKEN, LOGIN, MESSAGE_TYPE, ROUTE, SHOWING_MESSAGE_TIME } from '../constants';
import { clearLoginState, login } from '../redux/userSlice';

const useLogin = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const { isLogin } = useSelector((store) => store.user);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (!Cookies.get(ACCESS_TOKEN)) {
      history.push(ROUTE.LOGIN);
      return;
    }

    if (isLogin) {
      history.push(ROUTE.STATION);
    }
  }, [isLogin]);

  const handleLogin = async (e) => {
    try {
      e.preventDefault();

      const email = e.target.email.value;
      const password = e.target.password.value;

      const response = await dispatch(login({ email, password }));
      unwrapResult(response);

      enqueueSnackbar(LOGIN.SUCCEED, { autoHideDuration: SHOWING_MESSAGE_TIME });
      history.push(ROUTE.STATION);
    } catch (error) {
      enqueueSnackbar(LOGIN.FAIL, { variant: MESSAGE_TYPE.ERROR, autoHideDuration: SHOWING_MESSAGE_TIME });
      Cookies.remove(ACCESS_TOKEN);

      dispatch(clearLoginState());
    }
  };

  return { handleLogin };
};

export default useLogin;
