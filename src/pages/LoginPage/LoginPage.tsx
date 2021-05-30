import React, { useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { Card, Input, Button, Select } from '../../components';
import * as Styled from './LoginPage.styles';
import { ReactComponent as EmailIcon } from '../../assets/icons/envelope-solid.svg';
import { ReactComponent as KeyIcon } from '../../assets/icons/key-solid.svg';
import useInput from '../../hooks/useInput';
import useSelect from '../../hooks/useSelect';
import REGEX from '../../constants/regex';
import ROUTES from '../../constants/routes';
import BACKEND from '../../constants/backend';
import { CREWS } from '../../types';
import useAuth from '../../hooks/useAuth';
import { LOGIN } from '../../constants/validation';

interface ILocationState {
  from: { pathname: string };
}

const LoginPage = () => {
  const { onLogin, server, isLogin, showErrorMessage, isError } = useAuth();

  const { value: selectedServer, onChange: onChangeSelectedServer } = useSelect(
    server || CREWS.DANYEE
  );
  const { value: email, onChange: onChangeEmail } = useInput('');
  const { value: password, onChange: onChangePassword } = useInput('');

  const history = useHistory();
  const location = useLocation<ILocationState>();

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onLogin(selectedServer, { email, password });
  };

  useEffect(() => {
    if (isLogin) {
      const from = location.state?.from;

      history.replace(from ? from.pathname : ROUTES.STATION);
    }
  }, [history, isLogin, location.state?.from]);

  useEffect(() => {
    if (isError) {
      showErrorMessage();
    }
  }, [isError, showErrorMessage]);

  return (
    <Styled.LoginPage>
      <Styled.CardWrapper>
        <Card>
          <Styled.Form onSubmit={handleLogin}>
            <Styled.HeaderText>로그인</Styled.HeaderText>
            <Styled.FormItem>
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
            </Styled.FormItem>
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
                minLength={LOGIN.MIN_PASSWORD_LENGTH}
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
