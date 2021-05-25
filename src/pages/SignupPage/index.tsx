import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import CardLayout from 'components/CardLayout/CardLayout';
import Input from 'components/shared/Input/Input';
import TextButton from 'components/shared/TextButton/TextButton';
import { ButtonSize, ButtonType } from 'types';
import Styled from './styles';
import useFetch from 'hooks/useFetch';
import ROUTE from 'constants/routes';
import { API_STATUS, END_POINT } from 'constants/api';

const SignupPage = () => {
  const [email, setEmail] = useState<string>('');
  const [age, setAge] = useState<number>();
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const history = useHistory();
  const { fetchData: signupAsync } = useFetch<null>();

  const signup = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const signupData = { email, password, age };
    const res = await signupAsync('POST', END_POINT.AUTH, signupData);

    if (res.status === API_STATUS.REJECTED) {
      alert(res.error);
    } else if (res.status === API_STATUS.FULFILLED) {
      history.push(ROUTE.LOGIN);
    }
  };

  return (
    <CardLayout title="회원가입">
      <form onSubmit={signup}>
        <Styled.InputContainer>
          <Input
            type="email"
            labelText="이메일"
            placeholder="이메일을 입력해주세요."
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <Input
            type="number"
            labelText="나이"
            placeholder="나이를 입력해주세요."
            extraArgs={{ min: '1' }}
            value={age}
            onChange={(event) => setAge(Number(event.target.value))}
          />
          <Input
            type="password"
            labelText="비밀번호"
            placeholder="비밀번호를 입력해주세요."
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <Input
            type="password"
            labelText="비밀번호 확인"
            placeholder="비밀번호를 한번 더 입력해주세요."
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
          />
        </Styled.InputContainer>

        <Styled.ButtonWrapper>
          <TextButton
            text="회원가입하기"
            styleType={ButtonType.FILLED}
            sizeType={ButtonSize.LARGE}
          ></TextButton>
        </Styled.ButtonWrapper>
      </form>
    </CardLayout>
  );
};

export default SignupPage;
