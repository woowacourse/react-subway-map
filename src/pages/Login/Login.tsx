import React, { FormEventHandler, useState } from 'react';
import { useHistory } from 'react-router';
import { requestLogin } from '../../api/member';
import CardTemplate from '../../components/@common/CardTemplate/CardTemplate';
import Email from '../../components/@common/Icon/Email';
import Lock from '../../components/@common/Icon/Lock';
import Input from '../../components/@common/Input/Input';
import { PAGE_INFO } from '../../constants/appInfo';
import { ERROR_MESSAGE } from '../../constants/message';
import useThemeColor from '../../hooks/useThemeColor/useThemeColor';
import { login } from '../../redux/loginSlice';
import { useAppDispatch } from '../../redux/store';
import {
  LoginButton,
  LoginContainer,
  LoginErrorMessage,
  LoginForm,
  SignupLink,
} from './Login.styles';

const Login = (): JSX.Element => {
  const themeColor = useThemeColor();
  const dispatch = useAppDispatch();
  const history = useHistory();
  const [errorMessage, setErrorMessage] = useState('');

  const onLogin: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    const currentTarget = event.currentTarget;

    const loginInfo = {
      email: currentTarget.email.value,
      password: currentTarget.password.value,
    };

    try {
      const response = await requestLogin(loginInfo);
      dispatch(login(response.data.accessToken));

      history.push(PAGE_INFO.STATIONS.path);
    } catch (error) {
      setErrorMessage(ERROR_MESSAGE.LOGIN_FAILURE);
    }
  };

  return (
    <CardTemplate templateColor={themeColor[400]} titleText={PAGE_INFO.LOGIN.text}>
      <LoginContainer>
        <LoginForm onSubmit={onLogin} role="form">
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
