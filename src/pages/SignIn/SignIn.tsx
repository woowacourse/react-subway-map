import { ContentContainer } from '../../components/@commons/ContentContainer/ContentContainer.styles';
import SignInForm from '../../components/SignInPage/SignInForm';
import * as S from './SignIn.styles';

const SignIn = () => {
  return (
    <S.Container>
      <ContentContainer hatColor='MINT_500'>
        <SignInForm />
      </ContentContainer>
    </S.Container>
  );
};

export default SignIn;
