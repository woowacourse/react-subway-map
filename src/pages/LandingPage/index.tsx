import React from 'react';
import { useAppSelector } from 'modules/hooks';
import { User } from 'types';
import Styled from './styles';
import sandwich from 'assets/sandwich.png';
import cookie from 'assets/cookie.png';

const LandingPage = () => {
  const user: User | undefined = useAppSelector((state) => state.authSlice.data);
  const userName = user?.email.slice(0, user.email.lastIndexOf('@'));

  return (
    <Styled.Container>
      {user ? (
        <>
          <Styled.Image src={cookie} alt="cookie" />
          <Styled.Text>🍪 환영합니다. {userName}님 🍪</Styled.Text>
        </>
      ) : (
        <>
          <Styled.Image src={sandwich} alt="sandwich" />
          <Styled.Text>🥪 로그인 해주세요 🥪</Styled.Text>
        </>
      )}
    </Styled.Container>
  );
};

export default LandingPage;
