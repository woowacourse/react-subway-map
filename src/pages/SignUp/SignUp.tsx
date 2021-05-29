import ContentContainer from '../../components/@commons/ContentContainer/ContentContainer';
import SignUpForm from '../../components/SingUpPage/SignUpForm';
import * as S from './SignUp.styles';

const SignUp = () => {
  return (
    <S.Container>
      <ContentContainer hasHat={true}>
        <SignUpForm />
      </ContentContainer>
    </S.Container>
  );
};

export default SignUp;
