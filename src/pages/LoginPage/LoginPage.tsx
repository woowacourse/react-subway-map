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
import { SnackBarContext } from '../../components/shared/SnackBar/SnackBarProvider';

import PATH from '../../constants/path';
import PALETTE from '../../constants/palette';
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from '../../constants/messages';

import useInput from '../../hooks/useInput';
import { PageProps } from '../types';
import { SignUpLink, Form } from './LoginPage.style';
import ERROR_TYPE from '../../constants/errorType';
import API from '../../apis/user';

const LoginPage = ({ setIsLoading }: PageProps) => {
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');
  const [error, setError] = useState('');

  const history = useHistory();

  const themeColor = useContext(ThemeContext)?.themeColor ?? PALETTE.WHITE_100;
  const addSnackBar = useContext(SnackBarContext)?.pushMessage;
  const isLoggedIn = useContext(UserContext)?.isLoggedIn;
  const setIsLoggedIn = useContext(UserContext)?.setIsLoggedIn;

  if (isLoggedIn) {
    return <Redirect to={PATH.ROOT} />;
  }

  const onLogin: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      setError(ERROR_MESSAGE.INCOMPLETE_LOGIN_FORM);

      return;
    }

    const timer = setTimeout(() => setIsLoading(true), 500);
    const response = await API.login({ email, password });

    if (response.ok) {
      addSnackBar?.(SUCCESS_MESSAGE.LOGIN);
      setIsLoggedIn?.(true);

      localStorage.setItem('accessToken', response.data?.accessToken as string);
      history.push(PATH.ROOT);
    }

    if (!response.ok) {
      if (response.error?.type === ERROR_TYPE.BAD_REQUEST) {
        setError(ERROR_MESSAGE['LOGIN_' + ERROR_TYPE.BAD_REQUEST] || ERROR_MESSAGE.DEFAULT);
        clearTimeout(timer);
        setIsLoading(false);
        return;
      }

      addSnackBar?.(response.error?.message as string);
    }

    clearTimeout(timer);
    setIsLoading(false);
  };

  return (
    <Box hatColor={themeColor} backgroundColor={PALETTE.WHITE_100}>
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
        <Button size="m" width="100%" backgroundColor={themeColor} color={PALETTE.WHITE_100}>
          로그인
        </Button>
        <SignUpLink to={PATH.SIGNUP}>아직 회원이 아니신가요?</SignUpLink>
      </Form>
    </Box>
  );
};

export default LoginPage;
