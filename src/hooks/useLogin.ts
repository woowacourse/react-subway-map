import { useState } from 'react';
import { LoginForm } from '../types';
import { useAppDispatch, useAppSelector } from '../state/store';
import { loginAction, loginAsyncAction } from '../state/slices/login';
import { useHistory } from 'react-router';

const useLogin = () => {
  const { accessToken, error } = useAppSelector(
    ({ login: { accessToken, error } }) => ({
      accessToken,
      error,
    })
  );

  const dispatch = useAppDispatch();
  const history = useHistory();

  const [form, setForm] = useState<LoginForm>({
    email: '',
    password: '',
  });
  const { email, password } = form;

  const setEmail = (email: string) => {
    setForm({ ...form, email });
  };

  const setPassword = (password: string) => {
    setForm({ ...form, password });
  };

  const login = async (externalForm?: LoginForm) => {
    const result = await dispatch(loginAsyncAction.login(externalForm ?? form));

    if (loginAsyncAction.login.fulfilled.match(result)) {
      alert('로그인에 성공했습니다.');

      history.push('/station');
    } else {
      alert(error);
    }
  };

  const logout = () => {
    dispatch(loginAction.logout());
  };

  const isLogin = !!accessToken;

  return {
    accessToken,
    email,
    password,
    setEmail,
    setPassword,
    login,
    logout,
    isLogin,
  };
};
export default useLogin;
