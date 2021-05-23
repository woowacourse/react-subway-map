import React from 'react';
import { PageTemplate, Input, Button } from '../../components';
import { COLOR, ROUTE, SIZE } from '../../constants';
import { Form, Validator } from './style';

const SignUp = () => {
  return (
    <PageTemplate title={ROUTE.SIGN_UP.NAME}>
      <Form>
        <Input
          type="email"
          name="email"
          placeholder="✉️ 이메일을 입력해주세요."
          size={SIZE.MD}
        />
        <Validator></Validator>
        <Input
          type="text"
          name="age"
          placeholder="👤 나이를 입력해주세요."
          size={SIZE.MD}
        />
        <Validator></Validator>
        <Input
          type="password"
          name="password"
          placeholder="🔒 비밀번호(영문, 숫자, 특수문자[!, @, #, $])를 입력해주세요."
          size={SIZE.MD}
        />
        <Validator></Validator>
        <Input
          type="password"
          name="password-confirm"
          placeholder="🔒 비밀번호를 한번 더 입력해주세요."
          size={SIZE.MD}
        />
        <Validator></Validator>
        <Button backgroundColor={COLOR.AMBER} disabled>
          회원가입
        </Button>
      </Form>
    </PageTemplate>
  );
};

export default SignUp;
