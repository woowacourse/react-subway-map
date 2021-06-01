import React, { useEffect } from 'react';

import { useLogin } from '../../hooks';
import { Section, Input, IconMail, IconLock, ButtonSquare } from '../../components';
import { Form, Anchor } from './style';
import { ROUTE } from '../../constants';

export const LoginPage = () => {
  const { isLogin, isLoginFail, requestLogin, goToAllowedPage, notifyLoginResult } = useLogin();

  const handleLoginFormSubmit = (e) => {
    e.preventDefault();
    requestLogin({
      email: e.target.email.value,
      password: e.target.password.value,
    });
  };

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    notifyLoginResult();
    goToAllowedPage();
  }, [isLogin, isLoginFail]);

  return (
    <Section heading="로그인">
      <Form onSubmit={handleLoginFormSubmit}>
        <Input type="email" name="email" icon={<IconMail />} placeholder="이메일을 입력해주세요" />
        <Input type="password" name="password" icon={<IconLock />} placeholder="비밀번호를 입력해주세요" />
        <ButtonSquare>로그인</ButtonSquare>
        <Anchor to={ROUTE.SING_UP}>아직 회원이 아니신가요?</Anchor>
      </Form>
    </Section>
  );
};
