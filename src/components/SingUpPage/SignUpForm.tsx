import Input from '../@commons/Input/Input';
import * as S from './SignUpForm.styles';
import mailSVG from '../../assets/svg/mail.svg';
import userSVG from '../../assets/svg/user.svg';
import lockSVG from '../../assets/svg/lock.svg';
import Button from '../@commons/Button/Button';
import React, { useState } from 'react';
import { BASE_URL, ROUTE } from '../../constants/constant';
import { authAPI } from '../../api/auth';
import { RESPONSE } from '../../constants/api';
import { useHistory } from 'react-router';
import { REGEXP } from '../../constants/regularExpression';

const getEmailErrorMessage = (email: string) => {
  if (!REGEXP.EMAIL.test(email)) {
    return '이메일 형식이 아닙니다.';
  }

  return '';
};

const getAgeErrorMessage = (age: string) => {
  if (isNaN(Number(age))) {
    return '나이는 숫자여야 합니다.';
  }

  if (!(1 <= Number(age) && Number(age) <= 200)) {
    return '나이는 1살 이상 200살 이하여야 합니다.';
  }

  return '';
};

const getPasswordErrorMessage = (password: string) => {
  if (!(4 <= password.length && password.length <= 20)) {
    return '비밀번호는 최소 4글자에서 최대 20 글자여야 합니다.';
  }

  return '';
};

const getConfirmPasswordErrorMessage = (password: string, confirmPassword: string) => {
  if (!(4 <= confirmPassword.length && confirmPassword.length <= 20)) {
    return '비밀번호는 최소 4글자에서 최대 20 글자여야 합니다.';
  }

  if (password !== confirmPassword) {
    return '동일한 비밀번호를 입력해주세요.';
  }

  return '';
};

const SignUpForm = () => {
  const history = useHistory();
  const [userInfo, setUserInfo] = useState({
    email: '',
    age: '',
    password: '',
    confirmPassword: '',
  });

  const emailErrorMessage = getEmailErrorMessage(userInfo.email);
  const ageErrorMessage = getAgeErrorMessage(userInfo.age);
  const passwordErrorMessage = getPasswordErrorMessage(userInfo.password);
  const confirmPasswordErrorMessage = getConfirmPasswordErrorMessage(userInfo.password, userInfo.confirmPassword);
  const isValidForm = !(emailErrorMessage || ageErrorMessage || passwordErrorMessage || confirmPasswordErrorMessage);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValidForm) return;

    const { email, age, password } = userInfo;
    const results = await Promise.all(
      Object.values(BASE_URL).map(({ URL }) => authAPI.signUp({ url: URL, email, password, age }))
    );

    const errorMessage = results.find(result => result !== RESPONSE.SUCCESS);
    if (errorMessage) {
      alert(errorMessage);
      return;
    }

    alert('회원가입에 성공하였습니다!');
    history.push(ROUTE.SIGN_IN);
  };

  return (
    <S.SignUpForm onSubmit={handleSignUp}>
      <S.Title>회원가입</S.Title>
      <S.InputWrapper>
        <Input
          type='email'
          value={userInfo.email}
          emoji={mailSVG}
          placeholder='이메일을 입력해주세요'
          name='email'
          onChange={handleChange}
          required={true}
        />
        <S.Message>{emailErrorMessage}</S.Message>
      </S.InputWrapper>
      <S.InputWrapper>
        <Input
          type='number'
          value={userInfo.age}
          emoji={userSVG}
          placeholder='나이를 입력해주세요'
          name='age'
          onChange={handleChange}
        />
        <S.Message>{ageErrorMessage}</S.Message>
      </S.InputWrapper>
      <S.InputWrapper>
        <Input
          type='password'
          value={userInfo.password}
          emoji={lockSVG}
          placeholder='비밀번호를 입력해주세요'
          name='password'
          onChange={handleChange}
          required={true}
        />
        <S.Message>{passwordErrorMessage}</S.Message>
      </S.InputWrapper>
      <S.InputWrapper>
        <Input
          type='password'
          value={userInfo.confirmPassword}
          emoji={lockSVG}
          placeholder='비밀번호를 한번 더 입력해주세요'
          name='confirmPassword'
          onChange={handleChange}
          required={true}
        />
        <S.Message>{confirmPasswordErrorMessage}</S.Message>
      </S.InputWrapper>
      <S.ButtonWrapper>
        <Button isDisabled={isValidForm ? false : true}>회원가입</Button>
      </S.ButtonWrapper>
    </S.SignUpForm>
  );
};

export default SignUpForm;
