import React from 'react';

import { Section, Input, IconMail, IconLock, ButtonSquare } from '../../components';
import { Anchor } from './style';
import { ROUTE } from '../../constants';

export const LoginPage = () => {
  const handleEmailInputChange = () => {};
  const handlePasswordInputChange = () => {};

  return (
    <Section heading="로그인">
      <Input type="email" icon={<IconMail />} onChange={handleEmailInputChange} placeholder="이메일을 입력해주세요" />
      <Input
        type="password"
        icon={<IconLock />}
        onChange={handlePasswordInputChange}
        placeholder="비밀번호를 입력해주세요"
      />
      <ButtonSquare>로그인</ButtonSquare>
      <Anchor to={ROUTE.SING_UP}>아직 회원이 아니신가요?</Anchor>
    </Section>
  );
};
