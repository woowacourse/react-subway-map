import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';

import { useCookie, useRouter } from '.';
import { login, clearLoginFail, logout, clearLogout } from './../redux/userSlice';
import { LOGIN, LOGOUT } from './../constants';

export const useLogin = () => {
  const { goToHome, goToLogin } = useRouter();
  const { setAccessTokenInCookie, removeAccessTokenFromCookie, endpoint } = useCookie();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const { isLogin, isLoginFail, accessToken, isLogout } = useSelector((store) => store.user);

  const requestLogin = ({ email, password }) => {
    dispatch(
      login({
        endpoint,
        email,
        password,
      }),
    );
  };

  const goToAllowedPage = () => {
    if (isLogin) {
      goToHome();
      setAccessTokenInCookie(accessToken);
    } else {
      goToLogin();
      dispatch(clearLoginFail());
      dispatch(clearLogout());
    }
  };

  const notifyLoginResult = () => {
    if (isLogin) {
      enqueueSnackbar(LOGIN.SUCCEED, { autoHideDuration: 1500 });
    }
    if (isLoginFail) {
      enqueueSnackbar(LOGIN.FAIL, { variant: 'error', autoHideDuration: 1500 });
    }
  };

  const requestLogout = () => {
    dispatch(logout());
  };

  const notifyLogoutResult = () => {
    if (isLogout) {
      enqueueSnackbar(LOGOUT.SUCCEED, { autoHideDuration: 1500 });
    }
  };

  const removeToken = () => {
    removeAccessTokenFromCookie();
  };

  return {
    isLogin,
    isLoginFail,
    accessToken,
    requestLogin,
    goToAllowedPage,
    notifyLoginResult,

    isLogout,
    requestLogout,
    removeToken,
    notifyLogoutResult,
  };
};
