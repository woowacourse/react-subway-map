import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './useStore';
import { requestLogin, logout, resetError } from '../slices/authSlice';
import { CREWS } from '../types';
import MESSAGE from '../constants/message';

const useAuth = () => {
  const auth = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const { accessToken, isLogin, server, error } = auth;

  const onLogin = (currentServer: CREWS, form: { email: string; password: string }) =>
    dispatch(requestLogin({ server: currentServer, form }));

  const onLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    if (error) {
      // eslint-disable-next-line no-alert
      alert(error.message || MESSAGE.ERROR.LOGIN_FAILURE);
      dispatch(resetError());
    }
  }, [error, dispatch]);

  return {
    onLogin,
    onLogout,
    isLogin,
    accessToken,
    server,
    error,
  };
};

export default useAuth;
