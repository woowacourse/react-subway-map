import React, { FC } from 'react';
import CardTemplate from '../../components/@common/CardTemplate/CardTemplate';
import Email from '../../components/@common/Icon/Email';
import Lock from '../../components/@common/Icon/Lock';
import Input from '../../components/@common/Input/Input';
import { PAGE_INFO, THEME_COLOR } from '../../constants/appInfo';
import { LoginButton, LoginContainer, LoginForm, SignupLink } from './Login.styles';

const Login: FC = () => (
  <CardTemplate templateColor={THEME_COLOR[400]} titleText={PAGE_INFO.LOGIN.text}>
    <LoginContainer>
      <LoginForm>
        <Input type="email" labelIcon={<Email />} placeholder="이메일을 입력해주세요." />
        <Input
          type="password"
          labelIcon={<Lock />}
          placeholder="비밀번호를 입력해주세요."
          minLength={6}
          maxLength={20}
        />
        <LoginButton isColored={true} disabled={true}>
          로그인
        </LoginButton>
      </LoginForm>
      <SignupLink to={PAGE_INFO.SIGN_UP.path}>아직 회원이 아니신가요?</SignupLink>
    </LoginContainer>
  </CardTemplate>
);

export default Login;
