import { FormEventHandler, useState } from 'react';
import { useHistory } from 'react-router';
import { requestLogin } from '../../../API/member';
import { PAGE_INFO } from '../../../constants/appInfo';
import { ERROR_MESSAGE } from '../../../constants/message';
import { login } from '../../../redux/slice/loginSlice';
import { useAppDispatch } from '../../../redux/store';

interface LoginInfo {
  email: string;
  password: string;
}

type DoLogin = (loginInfo: LoginInfo) => void;

type UseLoginPage = () => {
  onLogin: FormEventHandler<HTMLFormElement>;
  loginErrorMessage: string;
};

const useLoginPage: UseLoginPage = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const [loginErrorMessage, setLoginErrorMessage] = useState('');

  const onLogin: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    doLogin({
      email: event.currentTarget.email.value,
      password: event.currentTarget.password.value,
    });
  };

  const doLogin: DoLogin = async (loginInfo) => {
    try {
      const response = await requestLogin(loginInfo);

      dispatch(login(response.data.accessToken));
      history.push(PAGE_INFO.STATIONS.path);
    } catch (error) {
      setLoginErrorMessage(ERROR_MESSAGE.LOGIN_FAILURE);
    }
  };

  return { onLogin, loginErrorMessage };
};

export default useLoginPage;
