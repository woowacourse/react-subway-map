import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router';
import { ROUTE } from '../../../constants';
import { useChangeEvent, useServerAPI } from '../../../hooks';
import { RootState } from '../../../store';
import { ISignUpReq } from '../../../type';
import { isValidAge, isValidEmail, isValidPassword } from '../../../utils';
import { Header } from '../../atoms';
import { SignUpForm } from '../../molecules';
import { Container } from './SignUp.styles';

// TODO: 메시지 상수화
const SignUp = () => {
  const history = useHistory();
  const {
    signedUser,
    hostState: { host },
  } = useSelector((state: RootState) => {
    return { signedUser: state.signedUserReducer, hostState: state.hostReducer };
  });
  const { postData: signUpRequest, postDataResponse: signUpResponse } = useServerAPI(
    `${host}/members`,
  );

  const { value: age, onChange: onChangeAge } = useChangeEvent('');
  const { value: email, onChange: onChangeEmail } = useChangeEvent('');
  const { value: password, onChange: onChangePassword } = useChangeEvent('');
  const { value: passwordCheck, onChange: onChangePasswordCheck } = useChangeEvent('');

  if (signedUser?.id) {
    window.alert('이미 로그인 되어 있습니다.');
    return <Redirect to={ROUTE.HOME} />;
  }

  const onSubmitSignUp: React.FormEventHandler<HTMLFormElement> = event => {
    event.preventDefault();

    const body: ISignUpReq = {
      age: Number(age),
      email,
      password,
    };

    signUpRequest(body);
  };

  // TODO: 현재 회원가입에러는 무조건 500으로 반환됨. 백엔드와 협의 필요.
  useEffect(() => {
    if (signUpResponse?.isError === true) {
      window.alert(signUpResponse.message);
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
