import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { ROUTE } from '../../../constants';
import { loginRequestAsync, selectSignedUser } from '../../../features/signedUserSlice';
import { useInput } from '../../../hooks';
import { useAppDispatch } from '../../../store';
import { ILoginReq } from '../../../type';
import { isValidEmail, isValidPassword } from '../../../utils';
import { Header } from '../../atoms';
import LoginForm from '../../molecules/LoginForm/LoginForm';
import { Container, Footer } from './Login.styles';

const Login = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const signedUser = useSelector(selectSignedUser);

  const { value: email, onChange: onChangeEmail } = useInput('');
  const { value: password, onChange: onChangePassword } = useInput('');

  const onSubmitLogin: React.FormEventHandler<HTMLFormElement> = event => {
    event.preventDefault();

    if (!(isValidEmail(email) && isValidPassword(password))) {
      window.alert('유효한 이메일과 비밀번호를 입력해주세요.');
    }

    const body: ILoginReq = {
      email,
      password,
    };

    dispatch(loginRequestAsync(body));
  };

  if (signedUser.accessToken) {
    window.alert('로그인에 성공하였습니다.');
    history.push({ pathname: ROUTE.HOME });
  }

  //TODO: login 실패케이스 처리

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
