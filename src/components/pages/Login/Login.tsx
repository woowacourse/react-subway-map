import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { ROUTE } from '../../../constants';
import { loginRequestAsync } from '../../../modules/accessTokenSlice';
import { getSignedUserAsync } from '../../../modules/signedUserSlice';
import { RootState, useAppDispatch } from '../../../store';
import { FullVerticalCenterBox } from '../../../styles/shared';
import { Header } from '../../atoms';
import { LoginForm } from '../../molecules';
import { Footer } from './Login.styles';
import { FormProvider } from '../../contexts/FormContext/FormContext';

interface LoginFormState {
  email: {
    value: string;
  };
  password: {
    value: string;
  };
}

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

  const loginRequestWrapper = (formContextState: unknown) => {
    const {
      email: { value: email },
      password: { value: password },
    } = formContextState as LoginFormState;

    const body = {
      email,
      password,
    };

    dispatch(loginRequestAsync({ host, body }));
  };

  useEffect(() => {
    if (accessTokenState?.isError === false) {
      window.alert('로그인에 성공하셨습니다.');
      dispatch(getSignedUserAsync({ host, accessToken: accessTokenState.accessToken }));
      history.replace({ pathname: ROUTE.HOME });
    } else if (accessTokenState?.isError === true) {
      window.alert(accessTokenState.message);
    }
  }, [accessTokenState]);

  return (
    <FullVerticalCenterBox>
      <Header>
        <h3>로그인</h3>
      </Header>

      <FormProvider submitFunc={loginRequestWrapper}>
        <LoginForm />
      </FormProvider>

      <Footer>
        계정이 없으신가요? <Link to={ROUTE.SIGNUP}>회원가입</Link> 을 통해 계정을 생성해보세요.
      </Footer>
    </FullVerticalCenterBox>
  );
};

export default Login;
