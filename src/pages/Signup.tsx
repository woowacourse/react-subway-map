import Button from '@shared/Button/Button';
import Container from '@shared/Container/Container';
import Input from '@shared/Input/Input';
import React from 'react';
import mailImg from 'assets/images/mail.png';
import lockImg from 'assets/images/lock.png';
import personImg from 'assets/images/person.png';
import Title from '@shared/Title/Title';

const Signup = () => {
  return (
    <Container>
      <Title className="mb-10 mt-6" text="회원가입" />
      <Input className="mb-4" imgUrl={mailImg} placeholder="이메일을 입력해주세요" />
      <Input className="mb-4" imgUrl={personImg} placeholder="나이를 입력해주세요" />
      <Input className="mb-4" imgUrl={lockImg} placeholder="비밀번호를 입력해주세요" />
      <Input className="mb-8" imgUrl={lockImg} placeholder="비밀번호를 한번 더 입력해주세요" />
      <Button className="mb-4 p-2" text="회원가입" size="w-full" />
    </Container>
  );
};

export default Signup;
