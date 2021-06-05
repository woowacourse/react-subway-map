import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useSnackbar } from 'notistack';

import { useAccessToken, useServer } from '.';
import { login, clearLoginFail, logout, clearLogout } from './../redux/userSlice';
import { ROUTE, LOGIN, LOGOUT } from './../constants';

export const useLogin = () => {
  const history = useHistory();
  const { setAccessToken, removeAccessToken } = useAccessToken();
  const { endpoint } = useServer();
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
      history.push(ROUTE.HOME);
      setAccessToken(accessToken);
    } else {
      history.push(ROUTE.LOGIN);
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
    removeAccessToken();
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
