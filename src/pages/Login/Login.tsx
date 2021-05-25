import React, { FC, FormEvent, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { requestLogin } from '../../api/member';
import CardTemplate from '../../components/@common/CardTemplate/CardTemplate';
import Email from '../../components/@common/Icon/Email';
import Lock from '../../components/@common/Icon/Lock';
import Input from '../../components/@common/Input/Input';
import { API_INFO } from '../../constants/api';
import { PAGE_INFO, THEME_COLOR } from '../../constants/appInfo';
import { ERROR_MESSAGE } from '../../constants/message';
import { SESSION_STORAGE_KEY } from '../../constants/storage';
import { RootState } from '../../redux/store';
import { setSessionStorageItem } from '../../storage/sessionStorage';
import {
  LoginButton,
  LoginContainer,
  LoginErrorMessage,
  LoginForm,
  SignupLink,
} from './Login.styles';

interface LoginFormTarget extends EventTarget {
  email: HTMLInputElement;
  password: HTMLInputElement;
}

const Login: FC = () => {
  const apiOwner = useSelector((state: RootState) => state.api.owner);
  const history = useHistory();
  const [errorMessage, setErrorMessage] = useState('');

  const onLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const loginInfo = {
      email: (event.target as LoginFormTarget).email.value,
      password: (event.target as LoginFormTarget).password.value,
    };

    try {
      const response = await requestLogin(loginInfo, API_INFO[apiOwner as string].endPoint);

      setSessionStorageItem(SESSION_STORAGE_KEY.ACCESS_TOKEN, response.data.accessToken);
      history.push(PAGE_INFO.STATIONS.path);
    } catch (error) {
      setErrorMessage(ERROR_MESSAGE.LOGIN_FAILURE);
    }
  };

  return (
    <CardTemplate templateColor={THEME_COLOR[400]} titleText={PAGE_INFO.LOGIN.text}>
      <LoginContainer>
        <LoginForm onSubmit={onLogin}>
          <Input
            type="email"
            name="email"
            labelIcon={<Email />}
            placeholder="이메일을 입력해주세요."
          />
          <Input
            type="password"
            name="password"
            labelIcon={<Lock />}
            placeholder="비밀번호를 입력해주세요."
            minLength={6}
            maxLength={20}
          />
          {errorMessage && <LoginErrorMessage>{errorMessage}</LoginErrorMessage>}
          <LoginButton isColored={true}>로그인</LoginButton>
        </LoginForm>
        <SignupLink to={PAGE_INFO.SIGN_UP.path}>아직 회원이 아니신가요?</SignupLink>
      </LoginContainer>
    </CardTemplate>
  );
};

export default Login;
