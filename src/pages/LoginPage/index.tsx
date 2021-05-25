import React from 'react';
import { Link } from 'react-router-dom';
import CardLayout from 'components/CardLayout/CardLayout';
import Input from 'components/shared/Input/Input';
import TextButton from 'components/shared/TextButton/TextButton';
import ROUTE from 'constants/routes';
import { ButtonSize, ButtonType } from 'types';
import Styled from './styles';

const LoginPage = () => {
  return (
    <CardLayout title="로그인">
      <Styled.InputContainer>
        <Input type="email" labelText="이메일" placeholder="이메일을 입력해주세요." />
        <Input type="password" labelText="비밀번호" placeholder="비밀번호를 입력해주세요." />
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
    </CardLayout>
  );
};

export default LoginPage;
