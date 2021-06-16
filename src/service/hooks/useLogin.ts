import { useHistory } from 'react-router';
import { LoginForm } from '../../types';
import { useAppDispatch, useAppSelector } from '../../state/store';
import { loginAction, loginAsyncAction } from '../../state/slices/login';

const useLogin = () => {
  const { accessToken } = useAppSelector(({ login: { accessToken } }) => ({
    accessToken,
  }));
  const dispatch = useAppDispatch();
  const history = useHistory();

  const isLogin = !!accessToken;

  const login = async (form: LoginForm) => {
    const result = await dispatch(loginAsyncAction.login(form));

    if (loginAsyncAction.login.fulfilled.match(result)) {
      alert('로그인에 성공했습니다.');

      history.push('/station');
    } else {
      alert('로그인에 실패했습니다.');
    }
  };

  const logout = () => {
    dispatch(loginAction.logout());
  };

  return {
    accessToken,
    login,
    logout,
    isLogin,
  };
};
export default useLogin;
