import { useContext } from 'react';
import { MdEmail, MdLock } from 'react-icons/md';
import { Redirect } from 'react-router-dom';

import {
  Box,
  Button,
  Input,
  InputContainer,
  Heading1,
  Icon,
  ErrorText,
} from '../../components/shared';

import { UserContext } from '../../contexts/UserContextProvider';
import { ThemeContext } from '../../contexts/ThemeContextProvider';

import PATH from '../../constants/path';
import PALETTE from '../../constants/palette';

import { SignUpLink, Form } from './LoginPage.style';
import useLoginForm from '../../hooks/useLoginForm';

const LoginPage = () => {
  const { formValue, handler, loginErrorMessage } = useLoginForm();
  const { email, password } = formValue;
  const { onEmailChange, onPasswordChange, onLogin } = handler;

  const themeColor = useContext(ThemeContext)?.themeColor ?? PALETTE.WHITE;
  const { isLoggedIn } = useContext(UserContext) ?? {};

  return isLoggedIn ? (
    <Redirect to={PATH.ROOT} />
  ) : (
    <Box hatColor={themeColor} backgroundColor={PALETTE.WHITE}>
      <Heading1 marginBottom="2rem">로그인</Heading1>
      <Form onSubmit={onLogin}>
        <InputContainer>
          <Icon>
            <MdEmail />
          </Icon>
          <Input
            type="text"
            placeholder="이메일을 입력하세요"
            value={email}
            onChange={onEmailChange}
            autoComplete="on"
            aria-label="이메일"
          />
        </InputContainer>
        <InputContainer>
          <Icon>
            <MdLock />
          </Icon>
          <Input
            type="password"
            placeholder="비밀번호를 입력하세요"
            value={password}
            onChange={onPasswordChange}
            aria-label="비밀번호"
          />
        </InputContainer>
        <ErrorText textAlign="center">{loginErrorMessage}</ErrorText>
        <Button size="m" width="100%" backgroundColor={themeColor} color={PALETTE.WHITE}>
          로그인
        </Button>
        <SignUpLink to={PATH.SIGNUP}>아직 회원이 아니신가요?</SignUpLink>
      </Form>
    </Box>
  );
};

export default LoginPage;
