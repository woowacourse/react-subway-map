import { Link } from 'react-router-dom';
import { MdEmail, MdLock } from 'react-icons/md';

import Box from '../../components/shared/Box/Box';
import Button from '../../components/shared/Button/Button';
import Input from '../../components/shared/Input/Input';
import InputContainer from '../../components/shared/InputContainer/InputContainer';
import PATH from '../../constants/path';
import { Icon, SignUpLink, Heading1 } from './LoginPage.style';

const LoginPage = () => {
  return (
    <Box hatColor="#0dd273" backgroundColor="#ffffff">
      <Heading1>로그인</Heading1>
      <form>
        <InputContainer>
          <Icon>
            <MdEmail />
          </Icon>
          <Input type="email" placeholder="이메일을 입력하세요" />
        </InputContainer>
        <InputContainer>
          <Icon>
            <MdLock />
          </Icon>
          <Input type="password" placeholder="비밀번호를 입력하세요" />
        </InputContainer>
        <Button size="m" width="100%" backgroundColor="#0dd273" color="#ffffff">
          로그인
        </Button>
        <SignUpLink to={PATH.SIGNUP}>아직 회원이 아니신가요?</SignUpLink>
      </form>
    </Box>
  );
};

export default LoginPage;
