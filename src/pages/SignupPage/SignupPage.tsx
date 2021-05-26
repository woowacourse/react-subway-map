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
import { SnackBarContext } from '../../contexts/SnackBarProvider';
import useInput from '../../hooks/useInput';
import useDebounce from '../../hooks/useDebounce';
import { Icon, Heading1, Form } from './SignupPage.style';
import apiRequest from '../../request';
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from '../../constants/messages';
import { PageProps } from '../types';

const DEBOUNCE_DELAY = 500;

const SignupPage = ({ setIsLoading }: PageProps) => {
  const history = useHistory();
  const themeColor = useContext(ThemeContext)?.themeColor ?? PALETTE.WHITE;
  const addMessage = useContext(SnackBarContext)?.addMessage;

  const [email, setEmail] = useState<string>('');
  const [isEmailDuplicated, setIsEmailDuplicated] = useState<boolean>(false);
  const [age, onAgeChange] = useInput('');
  const [password, onPasswordChange] = useInput('');
  const [passwordConfirm, onPasswordConfirmChange] = useInput('');

  const isEmailFormatValid = !email || /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
  const isAgeValid = !age || (Number(age) > 0 && Number(age) <= 200);
  const isPasswordValid = !password || /^[0-9A-Za-z@$!%*?&]{8,14}$/.test(password);
  const isPasswordMatched = !passwordConfirm || password === passwordConfirm;

  const emailMessage = email
    ? isEmailFormatValid
      ? isEmailDuplicated
        ? ERROR_MESSAGE.DUPLICATED_EMAIL
        : SUCCESS_MESSAGE.AVAILABLE_EMAIL
      : ERROR_MESSAGE.INVALID_EMAIL
    : '';
  const ageErrorMessage = isAgeValid ? '' : ERROR_MESSAGE.INVALID_AGE;
  const passwordErrorMessage = isPasswordValid ? '' : ERROR_MESSAGE.INVALID_PASSWORD;
  const passwordMatchedErrorMessage = isPasswordMatched
    ? ''
    : ERROR_MESSAGE.INVALID_PASSWORD_CONFIRM;

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

  const checkEmailDuplicated = useDebounce(async (value: string) => {
    try {
      const response = await apiRequest.checkEmailDuplicated(value);

      setIsEmailDuplicated(response);
    } catch (error) {
      console.error(error);

      addMessage?.(ERROR_MESSAGE.DEFAULT);
    }
  }, DEBOUNCE_DELAY);

  const onEmailChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setEmail(event.target.value);
    checkEmailDuplicated(event.target.value);
  };

  const onPasswordKeydown: KeyboardEventHandler<HTMLInputElement> = (event) => {
    const el = event.target as HTMLInputElement;

    if (event.getModifierState('CapsLock')) {
      el.setCustomValidity('CapsLock이 켜져 있습니다.');
      el.reportValidity();
    } else {
      el.setCustomValidity('');
    }
  };

  const onSignup: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    if (!isFormCompleted) {
      return;
    }

    const timer = setTimeout(() => setIsLoading(true), 500);

    try {
      await apiRequest.signup({ email, password, age: Number(age) });
      addMessage?.(SUCCESS_MESSAGE.SIGNUP);
      history.push(PATH.LOGIN);
    } catch (error) {
      console.error(error);
      addMessage?.(ERROR_MESSAGE.DEFAULT);
    } finally {
      clearTimeout(timer);
      setIsLoading(false);
    }
  };

  return (
    <Box hatColor={themeColor} backgroundColor={PALETTE.WHITE}>
      <Heading1>회원가입</Heading1>
      <Form onSubmit={onSignup}>
        <InputContainer
          validation={{
            text: emailMessage,
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
            autoComplete="off"
            aria-label="이메일 입력"
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
            autoComplete="off"
            aria-label="나이 입력"
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
            autoComplete="off"
            aria-label="비밀번호 입력"
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
            autoComplete="off"
            aria-label="비밀번호 확인 입력"
          />
        </InputContainer>
        <Button
          size="m"
          width="100%"
          backgroundColor={themeColor}
          color={PALETTE.WHITE}
          disabled={!isFormCompleted}
        >
          회원가입
        </Button>
      </Form>
    </Box>
  );
};

export default SignupPage;
