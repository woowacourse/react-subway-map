import Button from '@shared/Button/Button';
import Container from '@shared/Container/Container';
import Input from '@shared/Input/Input';
import React from 'react';
import mailImg from 'assets/images/mail.png';
import lockImg from 'assets/images/lock.png';
import Title from '@shared/Title/Title';
import PATH from 'constants/PATH';
import { Link } from 'react-router-dom';
import ImageButton from '@shared/ImageButton/ImageButton';
import kodaImg from 'assets/images/koda.png';
import pkImg from 'assets/images/pk.png';
import rokiImg from 'assets/images/roki.png';
import wedgeImg from 'assets/images/wedge.png';

const Login = () => {
  return (
    <Container>
      <Title className="mb-10 mt-6" text="로그인" />
      <Input className="mb-4" imgUrl={mailImg} placeholder="이메일을 입력해주세요" />
      <Input className="mb-8" imgUrl={lockImg} placeholder="비밀번호를 입력해주세요" />
      <div className="flex justify-center mb-8">
        <ImageButton className="mx-4" imgSize="w-10" imgUrl={kodaImg} bgColor="" />
        <ImageButton className="mx-4" imgSize="w-10" imgUrl={pkImg} bgColor="" />
        <ImageButton className="mx-4" imgSize="w-10" imgUrl={wedgeImg} bgColor="" />
        <ImageButton className="mx-4" imgSize="w-10" imgUrl={rokiImg} bgColor="" />
      </div>
      <Button className="mb-4 p-2 shadow-md" text="로그인" size="w-full" />
      <Link to={PATH.SIGN_UP}>
        <div className="text-l text-center text-black text-opacity-50">아직 회원이 아니신가요?</div>
      </Link>
    </Container>
  );
};

export default Login;
