import React from 'react';
import { Link } from 'react-router-dom';
import { PageTemplate, Input, Button } from '../../components';
import { Content, Form } from './style';
import { COLOR, ROUTE, SIZE } from '../../constants';

const SignIn = (props) => {
  return (
    <PageTemplate title={ROUTE.SIGN_IN.NAME}>
      <Content>
        <Form>
          <Input
            type="email"
            placeholder="✉️ 이메일을 입력해주세요."
            size={SIZE.MD}
          />
          <Input
            type="password"
            placeholder="🔒 비밀번호를 입력해주세요."
            size={SIZE.MD}
          />
          <Button backgroundColor={COLOR.AMBER}>로그인</Button>
        </Form>
        <Link to={ROUTE.SIGN_UP.PATH}>아직 회원이 아니신가요?</Link>
      </Content>
    </PageTemplate>
  );
};

export default SignIn;
