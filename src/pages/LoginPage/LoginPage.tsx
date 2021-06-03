import React, { useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { Card, Input, Button } from '../../components';
import * as Styled from './LoginPage.styles';
import { ReactComponent as EmailIcon } from '../../assets/icons/envelope-solid.svg';
import { ReactComponent as KeyIcon } from '../../assets/icons/key-solid.svg';
import useInput from '../../hooks/useInput';
import REGEX from '../../constants/regex';
import ROUTES from '../../constants/routes';
import { ApiStatus } from '../../types';
import useAuth from '../../hooks/useAuth';
import MESSAGE from '../../constants/message';

interface LocationState {
  from: { pathname: string };
}

const LoginPage = () => {
  const { enqueueSnackbar } = useSnackbar();

  const { onLogin, onResetError, isLogin, error } = useAuth();

  const { value: email, onChange: onChangeEmail } = useInput('');
  const { value: password, onChange: onChangePassword } = useInput('');

  const history = useHistory();
  const location = useLocation<LocationState>();

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const response = await onLogin({ email, password });

    if (response.meta.requestStatus === ApiStatus.REJECTED) return;
    enqueueSnackbar(MESSAGE.SUCCESS.LOGIN);
  };

  useEffect(() => {
    if (isLogin) {
      const from = location.state?.from;

      history.replace(from ? from.pathname : ROUTES.STATION);
    }
  }, [history, isLogin, location.state?.from]);

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error.message || MESSAGE.ERROR.LOGIN_FAILURE, {
        variant: 'error',
      });
      onResetError();
    }
  }, [enqueueSnackbar, error, onResetError]);

  return (
    <Styled.LoginPage>
      <Styled.CardWrapper>
        <Card>
          <Styled.Form onSubmit={handleLogin}>
            <Styled.HeaderText>로그인</Styled.HeaderText>
            {/* <Styled.FormItem>
              <Select
                labelText="서버 선택"
                value={selectedServer}
                onChange={onChangeSelectedServer}
              >
                {Object.entries(BACKEND).map(([crew, { name }]) => (
                  <option key={crew} value={crew}>
                    {name}
                  </option>
                ))}
              </Select>
            </Styled.FormItem> */}
            <Styled.FormItem>
              <Input
                value={email}
                onChange={onChangeEmail}
                icon={<EmailIcon />}
                placeholder="이메일을 입력해주세요"
                pattern={REGEX.isEmail.source}
                required
                autoFocus
              />
            </Styled.FormItem>
            <Styled.FormItem>
              <Input
                value={password}
                onChange={onChangePassword}
                icon={<KeyIcon />}
                type="password"
                minLength={8}
                placeholder="비밀번호를 입력해주세요"
                required
              />
            </Styled.FormItem>
            <Styled.FormItem>
              <Styled.LoginButton>
                <Button fullWidth variant="primary">
                  로그인
                </Button>
              </Styled.LoginButton>
              <Link to={ROUTES.SIGNUP}>아직 회원이 아니신가요?</Link>
            </Styled.FormItem>
          </Styled.Form>
        </Card>
      </Styled.CardWrapper>
    </Styled.LoginPage>
  );
};

export default LoginPage;
