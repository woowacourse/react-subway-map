import React from 'react';
import CardLayout from 'components/CardLayout/CardLayout';
import Input from 'components/shared/Input/Input';
import TextButton from 'components/shared/TextButton/TextButton';
import { ButtonSize, ButtonType } from 'types';
import Styled from './styles';

const SignupPage = () => {
  return (
    <CardLayout title="회원가입">
      <Styled.InputContainer>
        <Input type="email" labelText="이메일" placeholder="이메일을 입력해주세요." />
        <Input
          type="number"
          labelText="나이"
          placeholder="나이를 입력해주세요."
          extraArgs={{ min: '1' }}
        />
        <Input type="password" labelText="비밀번호" placeholder="비밀번호를 입력해주세요." />
        <Input
          type="password"
          labelText="비밀번호 확인"
          placeholder="비밀번호를 한번 더 입력해주세요."
        />
      </Styled.InputContainer>

      <Styled.ButtonWrapper>
        <TextButton
          text="회원가입하기"
          styleType={ButtonType.FILLED}
          sizeType={ButtonSize.LARGE}
        ></TextButton>
      </Styled.ButtonWrapper>
    </CardLayout>
  );
};

export default SignupPage;
