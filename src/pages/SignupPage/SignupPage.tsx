import { useContext, KeyboardEventHandler } from 'react';
import { MdEmail, MdLock, MdPerson } from 'react-icons/md';
import { Redirect } from 'react-router-dom';

import { Box, Button, Input, Icon, InputContainer, Heading1 } from '../../components/shared';

import { UserContext } from '../../contexts/UserContextProvider';
import { ThemeContext } from '../../contexts/ThemeContextProvider';

import { SIGNUP_VALUE } from '../../constants/values';
import PATH from '../../constants/path';
import PALETTE from '../../constants/palette';

import useSignupFrom from '../../hooks/useSignupForm';
import { Form } from './SignupPage.style';

const onKeydownWithCapsLock: KeyboardEventHandler<HTMLInputElement> = (event) => {
  const el = event.target as HTMLInputElement;

  if (event.getModifierState('CapsLock')) {
    el.setCustomValidity('CapsLock이 켜져 있습니다.');
    el.reportValidity();
  } else {
    el.setCustomValidity('');
  }
};

const SignupPage = () => {
  const { formValue, handler, validation } = useSignupFrom();
  const { email, age, password, passwordConfirm } = formValue;
  const { onEmailChange, onAgeChange, onPasswordChange, onPasswordConfirmChange, onSignup } =
    handler;

  const themeColor = useContext(ThemeContext)?.themeColor ?? PALETTE.WHITE;
  const isLoggedIn = useContext(UserContext)?.isLoggedIn;

  return isLoggedIn ? (
    <Redirect to={PATH.ROOT} />
  ) : (
    <Box hatColor={themeColor} backgroundColor={PALETTE.WHITE}>
      <Heading1 marginBottom="2rem">회원가입</Heading1>
      <Form onSubmit={onSignup}>
        <InputContainer validation={validation.email}>
          <Icon>
            <MdEmail />
          </Icon>
          <Input
            type="email"
            placeholder="이메일을 입력하세요"
            value={email}
            onChange={onEmailChange}
            autoComplete="off"
            aria-label="이메일 입력"
          />
        </InputContainer>
        <InputContainer validation={validation.age}>
          <Icon>
            <MdPerson />
          </Icon>
          <Input
            type="text"
            placeholder="나이를 입력하세요"
            maxLength={SIGNUP_VALUE.AGE_MAX_LENGTH}
            value={age}
            onChange={onAgeChange}
            autoComplete="off"
            aria-label="나이 입력"
          />
        </InputContainer>
        <InputContainer validation={validation.password}>
          <Icon>
            <MdLock />
          </Icon>
          <Input
            type="password"
            placeholder="비밀번호를 입력하세요"
            value={password}
            onChange={onPasswordChange}
            onKeyDown={onKeydownWithCapsLock}
            autoComplete="off"
            aria-label="비밀번호 입력"
          />
        </InputContainer>
        <InputContainer validation={validation.passwordConfirm}>
          <Icon>
            <MdLock />
          </Icon>
          <Input
            type="password"
            placeholder="비밀번호를 한번 더 입력하세요"
            value={passwordConfirm}
            onChange={onPasswordConfirmChange}
            onKeyDown={onKeydownWithCapsLock}
            autoComplete="off"
            aria-label="비밀번호 확인 입력"
          />
        </InputContainer>
        <Button
          size="m"
          width="100%"
          backgroundColor={themeColor}
          color={PALETTE.WHITE}
          disabled={!validation.form.isValid}
        >
          회원가입
        </Button>
      </Form>
    </Box>
  );
};

export default SignupPage;
