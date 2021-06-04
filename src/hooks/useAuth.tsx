import { useAppDispatch, useAppSelector } from './useStore';
import { requestLogin, logout, resetError, setServer } from '../slices/authSlice';
import { CREWS } from '../types';

const useAuth = () => {
  const auth = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const { accessToken, isLogin, server, error } = auth;

  const onLogin = (form: { email: string; password: string }) => dispatch(requestLogin({ form }));

  const onLogout = () => {
    dispatch(logout());
  };

  const onResetError = () => dispatch(resetError());

  const onSetServer = (selectedServer: CREWS) => dispatch(setServer(selectedServer));

  return {
    onLogin,
    onLogout,
    onResetError,
    onSetServer,
    isLogin,
    accessToken,
    server,
    error,
  };
};

export default useAuth;
