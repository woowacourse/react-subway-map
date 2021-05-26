import { useAppDispatch, useAppSelector } from './useStore';
import { requestLogin, logout } from '../slices/authSlice';
import { CREWS } from '../types';

const useAuth = () => {
  const auth = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const { accessToken, isLogin, server, error } = auth;

  const onLogin = (currentServer: CREWS, form: { email: string; password: string }) =>
    dispatch(requestLogin({ server: currentServer, form }));

  const onLogout = () => {
    dispatch(logout());
  };

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
