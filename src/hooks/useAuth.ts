import { useSnackbar } from 'notistack';
import { useAppDispatch, useAppSelector } from './useStore';
import { requestLogin, logout, resetError } from '../slices/authSlice';
import { ApiStatus, CREWS } from '../types';
import MESSAGE from '../constants/message';
import REGEX from '../constants/regex';
import { LOGIN } from '../constants/validation';

const useAuth = () => {
  const { enqueueSnackbar } = useSnackbar();

  const auth = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const { accessToken, isLogin, server, error } = auth;

  const onLogin = async (currentServer: CREWS, form: { email: string; password: string }) => {
    if (!new RegExp(REGEX.isEmail).test(form.email)) {
      enqueueSnackbar(MESSAGE.ERROR.INVALID_EMAIL);

      return;
    }

    if (form.password.length < LOGIN.MIN_PASSWORD_LENGTH) {
      enqueueSnackbar(MESSAGE.ERROR.INVALID_PASSWORD);

      return;
    }

    const response = await dispatch(requestLogin({ server: currentServer, form }));

    if (response.meta.requestStatus === ApiStatus.REJECTED) return;

    enqueueSnackbar(MESSAGE.SUCCESS.LOGIN);
  };

  const onLogout = () => {
    dispatch(logout());
  };

  const showErrorMessage = () => {
    enqueueSnackbar(error?.message || MESSAGE.ERROR.LOGIN_FAILURE, {
      variant: 'error',
    });

    dispatch(resetError());
  };

  return {
    onLogin,
    onLogout,
    showErrorMessage,
    isLogin,
    isError: !!error,
    accessToken,
    server,
  };
};

export default useAuth;
