import { useHistory } from 'react-router';
import { ROUTE } from '../../../constants';
import { useInput, useServerAPI } from '../../../hooks';
import { Header } from '../../atoms';
import SignUpForm from '../../molecules/SignUpForm/SignUpForm';
import { Container } from './SignUp.styles';

const ageValidator = (value: string) => {
  const age = Number(value);

  return 0 < age && age < 200;
};

const emailValidator = (value: string) => {
  const regEmail =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

  return regEmail.test(value);
};

const passwordValidator = (value: string) => {
  return 5 < value.length && value.length < 13;
};

//TODO: alert 2번뜨는 문제 해결
// TODO: warning 해결
// TODO: 에러 메시지 처음에 렌더링되는 문제 해결
const SignUp = () => {
  const history = useHistory();
  const {
    postData: signUpRequest,
    errorInfo,
    isSuccess,
    setErrorInfo,
    setSuccessState,
  } = useServerAPI('/members');

  const { value: age, onChange: onChangeAge, isValid: isValidAge } = useInput('', ageValidator);
  const {
    value: email,
    onChange: onChangeEmail,
    isValid: isValidEmail,
  } = useInput('', emailValidator);
  const {
    value: password,
    onChange: onChangePassword,
    isValid: isValidPassword,
  } = useInput('', passwordValidator);
  const {
    value: passwordCheck,
    onChange: onChangePasswordCheck,
    isValid: isValidPasswordCheck,
  } = useInput('', value => value === password);

  const onSubmitSignUp: React.FormEventHandler<HTMLFormElement> = event => {
    event.preventDefault();

    const headers = {
      'Content-Type': 'application/json; charset=UTF-8',
    };

    const body = {
      age,
      email,
      password,
    };

    signUpRequest(headers, body);
  };

  if (errorInfo?.isError && errorInfo.text.length > 0) {
    window.alert(errorInfo.text);
    setErrorInfo({
      isError: false,
      text: '',
    });
  }

  if (isSuccess) {
    window.alert('회원가입 성공');
    setSuccessState(false);
    history.push({ pathname: ROUTE.LOGIN });
  }

  return (
    <Container>
      <Header>
        <h3>회원가입</h3>
      </Header>

      <SignUpForm
        age={Number(age)}
        onChangeAge={onChangeAge}
        email={email}
        onChangeEmail={onChangeEmail}
        password={password}
        onChangePassword={onChangePassword}
        passwordCheck={passwordCheck}
        onChangePasswordCheck={onChangePasswordCheck}
        isValidAge={isValidAge}
        isValidEmail={isValidEmail}
        isValidPassword={isValidPassword}
        isValidPasswordCheck={isValidPasswordCheck}
        onSubmitSignUp={onSubmitSignUp}
      />
    </Container>
  );
};

export default SignUp;
