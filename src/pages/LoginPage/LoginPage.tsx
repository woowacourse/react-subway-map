import { FormEventHandler, useState, useContext } from 'react';
import { MdEmail, MdLock } from 'react-icons/md';
import { Redirect, useHistory } from 'react-router-dom';

import { Box, Button, Input, InputContainer } from '../../components/shared';

import { UserContext } from '../../contexts/UserContextProvider';
import { ThemeContext } from '../../contexts/ThemeContextProvider';
import { SnackBarContext } from '../../contexts/SnackBarProvider';

import PATH from '../../constants/path';
import STATUS_CODE from '../../constants/statusCode';
import PALETTE from '../../constants/palette';
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from '../../constants/messages';

import useInput from '../../hooks/useInput';
import apiRequest from '../../request';
import { PageProps } from '../types';
import { Icon, SignUpLink, Heading1, ErrorText, Form } from './LoginPage.style';

const LoginPage = ({ setIsLoading }: PageProps) => {
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');
  const [error, setError] = useState('');

  const history = useHistory();
  const themeColor = useContext(ThemeContext)?.themeColor ?? PALETTE.WHITE;
  const addMessage = useContext(SnackBarContext)?.addMessage;
  const { isLoggedIn, setIsLoggedIn } = useContext(UserContext) ?? {};

  if (isLoggedIn) {
    return <Redirect to={PATH.ROOT} />;
  }

  const onLogin: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    if (email === '' || password === '') {
      setError(ERROR_MESSAGE.INCOMPLETE_LOGIN_FORM);

      return;
    }

    const timer = setTimeout(() => setIsLoading(true), 500);

    try {
      const accessToken = await apiRequest.login({ email, password });

      addMessage?.(SUCCESS_MESSAGE.LOGIN);
      setIsLoggedIn?.(true);
      localStorage.setItem('accessToken', accessToken);

      history.push(PATH.ROOT);
    } catch (error) {
      console.error(error);

      if (error.message === STATUS_CODE.UNAUTHORIZED) {
        setError(ERROR_MESSAGE.LOGIN);
        return;
      }

      addMessage?.(ERROR_MESSAGE.DEFAULT);
    } finally {
      clearTimeout(timer);
      setIsLoading(false);
    }
  };

  return (
    <Box hatColor={themeColor} backgroundColor={PALETTE.WHITE}>
      <Heading1>로그인</Heading1>
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
        <ErrorText>{error}</ErrorText>
        <Button size="m" width="100%" backgroundColor={themeColor} color={PALETTE.WHITE}>
          로그인
        </Button>
        <SignUpLink to={PATH.SIGNUP}>아직 회원이 아니신가요?</SignUpLink>
      </Form>
    </Box>
  );
};

export default LoginPage;
