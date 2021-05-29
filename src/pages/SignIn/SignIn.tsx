import { ContentContainer } from '../../components/@commons/ContentContainer/ContentContainer.styles';
import SignInForm from '../../components/SignInPage/SignInForm/SignInForm';
import * as S from './SignIn.styles';

const SignIn = () => {
  return (
    <S.Container>
      <ContentContainer hasHat={true}>
        <SignInForm />
      </ContentContainer>
    </S.Container>
  );
};

export default SignIn;
