import React, { FC } from 'react';
import CardTemplate from '../../components/@common/CardTemplate/CardTemplate';
import Email from '../../components/@common/Icon/Email';
import Lock from '../../components/@common/Icon/Lock';
import Person from '../../components/@common/Icon/Person';
import Input from '../../components/@common/Input/Input';
import { PAGE_INFO, THEME_COLOR } from '../../constants/appInfo';
import { SignupButton, SignupForm } from './Signup.styles';

const Signup: FC = () => {
  return (
    <CardTemplate templateColor={THEME_COLOR[400]} titleText={PAGE_INFO.SIGN_UP.text}>
      <SignupForm>
        <Input type="email" labelIcon={<Email />} placeholder="이메일을 입력해주세요." />
        <Input
          type="number"
          labelIcon={<Person />}
          placeholder="나이를 입력해주세요."
          min={1}
          max={150}
        />
        <Input
          type="password"
          labelIcon={<Lock />}
          placeholder="비밀번호를 입력해주세요."
          minLength={6}
          maxLength={20}
        />
        <Input
          type="password"
          labelIcon={<Lock />}
          placeholder="비밀번호를 한번 더 입력해주세요."
          minLength={6}
          maxLength={20}
        />
        <SignupButton isColored={true} disabled={true}>
          회원가입
        </SignupButton>
      </SignupForm>
    </CardTemplate>
  );
};

export default Signup;
