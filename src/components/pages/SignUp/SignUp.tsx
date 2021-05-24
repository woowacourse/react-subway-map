import { useHistory } from 'react-router';
import { ROUTE } from '../../../constants';
import { useInput, useServerAPI } from '../../../hooks';
import { isValidAge, isValidEmail, isValidPassword } from '../../../utils';
import { Header } from '../../atoms';
import SignUpForm from '../../molecules/SignUpForm/SignUpForm';
import { Container } from './SignUp.styles';

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

  const { value: age, onChange: onChangeAge } = useInput('');
  const { value: email, onChange: onChangeEmail } = useInput('');
  const { value: password, onChange: onChangePassword } = useInput('');
  const { value: passwordCheck, onChange: onChangePasswordCheck } = useInput('');

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
        isValidAge={isValidAge(age)}
        isValidEmail={isValidEmail(email)}
        isValidPassword={isValidPassword(password)}
        isValidPasswordCheck={passwordCheck === password}
        onSubmitSignUp={onSubmitSignUp}
      />
    </Container>
  );
};

export default SignUp;
