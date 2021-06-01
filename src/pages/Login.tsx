import Button from '@shared/Button/Button';
import Container from '@shared/Container/Container';
import Input from '@shared/Input/Input';
import React, { useEffect, useState } from 'react';
import mailImg from 'assets/images/mail.png';
import lockImg from 'assets/images/lock.png';
import Title from '@shared/Title/Title';
import PATH from 'constants/PATH';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginAsync } from 'redux/authSlice';
import ProfileSelector from '@units/ProfileSelector/ProfileSelector';
import axios from 'axios';
import MESSAGE from 'constants/message';
import useData from 'hooks/useData';

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { accessToken } = useData();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setEmail(value);
  };

  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setPassword(value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // TODO: 추상화
    try {
      await dispatch(loginAsync({ email, password }));
      alert(MESSAGE.LOGIN.SUCCESS);

      history.push(PATH.HOME);
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    if (accessToken) {
      axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    }
  }, [accessToken]);

  return (
    <Container>
      <Title className="mb-10 mt-6" text="로그인" />
      <form onSubmit={handleSubmit}>
        <Input
          className="mb-4"
          imgUrl={mailImg}
          placeholder="이메일을 입력해주세요"
          type="email"
          value={email}
          onChange={handleEmail}
        />
        <Input
          className="mb-8"
          imgUrl={lockImg}
          placeholder="비밀번호를 입력해주세요"
          type="password"
          value={password}
          onChange={handlePassword}
        />
        <ProfileSelector />
        <Button className="mb-4 p-2 shadow-md" size="w-full" text="로그인" />
      </form>
      <Link to={PATH.SIGN_UP}>
        <div className="text-l text-center text-black text-opacity-50">아직 회원이 아니신가요?</div>
      </Link>
    </Container>
  );
};

export default Login;
