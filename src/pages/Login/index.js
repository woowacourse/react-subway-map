import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { PropTypes } from 'prop-types';

import { useLogin } from '../../hooks';
import { Section, Input, IconMail, IconLock, ButtonSquare } from '../../components';
import { Form, Anchor } from './style';
import { ROUTE } from '../../constants';

export const LoginPage = (props) => {
  const { endpoint } = props;
  const { requestLogin, goToAllowedPage, notifyLoginResult } = useLogin();
  const { isLogin, isLoginFail } = useSelector((store) => store.user);

  const handleLoginFormSubmit = (e) => {
    e.preventDefault();
    requestLogin({
      endpoint,
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

LoginPage.propTypes = {
  endpoint: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
};
