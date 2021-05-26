import React, { ChangeEvent, FC, FormEvent, useState } from 'react';
import { useSelector } from 'react-redux';
import { requestSignup } from '../../api/member';
import CardTemplate from '../../components/@common/CardTemplate/CardTemplate';
import Email from '../../components/@common/Icon/Email';
import Lock from '../../components/@common/Icon/Lock';
import Person from '../../components/@common/Icon/Person';
import { API_INFO } from '../../constants/api';
import { PAGE_INFO } from '../../constants/appInfo';
import { RootState } from '../../redux/store';
import { SignupButton, SignupForm, SignupNotificationInput } from './Signup.styles';

const Signup: FC = () => {
  const apiOwner = useSelector((state: RootState) => state.api.owner);
  console.log(apiOwner);
  const [signupInput, setSignupInput] = useState({
    email: '',
    age: '',
    password: '',
    passwordConfirm: '',
  });

  const onSignup = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // TODO : input태그 name vs id
    const memberInfo = {
      email: signupInput.email,
      age: Number(signupInput.age),
      password: signupInput.password,
    };

    const response = await requestSignup(memberInfo, API_INFO[apiOwner as string].endPoint);
  };

  const onChange = (inputKey: string) => ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    setSignupInput({ ...signupInput, [inputKey]: value });
  };

  return (
    <CardTemplate
      templateColor={API_INFO[apiOwner].themeColor[400]}
      titleText={PAGE_INFO.SIGN_UP.text}
    >
      <SignupForm onSubmit={onSignup}>
        <SignupNotificationInput
          type="email"
          value={signupInput.email}
          onChange={onChange('email')}
          labelIcon={<Email />}
          placeholder="이메일을 입력해주세요."
          required
        />
        <SignupNotificationInput
          type="number"
          value={signupInput.age}
          onChange={onChange('age')}
          labelIcon={<Person />}
          placeholder="나이를 입력해주세요."
          min={1}
          max={150}
          required
        />
        <SignupNotificationInput
          type="password"
          value={signupInput.password}
          onChange={onChange('password')}
          labelIcon={<Lock />}
          placeholder="비밀번호를 입력해주세요."
          minLength={6}
          maxLength={20}
          required
        />
        <SignupNotificationInput
          type="password"
          value={signupInput.passwordConfirm}
          onChange={onChange('passwordConfirm')}
          labelIcon={<Lock />}
          placeholder="비밀번호를 한번 더 입력해주세요."
          minLength={6}
          maxLength={20}
          required
        />
        <SignupButton isColored={true} disabled={false}>
          회원가입
        </SignupButton>
      </SignupForm>
    </CardTemplate>
  );
};

export default Signup;
