import React from 'react';
import { Link } from 'react-router-dom';
import { PageTemplate, Input, Button } from '../../components';
import { Form } from './style';
import { COLOR, ROUTE, SIZE } from '../../constants';

const SignIn = () => {
  return (
    <PageTemplate title={ROUTE.SIGN_IN.NAME}>
      <Form>
        <Input
          type="email"
          name="email"
          placeholder="✉️ 이메일을 입력해주세요."
          size={SIZE.MD}
        />
        <Input
          type="password"
          name="password"
          placeholder="🔒 비밀번호를 입력해주세요."
          size={SIZE.MD}
        />
        {/* <Validator></Validator> 상태에 따라 조건부 렌더링 */}
        <Button backgroundColor={COLOR.AMBER}>로그인</Button>
      </Form>
      <Link to={ROUTE.SIGN_UP.PATH}>아직 회원이 아니신가요?</Link>
    </PageTemplate>
  );
};

export default SignIn;
