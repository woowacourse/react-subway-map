import {
  FormEventHandler,
  ChangeEventHandler,
  useState,
  useContext,
  KeyboardEventHandler,
} from 'react';
import { MdEmail, MdLock, MdPerson } from 'react-icons/md';
import { useHistory } from 'react-router-dom';

import Box from '../../components/shared/Box/Box';
import Button from '../../components/shared/Button/Button';
import Input from '../../components/shared/Input/Input';
import InputContainer from '../../components/shared/InputContainer/InputContainer';
import PATH from '../../constants/path';
import PALETTE from '../../constants/palette';
import { ThemeContext } from '../../contexts/ThemeContextProvider';
import useInput from '../../hooks/useInput';
import useDebounce from '../../hooks/useDebounce';
import { Icon, Heading1 } from './SignupPage.style';

const DEBOUNCE_DELAY = 500;

const SignupPage = () => {
  const history = useHistory();
  const themeColor = useContext(ThemeContext)?.themeColor ?? PALETTE.WHITE;

  const [email, setEmail] = useState<string>('');
  const [isEmailDuplicated, setIsEmailDuplicated] = useState<boolean>(false);
  const [age, onAgeChange] = useInput('');
  const [password, onPasswordChange] = useInput('');
  const [passwordConfirm, onPasswordConfirmChange] = useInput('');

  const isEmailFormatValid = !email || /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
  const isAgeValid = !age || (Number(age) > 0 && Number(age) <= 200);
  const isPasswordValid = !password || /^[0-9A-Za-z@$!%*?&]{8,14}$/.test(password);
  const isPasswordMatched = !passwordConfirm || password === passwordConfirm;

  const emailErrorMessage = isEmailFormatValid
    ? isEmailDuplicated
      ? '이미 존재하는 이메일입니다'
      : ''
    : '이메일 형식에 맞게 작성하세요';
  const ageErrorMessage = isAgeValid ? '' : '1살 이상 200살 이하의 나이를 입력해주세요';
  const passwordErrorMessage = isPasswordValid
    ? ''
    : '비밀번호는 영문, 숫자, 특수문자만을 포함한 8자 이상 14자 이하여야 합니다';
  const passwordMatchedErrorMessage = isPasswordMatched ? '' : '비밀번호가 일치하지 않습니다';

  const isFormCompleted =
    email &&
    age &&
    password &&
    passwordConfirm &&
    isEmailFormatValid &&
    !isEmailDuplicated &&
    isAgeValid &&
    isPasswordValid &&
    isPasswordMatched;

  const checkEmailDuplicated = useDebounce((value: string) => {
    // server에 중복 검사
  }, DEBOUNCE_DELAY);

  const onEmailChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setEmail(event.target.value);
    checkEmailDuplicated(event);
  };

  const onPasswordKeydown: KeyboardEventHandler<HTMLInputElement> = (event) => {
    const el = event.target as HTMLInputElement;

    if (event.getModifierState('CapsLock')) {
      el.setCustomValidity('CapsLock이 켜져 있습니다');
      el.reportValidity();
    } else {
      el.setCustomValidity('');
    }
  };

  const onSignup: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    history.push(PATH.LOGIN);
  };

  return (
    <Box hatColor={themeColor} backgroundColor={PALETTE.WHITE}>
      <Heading1>회원가입</Heading1>
      <form onSubmit={onSignup}>
        <InputContainer
          validation={{
            text: emailErrorMessage,
            isValid: isEmailFormatValid && !isEmailDuplicated,
          }}
        >
          <Icon>
            <MdEmail />
          </Icon>
          <Input
            type="email"
            placeholder="이메일을 입력하세요"
            value={email}
            onChange={onEmailChange}
          />
        </InputContainer>
        <InputContainer validation={{ text: ageErrorMessage, isValid: isAgeValid }}>
          <Icon>
            <MdPerson />
          </Icon>
          <Input
            type="text"
            placeholder="나이를 입력하세요"
            maxLength={3}
            value={age}
            onChange={onAgeChange}
          />
        </InputContainer>
        <InputContainer validation={{ text: passwordErrorMessage, isValid: isPasswordValid }}>
          <Icon>
            <MdLock />
          </Icon>
          <Input
            type="password"
            placeholder="비밀번호를 입력하세요"
            value={password}
            onChange={onPasswordChange}
            onKeyDown={onPasswordKeydown}
          />
        </InputContainer>
        <InputContainer
          validation={{ text: passwordMatchedErrorMessage, isValid: isPasswordMatched }}
        >
          <Icon>
            <MdLock />
          </Icon>
          <Input
            type="password"
            placeholder="비밀번호를 한번 더 입력하세요"
            value={passwordConfirm}
            onChange={onPasswordConfirmChange}
            onKeyDown={onPasswordKeydown}
          />
        </InputContainer>
        <Button
          size="m"
          width="100%"
          backgroundColor={PALETTE.NAVER}
          color={PALETTE.WHITE}
          disabled={!isFormCompleted}
        >
          회원가입
        </Button>
      </form>
    </Box>
  );
};

export default SignupPage;
