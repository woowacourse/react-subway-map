import { useEffect } from 'react';
import { useHistory } from 'react-router';
import ContentContainer from '../../components/@commons/ContentContainer/ContentContainer';
import SignInForm from '../../components/SignInPage/SignInForm';
import { ROUTE } from '../../constants/route';
import useUser from '../../hook/useUser';
import * as S from './SignIn.styles';

const SignIn = () => {
  const { error, resetError, accessToken } = useUser();
  const history = useHistory();

  useEffect(() => {
    if (error) {
      alert(error);
      resetError();
    }

    if (accessToken) {
      history.push(ROUTE.HOME);
    }
  }, [error, accessToken, history, resetError]);
  return (
    <S.Container>
      <ContentContainer hasHat={true}>
        <SignInForm />
      </ContentContainer>
    </S.Container>
  );
};

export default SignIn;
