import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/userSlice';

import { Section, Input, IconMail, IconLock, ButtonSquare } from '../../components';
import { Form, Anchor } from './style';
import { ROUTE } from '../../constants';

export const LoginPage = (props) => {
  const { server } = props;

  const history = useHistory();
  const dispatch = useDispatch();
  const { isLoginSuccess } = useSelector((store) => store.user);

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (isLoginSuccess) {
      history.push(ROUTE.STATION);
    }
  }, [isLoginSuccess]);

  const handleLogin = (e) => {
    e.preventDefault();

    dispatch(
      login({
        endpoint: server.endpoint,
        email: e.target.email.value,
        password: e.target.password.value,
      }),
    );
  };

  return (
    <Section heading="로그인">
      <Form onSubmit={handleLogin}>
        <Input type="email" name="email" icon={<IconMail />} placeholder="이메일을 입력해주세요" />
        <Input type="password" name="password" icon={<IconLock />} placeholder="비밀번호를 입력해주세요" />
        <ButtonSquare>로그인</ButtonSquare>
        <Anchor to={ROUTE.SING_UP}>아직 회원이 아니신가요?</Anchor>
      </Form>
    </Section>
  );
};
