import React from 'react';
import { useAppSelector } from 'modules/hooks';
import { User } from 'types';
import Styled from './styles';

const LandingPage = () => {
  const user: User | undefined = useAppSelector((state) => state.authSlice.data);

  return (
    <Styled.Container>
      {user ? <h1>환영합니다. {user.email}님</h1> : <h1>로그인 해주세요</h1>}
    </Styled.Container>
  );
};

export default LandingPage;
