import Input from '../@commons/Input/Input';
import * as S from './SignInForm.styles';
import mailSVG from '../../assets/svg/mail.svg';
import lockSVG from '../../assets/svg/lock.svg';
import Button from '../@commons/Button/Button';

const SignInForm = () => {
  return (
    <S.SignInForm>
      <S.Title>로그인</S.Title>
      <S.InputWrapper>
        <Input emoji={mailSVG} placeholder='이메일을 입력해주세요' />
        <S.Message></S.Message>
      </S.InputWrapper>
      <S.InputWrapper>
        <Input emoji={lockSVG} placeholder='비밀번호를 입력해주세요' />
        <S.Message></S.Message>
      </S.InputWrapper>
      <S.ButtonWrapper>
        <Button>로그인</Button>
      </S.ButtonWrapper>
      <S.SignUpLinkWrapper>
        <a>아직 회원이 아니신가요?</a>
      </S.SignUpLinkWrapper>
    </S.SignInForm>
  );
};

export default SignInForm;
