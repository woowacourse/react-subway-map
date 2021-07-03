import { FormEventHandler, useState, useContext } from 'react';
import { MdEmail, MdLock } from 'react-icons/md';
import { Redirect, useHistory } from 'react-router-dom';

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
import { SnackBarContext } from '../../contexts/SnackBarProvider';

import PATH from '../../constants/path';
import PALETTE from '../../constants/palette';

import api from '../../apis';
import useInput from '../../hooks/useInput';
import { SignUpLink, Form } from './LoginPage.style';
import { ERROR_MESSAGE } from '../../constants/messages';
import { LoadingContext } from '../../contexts/LoadingContext';

const LoginPage = () => {
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');
  const [error, setError] = useState('');

  const history = useHistory();

  const themeColor = useContext(ThemeContext)?.themeColor ?? PALETTE.WHITE;
  const addMessage = useContext(SnackBarContext)?.addMessage;
  const { isLoggedIn, setIsLoggedIn } = useContext(UserContext) ?? {};
  const callWithLoading = useContext(LoadingContext)?.callWithLoading;

  const onLogin: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    if (email === '' || password === '') {
      setError(ERROR_MESSAGE.INCOMPLETE_LOGIN_FORM);

      return;
    }

    callWithLoading?.(async () => {
      const { isSucceeded, message, result } = await api.user.login({ email, password });

      addMessage?.(message);
      setIsLoggedIn?.(isSucceeded);

      if (isSucceeded) {
        localStorage.setItem('accessToken', result);
        history.push(PATH.ROOT);
      }
    });
  };

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
        <ErrorText textAlign="center">{error}</ErrorText>
        <Button size="m" width="100%" backgroundColor={themeColor} color={PALETTE.WHITE}>
          로그인
        </Button>
        <SignUpLink to={PATH.SIGNUP}>아직 회원이 아니신가요?</SignUpLink>
      </Form>
    </Box>
  );
};

export default LoginPage;
