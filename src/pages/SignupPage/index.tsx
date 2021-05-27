import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import CardLayout from 'components/CardLayout/CardLayout';
import Input from 'components/shared/Input/Input';
import TextButton from 'components/shared/TextButton/TextButton';
import Notification from 'components/shared/Notification/Notification';
import { ButtonSize, ButtonType } from 'types';
import ROUTE from 'constants/routes';
import { API_STATUS } from 'constants/api';
import { NOTIFICATION } from 'constants/messages';
import Styled from './styles';
import { requestSignup } from 'request/auth';

const SignupPage = () => {
  const [email, setEmail] = useState<string>('');
  const [age, setAge] = useState<number>();
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const [passwordNotification, setPasswordNotification] = useState({
    message: '',
    isValid: false,
    isVisible: false,
  });

  const history = useHistory();

  const signup = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!checkPasswordMatch()) return;

    const signupData = { email, password, age: 0 };
    const res = await requestSignup(signupData);

    if (res.status === API_STATUS.REJECTED) {
      alert(res.message);
    } else if (res.status === API_STATUS.FULFILLED) {
      history.push(ROUTE.LOGIN);
    }
  };

  const checkPasswordMatch = () => {
    if (password !== confirmPassword) {
      setPasswordNotification({
        message: NOTIFICATION.DISMATCH_PASSWORD,
        isValid: false,
        isVisible: true,
      });
      return false;
    } else {
      setPasswordNotification({
        message: NOTIFICATION.MATCH_PASSWORD,
        isValid: true,
        isVisible: true,
      });
      return true;
    }
  };

  return (
    <CardLayout title="회원가입">
      <form onSubmit={signup}>
        <Styled.InputContainer>
          <Styled.InputWrapper>
            <Input
              type="email"
              labelText="이메일"
              placeholder="이메일을 입력해주세요."
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </Styled.InputWrapper>
          <Styled.InputWrapper>
            <Input
              type="number"
              labelText="나이"
              placeholder="나이를 입력해주세요."
              value={age}
              onChange={(event) => setAge(Number(event.target.value))}
              extraArgs={{ min: '1' }}
            />
          </Styled.InputWrapper>
          <Styled.InputWrapper>
            <Input
              type="password"
              labelText="비밀번호"
              placeholder="비밀번호를 입력해주세요."
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              extraArgs={{ minLength: 6 }}
            />
          </Styled.InputWrapper>
          <Styled.InputWrapper>
            <Input
              type="password"
              labelText="비밀번호 확인"
              placeholder="비밀번호를 한번 더 입력해주세요."
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              onBlur={checkPasswordMatch}
              extraArgs={{ minLength: 6 }}
            />
            <Notification
              message={passwordNotification.message}
              isValid={passwordNotification.isValid}
              isVisible={passwordNotification.isVisible}
            />
          </Styled.InputWrapper>
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
