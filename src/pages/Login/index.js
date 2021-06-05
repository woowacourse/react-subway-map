import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';

import { login, clearLoginFail } from '../../redux/userSlice';

import { useSnackbar } from 'notistack';
import { Section, Input, IconMail, IconLock, ButtonSquare } from '../../components';
import { Form, Anchor } from './style';
import { LOGIN, ROUTE, ACCESS_TOKEN, SERVER_ID, SERVER_LIST, SHOWING_MESSAGE_TIME } from '../../constants';

export const LoginPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [cookies, setCookie] = useCookies();
  const { isLogin, isLoginFail, accessToken } = useSelector((store) => store.user);
  const { enqueueSnackbar } = useSnackbar();

  const { baseUrl } = SERVER_LIST[cookies[SERVER_ID]];

  useEffect(() => {
    if (isLogin) {
      enqueueSnackbar(LOGIN.SUCCEED, { autoHideDuration: SHOWING_MESSAGE_TIME });
      setCookie(ACCESS_TOKEN, accessToken);
      history.push(ROUTE.STATION);
    }

    if (isLoginFail) {
      enqueueSnackbar(LOGIN.FAIL, { variant: 'error', autoHideDuration: SHOWING_MESSAGE_TIME });
      dispatch(clearLoginFail());
    }

    /* eslint-disable react-hooks/exhaustive-deps */
  }, [isLogin, isLoginFail]);

  const handleLogin = (e) => {
    e.preventDefault();

    dispatch(
      login({
        baseUrl,
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
