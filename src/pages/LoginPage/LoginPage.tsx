import { FormEventHandler, useState, useContext } from 'react';
import { MdEmail, MdLock } from 'react-icons/md';
import { useHistory } from 'react-router-dom';

import useInput from '../../hooks/useInput';
import Box from '../../components/shared/Box/Box';
import Button from '../../components/shared/Button/Button';
import Input from '../../components/shared/Input/Input';
import InputContainer from '../../components/shared/InputContainer/InputContainer';
import PATH from '../../constants/path';
import PALETTE from '../../constants/palette';
import { Icon, SignUpLink, Heading1, ErrorText, Form } from './LoginPage.style';
import { ThemeContext } from '../../contexts/ThemeContextProvider';

const LoginPage = () => {
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');
  const [error, setError] = useState('');

  const history = useHistory();
  const themeColor = useContext(ThemeContext)?.themeColor ?? PALETTE.WHITE;

  const onLogin: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    if (email === '' || password === '') {
      setError('이메일, 비밀번호를 입력하세요');

      return;
    }

    // server에 login요청
    // 정상동작
    history.push(PATH.ROOT);
    // 에러동작
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
