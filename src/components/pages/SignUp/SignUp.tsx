import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { BASE_URL, RESPONSE_MESSAGE, ROUTE } from '../../../constants';
import { useServerAPI } from '../../../hooks';
import { RootState } from '../../../store';
import { Header } from '../../atoms';
import { FormProvider } from '../../contexts/FormContext/FormContext';
import { SignUpForm } from '../../molecules';
import { Container } from './SignUp.styles';
interface SignUpFormState {
  age: {
    value: string;
  };
  email: {
    value: string;
  };
  password: {
    value: string;
  };
  passwordCheck: {
    value: string;
  };
}

const SignUp = () => {
  const history = useHistory();
  const {
    hostState: { host },
  } = useSelector((state: RootState) => {
    return { hostState: state.hostReducer };
  });
  const { postData: signUpRequest, postDataResponse: signUpResponse } = useServerAPI(
    BASE_URL.SIGNUP(host),
    RESPONSE_MESSAGE.SIGNUP,
  );

  const signUpRequestWrapper = (formContextState: unknown) => {
    const {
      age: { value: age },
      email: { value: email },
      password: { value: password },
    } = formContextState as SignUpFormState;

    const body = {
      age,
      email,
      password,
    };

    signUpRequest(body);
  };

  useEffect(() => {
    if (signUpResponse?.isError === false) {
      history.replace({ pathname: ROUTE.LOGIN });
    }
  }, [signUpResponse]);

  return (
    <Container>
      <Header>
        <h3>회원가입</h3>
      </Header>

      <FormProvider submitFunc={signUpRequestWrapper}>
        <SignUpForm />
      </FormProvider>
    </Container>
  );
};

export default SignUp;
