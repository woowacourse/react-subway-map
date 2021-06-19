import Cookies from 'js-cookie';
import { useSnackbar } from 'notistack';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import { ButtonSquare, IconLock, IconMail, Input, Section } from '../../components';
import { ACCESS_TOKEN, LOGIN, MESSAGE_TYPE, ROUTE, SHOWING_MESSAGE_TIME } from '../../constants';
import { clearLoginFail, login } from '../../redux/userSlice';
import { Anchor, Form } from './style';

export const LoginPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const { isLogin, isLoginFail } = useSelector((store) => store.user);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (!Cookies.get(ACCESS_TOKEN)) {
      history.push(ROUTE.LOGIN);
      return;
    }

    if (isLogin) {
      enqueueSnackbar(LOGIN.SUCCEED, { autoHideDuration: SHOWING_MESSAGE_TIME });
      history.push(ROUTE.STATION);
    }

    if (isLoginFail) {
      enqueueSnackbar(LOGIN.FAIL, { variant: MESSAGE_TYPE.ERROR, autoHideDuration: SHOWING_MESSAGE_TIME });
      Cookies.remove(ACCESS_TOKEN);
      dispatch(clearLoginFail());
    }
  }, [isLogin, isLoginFail]);

  const handleLogin = (e) => {
    e.preventDefault();

    dispatch(
      login({
        email: e.target.email.value,
        password: e.target.password.value,
      }),
    );
  };

  return (
    <Section heading="로그인">
      <Form onSubmit={handleLogin}>
        <Input type="email" name="email" icon={<IconMail />} placeholder="이메일을 입력해주세요" />
        <Input type="password" name="password" icon={<IconLock />} placeholder="비밀번호를 입력해주세요" />
        <ButtonSquare>로그인</ButtonSquare>
        <Anchor to={ROUTE.SING_UP}>아직 회원이 아니신가요?</Anchor>
      </Form>
    </Section>
  );
};
