import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { ROUTE } from '../../../constants';
import { loginRequestAsync } from '../../../features/accessTokenSlice';
import { getSignedUserAsync } from '../../../features/signedUserSlice';
import { useChangeEvent } from '../../../hooks';
import { RootState, useAppDispatch } from '../../../store';
import { ILoginReq } from '../../../type';
import { Header } from '../../atoms';
import { LoginForm } from '../../molecules';
import { Container, Footer } from './Login.styles';

const Login = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const {
    accessTokenState,
    hostState: { host },
  } = useSelector((state: RootState) => ({
    accessTokenState: state.accessTokenReducer,
    hostState: state.hostReducer,
  }));

  const { value: email, onChange: onChangeEmail } = useChangeEvent('');
  const { value: password, onChange: onChangePassword } = useChangeEvent('');

  const onSubmitLogin: React.FormEventHandler<HTMLFormElement> = event => {
    event.preventDefault();

    if (email.length === 0 || password.length === 0) {
      window.alert('계정정보를 입력해주세요.');

      return;
    }

    const body: ILoginReq = {
      email,
      password,
    };

    dispatch(loginRequestAsync({ host, body }));
  };

  useEffect(() => {
    if (accessTokenState?.isError === false) {
      window.alert('로그인에 성공하셨습니다.');
      dispatch(getSignedUserAsync({ host, accessToken: accessTokenState.accessToken })).then(() => {
        history.replace({ pathname: ROUTE.HOME });
      });
    } else if (accessTokenState?.isError === true) {
      window.alert(accessTokenState.message);
    }
  }, [accessTokenState]);

  return (
    <Container>
      <Header>
        <h3>로그인</h3>
      </Header>

      <LoginForm
        email={email}
        onChangeEmail={onChangeEmail}
        password={password}
        onChangePassword={onChangePassword}
        onSubmitLogin={onSubmitLogin}
      />

      <Footer>
        계정이 없으신가요? <Link to={ROUTE.SIGNUP}>회원가입</Link> 을 통해 계정을 생성해보세요.
      </Footer>
    </Container>
  );
};

export default Login;
