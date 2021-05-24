import Input from '../@commons/Input/Input';
import * as S from './SignUpForm.styles';
import mailSVG from '../../assets/svg/mail.svg';
import userSVG from '../../assets/svg/user.svg';
import lockSVG from '../../assets/svg/lock.svg';
import Button from '../@commons/Button/Button';
import { useState } from 'react';

const isValidEmail = (email: string) => {
  var reg_email = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;

  if (!reg_email.test(email)) {
    return '이메일 형식이 아닙니다.';
  }

  return '';
};

const isValidAge = (age: string) => {
  if (isNaN(Number(age))) {
    return '나이는 숫자여야 합니다.';
  }

  if (!(1 <= Number(age) && Number(age) <= 200)) {
    return '나이는 1살 이상 200살 이하여야 합니다.';
  }

  return '';
};

const isValidPassword = (password: string) => {
  if (!(4 <= password.length && password.length <= 20)) {
    return '비밀번호는 최소 4글자에서 최대 20 글자여야 합니다.';
  }

  return '';
};

const isValidPasswordConfirm = (password: string, confirmPassword: string) => {
  if (!(4 <= confirmPassword.length && confirmPassword.length <= 20)) {
    return '비밀번호는 최소 4글자에서 최대 20 글자여야 합니다.';
  }

  if (password !== confirmPassword) {
    return '동일한 비밀번호를 입력해주세요.';
  }

  return '';
};

const SignUpForm = () => {
  const [userInfo, setUserInfo] = useState({
    email: '',
    age: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };
  return (
    <S.SignUpForm>
      <S.Title>회원가입</S.Title>
      <S.InputWrapper>
        <Input
          type='text'
          emoji={mailSVG}
          placeholder='이메일을 입력해주세요'
          name='email'
          onChange={handleChange}
          required={true}
        />
        <S.Message>{isValidEmail(userInfo.email)}</S.Message>
      </S.InputWrapper>
      <S.InputWrapper>
        <Input type='number' emoji={userSVG} placeholder='나이를 입력해주세요' name='age' onChange={handleChange} />
        <S.Message>{isValidAge(userInfo.age)}</S.Message>
      </S.InputWrapper>
      <S.InputWrapper>
        <Input
          type='password'
          emoji={lockSVG}
          placeholder='비밀번호를 입력해주세요'
          name='password'
          onChange={handleChange}
          required={true}
        />
        <S.Message></S.Message>
      </S.InputWrapper>
      <S.InputWrapper>
        <Input
          type='password'
          emoji={lockSVG}
          placeholder='비밀번호를 한번 더 입력해주세요'
          name='confirmPassword'
          onChange={handleChange}
          required={true}
        />
        <S.Message></S.Message>
      </S.InputWrapper>
      <S.ButtonWrapper>
        <Button isDisabled={true}>회원가입</Button>
      </S.ButtonWrapper>
    </S.SignUpForm>
  );
};

export default SignUpForm;
