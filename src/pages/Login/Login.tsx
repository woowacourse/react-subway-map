import React, { VFC, FormEventHandler, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { requestLogin } from '../../API/member';
import CardTemplate from '../../components/@common/CardTemplate/CardTemplate';
import Email from '../../components/@common/Icon/Email';
import Lock from '../../components/@common/Icon/Lock';
import Input from '../../components/@common/Input/Input';
import { LABEL_TEXT } from '../../constants/a11y';
import { API_INFO } from '../../constants/api';
import { PAGE_INFO } from '../../constants/appInfo';
import { ERROR_MESSAGE } from '../../constants/message';
import { login } from '../../redux/slice/loginSlice';
import { RootState, useAppDispatch } from '../../redux/store';
import {
  LoginButton,
  LoginContainer,
  LoginErrorMessage,
  LoginForm,
  SignupLink,
} from './Login.styles';

const Login: VFC = () => {
  const apiOwner = useSelector((state: RootState) => state.api.owner);
  const dispatch = useAppDispatch();
  const history = useHistory();
  const [errorMessage, setErrorMessage] = useState('');

  const onLogin: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    const loginInfo = {
      email: event.currentTarget.email.value,
      password: event.currentTarget.password.value,
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
    <CardTemplate templateColor={API_INFO[apiOwner].themeColor} titleText={PAGE_INFO.LOGIN.text}>
      <LoginContainer>
        <LoginForm onSubmit={onLogin} role="form">
          <Input
            type="email"
            name="email"
            labelIcon={<Email />}
            placeholder={LABEL_TEXT.PLEASE_INPUT_EMAIL}
          />
          <Input
            type="password"
            name="password"
            labelIcon={<Lock />}
            placeholder={LABEL_TEXT.PLEASE_INPUT_PASSWORD}
          />
          {errorMessage && <LoginErrorMessage>{errorMessage}</LoginErrorMessage>}
          <LoginButton isColored={true}>{LABEL_TEXT.LOGIN}</LoginButton>
        </LoginForm>
        <SignupLink to={PAGE_INFO.SIGN_UP.path}>{LABEL_TEXT.ARE_YOU_NOT_MEMBER}</SignupLink>
      </LoginContainer>
    </CardTemplate>
  );
};

export default Login;
