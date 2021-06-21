import React from 'react';

import { ButtonSquare, IconLock, IconMail, Input, Section } from '../../components';
import { ROUTE } from '../../constants';
import { useLogin } from '../../hooks';
import { Anchor, Form } from './style';

export const LoginPage = () => {
  const { handleLogin } = useLogin();

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
