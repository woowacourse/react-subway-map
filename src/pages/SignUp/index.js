import React from 'react';

import { ButtonSquare, IconLock, IconMail, IconPerson, Input, Section } from '../../components';
import { COLOR, ROUTE } from '../../constants';
import useSignUp from '../../hooks/useSignUp';
import { Anchor, Form, InputWrapper, Message } from './style';

export const SignUpPage = () => {
  const {
    email,
    age,
    password,
    emailMessage,
    ageMessage,
    passwordMessage,
    isValidSignup,
    handleSignUpFormSubmit,
    handleEmailInput,
    handleAgeInput,
    handlePasswordInput,
  } = useSignUp();

  return (
    <Section heading="회원가입">
      <Form onSubmit={handleSignUpFormSubmit}>
        <InputWrapper>
          <Input
            type="email"
            name="email"
            value={email}
            icon={<IconMail />}
            onChange={handleEmailInput}
            placeholder="이메일을 입력해주세요"
          />
          <Message>{emailMessage}</Message>
        </InputWrapper>
        <InputWrapper>
          <Input
            type="number"
            name="age"
            min="1"
            max="200"
            value={age}
            icon={<IconPerson color={COLOR.ICON_DEFAULT} />}
            onChange={handleAgeInput}
            placeholder="나이를 입력해주세요"
          />
          <Message>{ageMessage}</Message>
        </InputWrapper>
        <InputWrapper>
          <Input
            type="password"
            name="password"
            value={password}
            icon={<IconLock />}
            onChange={handlePasswordInput}
            placeholder="비밀번호를 입력해주세요"
          />
          <Message>{passwordMessage}</Message>
        </InputWrapper>
        <ButtonSquare disabled={!isValidSignup}>회원가입</ButtonSquare>
        <Anchor to={ROUTE.LOGIN}>이미 회원이신가요?</Anchor>
      </Form>
    </Section>
  );
};
