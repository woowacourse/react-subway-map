import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Card, Input, Button, Select } from '../../components';
import * as Styled from './LoginPage.styles';
import { ReactComponent as EmailIcon } from '../../assets/icons/envelope-solid.svg';
import { ReactComponent as KeyIcon } from '../../assets/icons/key-solid.svg';
import useInput from '../../hooks/useInput';
import REGEX from '../../constants/regex';
import ROUTES from '../../constants/routes';
import BACKEND, { CREWS } from '../../constants/backend';
import MESSAGE from '../../constants/message';
import API from '../../api';
import useLocalStorage from '../../hooks/useLocalStorage';

const LoginPage = () => {
  const { value: selectedServer, onChange: onChangeSelectedServer } = useInput(CREWS.DANYEE);
  const { value: email, onChange: onChangeEmail } = useInput('');
  const { value: password, onChange: onChangePassword } = useInput('');
  const [, setAccessToken] = useLocalStorage('accessToken');
  const [, setServer] = useLocalStorage('server');

  const history = useHistory();

  const requestLogin = () => API[selectedServer].post('/login', { email, password });

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await requestLogin();
      setAccessToken(response.data.accessToken);
      setServer(selectedServer);

      history.replace(ROUTES.STATION);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);

      const message = error?.response?.data?.message;

      if (message) {
        // eslint-disable-next-line no-alert
        alert(MESSAGE.ERROR.LOGIN_FAILURE);
        return;
      }

      // eslint-disable-next-line no-alert
      alert(message);
    }
  };

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
