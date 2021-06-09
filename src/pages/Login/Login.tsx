import React, { VFC, FormEventHandler } from 'react';
import CardTemplate from '../../components/@common/CardTemplate/CardTemplate';
import Email from '../../components/@common/Icon/Email';
import Lock from '../../components/@common/Icon/Lock';
import Input from '../../components/@common/Input/Input';
import { LABEL_TEXT } from '../../constants/a11y';
import { PAGE_INFO } from '../../constants/appInfo';
import useCurrentAPIInfo from '../../hooks/@shared/useCurrentAPIInfo/useCurrentAPIInfo';
import useLoginPage from '../../hooks/service/useLoginPage/useLoginPage';
import {
  LoginButton,
  LoginContainer,
  LoginErrorMessage,
  LoginForm,
  SignupLink,
} from './Login.styles';

const Login: VFC = () => {
  const APIInfo = useCurrentAPIInfo();
  const { onLogin, loginErrorMessage } = useLoginPage();

  return (
    <CardTemplate templateColor={APIInfo.themeColor} titleText={PAGE_INFO.LOGIN.text}>
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
          {loginErrorMessage && <LoginErrorMessage>{loginErrorMessage}</LoginErrorMessage>}
          <LoginButton isColored={true}>{LABEL_TEXT.LOGIN}</LoginButton>
        </LoginForm>
        <SignupLink to={PAGE_INFO.SIGN_UP.path}>{LABEL_TEXT.ARE_YOU_NOT_MEMBER}</SignupLink>
      </LoginContainer>
    </CardTemplate>
  );
};

export default Login;
