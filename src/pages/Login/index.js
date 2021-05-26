import React, { useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';

import { login, clearLoginFailed } from '../../redux/userSlice';
import { Section, Input, IconMail, IconLock, ButtonSquare } from '../../components';
import { Form, Anchor } from './style';
import { ROUTE } from '../../constants';
import { LOGIN } from '../../constants/subway';

export const LoginPage = (props) => {
  const { endpoint } = props;

  const history = useHistory();
  const dispatch = useDispatch();
  const { isLoginSuccess, isLoginFailed } = useSelector((store) => store.user);
  const { enqueueSnackbar } = useSnackbar();

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (isLoginSuccess) {
      history.push(ROUTE.STATION);
      enqueueSnackbar(LOGIN.SUCCEED, { autoHideDuration: 1500 });
    }
    if (isLoginFailed) {
      enqueueSnackbar(LOGIN.FAIL, { variant: 'error', autoHideDuration: 1500 });
      dispatch(clearLoginFailed());
    }
  }, [isLoginSuccess, isLoginFailed]);

  const handleLogin = (e) => {
    e.preventDefault();

    dispatch(
      login({
        endpoint,
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

LoginPage.propTypes = {
  endpoint: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
};
