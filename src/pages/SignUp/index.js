import React from 'react';
// import { Link } from 'react-router-dom';

import { ButtonSquare, IconLock, IconMail, IconPerson, Input, Section } from '../../components';
import { Anchor } from './style';
import { COLOR, ROUTE } from '../../constants';

export const SignUpPage = () => {
  const handleEmailInputChange = () => {};

  return (
    <Section heading="회원가입">
      <Input
        type="email"
        icon={<IconMail />}
        onChange={handleEmailInputChange}
        placeholder="이메일을 입력하주세요"
        message=""
      />
      <Input
        type="number"
        icon={<IconPerson color={COLOR.ICON_DEFAULT} />}
        min="1"
        max="200"
        onChange=""
        placeholder="나이를 입력해주세요"
        message=""
      />
      <Input type="password" icon={<IconLock />} onChange="" placeholder="비밀번호를 입력해주세요" message="" />
      <ButtonSquare>회원가입</ButtonSquare>
      <Anchor to={ROUTE.LOGIN}>이미 회원이신가요?</Anchor>
    </Section>
  );
};
