import Input from '../@commons/Input/Input';
import * as S from './SignUpForm.styles';
import mailSVG from '../../assets/svg/mail.svg';
import userSVG from '../../assets/svg/user.svg';
import lockSVG from '../../assets/svg/lock.svg';
import Button from '../@commons/Button/Button';

const SignUpForm = () => {
  return (
    <S.SignUpForm>
      <S.Title>회원가입</S.Title>
      <S.InputWrapper>
        <Input emoji={mailSVG} placeholder='이메일을 입력해주세요' />
        <S.Message></S.Message>
      </S.InputWrapper>
      <S.InputWrapper>
        <Input emoji={userSVG} placeholder='나이를 입력해주세요' />
        <S.Message></S.Message>
      </S.InputWrapper>
      <S.InputWrapper>
        <Input emoji={lockSVG} placeholder='비밀번호를 입력해주세요' />
        <S.Message></S.Message>
      </S.InputWrapper>
      <S.InputWrapper>
        <Input emoji={lockSVG} placeholder='비밀번호를 한번 더 입력해주세요' />
        <S.Message></S.Message>
      </S.InputWrapper>
      <S.ButtonWrapper>
        <Button isDisabled={true}>회원가입</Button>
      </S.ButtonWrapper>
    </S.SignUpForm>
  );
};

export default SignUpForm;
