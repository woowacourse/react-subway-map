import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { ROUTE } from '../../../constants';
import { loginRequestAsync } from '../../../features/accessTokenSlice';
import { getSignedUserAsync } from '../../../features/signedUserSlice';
import { useInput } from '../../../hooks';
import { RootState, useAppDispatch } from '../../../store';
import { ILoginReq } from '../../../type';
import { Header } from '../../atoms';
import LoginForm from '../../molecules/LoginForm/LoginForm';
import { Container, Footer } from './Login.styles';

const Login = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const { signedUser, accessToken } = useSelector((state: RootState) => ({
    signedUser: state.signedUserReducer,
    accessToken: state.accessTokenReducer,
  }));

  const { value: email, onChange: onChangeEmail } = useInput('');
  const { value: password, onChange: onChangePassword } = useInput('');

  if (signedUser?.id) {
    window.alert('이미 로그인 되어 있습니다.');
    return <Redirect to={ROUTE.HOME} />;
  }

  const onSubmitLogin: React.FormEventHandler<HTMLFormElement> = event => {
    event.preventDefault();

    const body: ILoginReq = {
      email,
      password,
    };

    dispatch(loginRequestAsync(body));
  };

  useEffect(() => {
    if (accessToken?.isError === false) {
      window.alert('로그인에 성공하셨습니다.');
      history.replace({ pathname: ROUTE.HOME });
      dispatch(getSignedUserAsync(accessToken.accessToken));
    } else if (accessToken?.isError === true) {
      window.alert('존재하지 않는 계정입니다.');
    }
  }, [accessToken]);

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
