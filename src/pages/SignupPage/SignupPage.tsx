import { FormEventHandler, useState, useContext, KeyboardEventHandler, useRef } from 'react';
import { Redirect, useHistory } from 'react-router-dom';

import { Box, Button, Heading1 } from '../../components/shared';

import { UserContext } from '../../contexts/UserContextProvider';
import { ThemeContext } from '../../contexts/ThemeContextProvider';
import { SnackBarContext } from '../../contexts/SnackBarProvider';

import PATH from '../../constants/path';
import PALETTE from '../../constants/palette';
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from '../../constants/messages';

import useInput from '../../hooks/useInput';
import apiRequest from '../../request';
import { PageProps } from '../types';
import { Form } from './SignupPage.style';
import { isFormCompleted } from '../../utils/validations/signupValidation';
import EmailInput from './EmailInput';
import AgeInput from './AgeInput';
import PasswordInput from './PasswordInput';
import PasswordConfirmInput from './PasswordConfirmInput';

const SignupPage = ({ setIsLoading }: PageProps) => {
  const history = useHistory();
  const themeColor = useContext(ThemeContext)?.themeColor ?? PALETTE.WHITE;
  const addMessage = useContext(SnackBarContext)?.addMessage;
  const isLoggedIn = useContext(UserContext)?.isLoggedIn;

  const [isEmailDuplicated, setIsEmailDuplicated] = useState(false);
  const [age, onAgeChange] = useInput('');
  const [password, onPasswordChange] = useInput('');
  const [passwordConfirm, onPasswordConfirmChange] = useInput('');

  const emailRef = useRef<HTMLInputElement | null>(null); // emailRef

  if (isLoggedIn) {
    return <Redirect to={PATH.ROOT} />;
  }

  const onPasswordKeydown: KeyboardEventHandler<HTMLInputElement> = (event) => {
    const el = event.currentTarget;

    if (event.getModifierState('CapsLock')) {
      el.setCustomValidity('CapsLock이 켜져 있습니다.');
      el.reportValidity();
    } else {
      el.setCustomValidity('');
    }
  };

  const onSignup: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    if (
      !isFormCompleted(isEmailDuplicated, {
        email: emailRef?.current?.value ?? '',
        age,
        password,
        passwordConfirm,
      })
    ) {
      return;
    }

    const timer = setTimeout(() => setIsLoading(true), 500);

    try {
      await apiRequest.signup({
        email: emailRef?.current?.value ?? '',
        password,
        age: Number(age),
      });

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
      <Heading1 marginBottom="2rem">회원가입</Heading1>
      <Form onSubmit={onSignup}>
        <EmailInput
          ref={emailRef}
          isEmailDuplicated={isEmailDuplicated}
          setIsEmailDuplicated={setIsEmailDuplicated}
        />
        <AgeInput age={age} onAgeChange={onAgeChange} />
        <PasswordInput
          password={password}
          onPasswordChange={onPasswordChange}
          onPasswordKeydown={onPasswordKeydown}
        />
        <PasswordConfirmInput
          password={password}
          passwordConfirm={passwordConfirm}
          onPasswordConfirmChange={onPasswordConfirmChange}
          onPasswordKeydown={onPasswordKeydown}
        />
        <Button
          size="m"
          width="100%"
          backgroundColor={themeColor}
          color={PALETTE.WHITE}
          disabled={
            !isFormCompleted(isEmailDuplicated, {
              email: emailRef?.current?.value ?? '',
              age,
              password,
              passwordConfirm,
            })
          }
        >
          회원가입
        </Button>
      </Form>
    </Box>
  );
};

export default SignupPage;
