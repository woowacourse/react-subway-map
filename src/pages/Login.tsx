import Button from '@shared/Button/Button';
import Container from '@shared/Container/Container';
import Input from '@shared/Input/Input';
import React from 'react';
import mailImg from 'assets/images/mail.png';
import lockImg from 'assets/images/lock.png';
import Title from '@shared/Title/Title';
import PATH from 'constants/PATH';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <Container>
      <Title className="mb-10 mt-6" text="로그인" />
      <Input className="mb-4" imgUrl={mailImg} placeholder="이메일을 입력해주세요" />
      <Input className="mb-8" imgUrl={lockImg} placeholder="비밀번호를 입력해주세요" />
      <Button className="mb-4 p-2" text="로그인" size="w-full" />
      <Link to={PATH.SIGN_UP}>
        <div className="text-l text-center text-black text-opacity-50">아직 회원이 아니신가요?</div>
      </Link>
    </Container>
  );
};

export default Login;
