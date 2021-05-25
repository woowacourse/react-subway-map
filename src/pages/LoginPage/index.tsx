import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CardLayout from 'components/CardLayout/CardLayout';
import Input from 'components/shared/Input/Input';
import TextButton from 'components/shared/TextButton/TextButton';
import ROUTE from 'constants/routes';
import { ButtonSize, ButtonType } from 'types';
import Styled from './styles';
import useFetch from 'hooks/useFetch';
import { API_STATUS, END_POINT } from 'constants/api';

const LoginPage = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const { response: accessToken, fetchData: loginAsync } = useFetch<{ accessToken: string }>();

  const login = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const loginData = { email, password };
    const res = await loginAsync('POST', END_POINT.LOGIN, loginData);

    if (res.status === API_STATUS.REJECTED) {
      alert(res.error);
    } else if (res.status === API_STATUS.FULFILLED) {
      console.log(accessToken);
    }
  };

  return (
    <CardLayout title="로그인">
      <form onSubmit={login}>
        <Styled.InputContainer>
          <Input
            type="email"
            labelText="이메일"
            placeholder="이메일을 입력해주세요."
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <Input
            type="password"
            labelText="비밀번호"
            placeholder="비밀번호를 입력해주세요."
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </Styled.InputContainer>

        <Styled.ButtonWrapper>
          <TextButton
            text="로그인하기"
            styleType={ButtonType.FILLED}
            sizeType={ButtonSize.LARGE}
          ></TextButton>
        </Styled.ButtonWrapper>

        <Styled.SignupLink>
          <Link to={ROUTE.SIGNUP}>아직 회원이 아니신가요?</Link>
        </Styled.SignupLink>
      </form>
    </CardLayout>
  );
};

export default LoginPage;
