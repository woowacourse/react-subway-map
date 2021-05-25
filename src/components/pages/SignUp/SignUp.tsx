import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router';
import { ROUTE } from '../../../constants';
import { useInput, useServerAPI } from '../../../hooks';
import { RootState } from '../../../store';
import { ISignUpReq } from '../../../type';
import { isValidAge, isValidEmail, isValidPassword } from '../../../utils';
import { Header } from '../../atoms';
import SignUpForm from '../../molecules/SignUpForm/SignUpForm';
import { Container } from './SignUp.styles';

// TODO: 에러 메시지 처음에 렌더링되는 문제 해결
const SignUp = () => {
  const history = useHistory();
  const signedUser = useSelector((state: RootState) => state.signedUserReducer);
  const { postData: signUpRequest, resMeta: signUpResponse } = useServerAPI('/members');

  const { value: age, onChange: onChangeAge } = useInput('');
  const { value: email, onChange: onChangeEmail } = useInput('');
  const { value: password, onChange: onChangePassword } = useInput('');
  const { value: passwordCheck, onChange: onChangePasswordCheck } = useInput('');

  if (signedUser?.id) {
    window.alert('이미 로그인 되어 있습니다.');
    return <Redirect to={ROUTE.HOME} />;
  }

  const onSubmitSignUp: React.FormEventHandler<HTMLFormElement> = event => {
    event.preventDefault();

    const headers = {
      'Content-Type': 'application/json; charset=UTF-8',
    };

    const body: ISignUpReq = {
      age: Number(age),
      email,
      password,
    };

    signUpRequest(headers, body);
  };

  useEffect(() => {
    if (signUpResponse?.isError === true) {
      window.alert('회원가입에 실패하셨습니다.');
    } else if (signUpResponse?.isError === false) {
      window.alert('회원가입에 성공하셨습니다.');
      history.replace({ pathname: ROUTE.LOGIN });
    }
  }, [signUpResponse]);

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
