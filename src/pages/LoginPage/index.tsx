import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import CardLayout from 'components/CardLayout/CardLayout';
import Input from 'components/shared/Input/Input';
import Button from 'components/shared/Button/Button';
import ServerSelector from 'components/ServerSelector/ServerSelector';
import Loading from 'components/shared/Loading/Loading';
import { ButtonSize, ButtonType } from 'types';
import { requestGetUser } from 'modules/authSlice';
import { useAppDispatch, useAppSelector } from 'modules/hooks';
import { selectServer } from 'modules/serverSlice';
import emailImg from 'assets/email.png';
import lockImg from 'assets/lock.png';
import {
  ALERT_MESSAGE,
  API_METHOD,
  API_STATUS,
  END_POINT,
  ROUTE,
  SESSION_STORAGE,
} from '../../constants';
import useFetch from 'hooks/useFetch';
import Styled from './styles';
import useNotify from 'hooks/useNotify';

const LoginPage = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const BASE_URL = useAppSelector((state) => state.serverSlice.server);

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loginResponse, setLoginResponse] = useState<{ accessToken: string }>();
  const [isServerMessageVisible, setServerMessageVisible] = useState<boolean>(false);

  const { fetchData: loginAsync, loading: loginLoading } = useFetch(API_METHOD.POST);
  const { setNotification: setLoginNotification, Notification: LoginNotification } = useNotify();

  const { enqueueSnackbar } = useSnackbar();

  const login = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const loginData = { email, password };

    if (!BASE_URL) {
      setServerMessageVisible(true);
      return;
    }

    const res = await loginAsync(END_POINT.LOGIN, loginData);

    if (res.status === API_STATUS.REJECTED) {
      setLoginNotification({
        message: res.message || ALERT_MESSAGE.SERVER_ERROR,
        isValid: false,
        isVisible: true,
      });
    } else if (res.status === API_STATUS.FULFILLED) {
      setLoginNotification({ message: '', isValid: true, isVisible: false });
      setLoginResponse(res.data);
      enqueueSnackbar(ALERT_MESSAGE.SUCCESS_TO_LOGIN);

      history.push(ROUTE.STATIONS);
    }
  };

  const changeServer = (server: string) => {
    dispatch(selectServer({ server }));
    setServerMessageVisible(false);
  };

  useEffect(() => {
    if (loginResponse) {
      sessionStorage.setItem(
        SESSION_STORAGE.KEY.ACCESS_TOKEN,
        JSON.stringify(loginResponse.accessToken),
      );
      sessionStorage.setItem(SESSION_STORAGE.KEY.SERVER, JSON.stringify(BASE_URL));

      dispatch(requestGetUser(loginResponse.accessToken));
    }
  }, [loginResponse]);

  return (
    <CardLayout title="로그인">
      <Loading isLoading={loginLoading} />
      <ServerSelector isMessageVisible={isServerMessageVisible} changeServer={changeServer} />
      <form onSubmit={login}>
        <Styled.InputContainer>
          <Styled.InputWrapper>
            <Input
              type="email"
              labelText="이메일"
              placeholder="이메일을 입력해주세요."
              value={email}
              icon={emailImg}
              onChange={(event) => setEmail(event.target.value)}
            />
          </Styled.InputWrapper>

          <Styled.InputWrapper>
            <Input
              type="password"
              labelText="비밀번호"
              placeholder="비밀번호를 입력해주세요."
              value={password}
              icon={lockImg}
              onChange={(event) => setPassword(event.target.value)}
            />
            <LoginNotification />
          </Styled.InputWrapper>
        </Styled.InputContainer>

        <Styled.ButtonWrapper>
          <Button styleType={ButtonType.YELLOW}>로그인하기</Button>
        </Styled.ButtonWrapper>
      </form>
      <Styled.SignupLink>
        <Link to={ROUTE.SIGNUP}>아직 회원이 아니신가요?</Link>
      </Styled.SignupLink>
    </CardLayout>
  );
};

export default LoginPage;
