import React, { useState } from 'react';
import { useSnackbar } from 'notistack';

import { useCookie, useRouter } from '../../hooks';
import { ButtonSquare, IconLock, IconMail, IconPerson, Input, Section } from '../../components';
import { Form, Anchor } from './style';
import { COLOR, ROUTE, SIGN_UP } from '../../constants';

export const SignUpPage = () => {
  const { endpoint } = useCookie();
  const { goToLogin } = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const [emailMessage, setEmailMessage] = useState('');
  const [ageMessage, setAgeMessage] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');

  const handleSignUpFormSubmit = (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const age = e.target.age.value;
    const password = e.target.password.value;

    (async () => {
      try {
        const response = await fetch(`${endpoint}/members`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            age,
            password,
          }),
        });

        if (response.status === 201) {
          enqueueSnackbar(SIGN_UP.SUCCEED);
          goToLogin();
        } else {
          throw new Error();
        }
      } catch (e) {
        console.error(e);
        enqueueSnackbar(SIGN_UP.FAIL);
      }
    })();
  };

  const handleEmailInputChange = (e) => {
    const email = e.target.value;

    setEmailMessage(getEmailValidationMessage(email));
  };
  const handleEmailInputBlur = (e) => {
    const email = e.target.value;

    setEmailMessage(getEmailValidationMessageAfterBlurred(email));
  };
  const handleAgeInputChange = (e) => {
    const age = e.target.value;

    setAgeMessage(getAgeValidationMessage(age));
  };
  const handlePasswordInputChange = (e) => {
    const password = e.target.value;

    setPasswordMessage(getPasswordValidationMessage(password));
  };

  return (
    <Section heading="회원가입">
      <Form onSubmit={handleSignUpFormSubmit}>
        <Input
          type="email"
          name="email"
          icon={<IconMail />}
          onChange={handleEmailInputChange}
          onBlur={handleEmailInputBlur}
          placeholder="이메일을 입력해주세요"
          hasMessage
          message={emailMessage}
        />
        <Input
          type="number"
          name="age"
          icon={<IconPerson color={COLOR.ICON_DEFAULT} />}
          min="1"
          max="200"
          onChange={handleAgeInputChange}
          placeholder="나이를 입력해주세요"
          hasMessage
          message={ageMessage}
        />
        <Input
          type="password"
          name="password"
          icon={<IconLock />}
          onChange={handlePasswordInputChange}
          placeholder="비밀번호를 입력해주세요"
          hasMessage
          message={passwordMessage}
        />
        <ButtonSquare>회원가입</ButtonSquare>
        <Anchor to={ROUTE.LOGIN}>이미 회원이신가요?</Anchor>
      </Form>
    </Section>
  );
};

function getEmailValidationMessage(email) {
  if (email[0] === '@') {
    return SIGN_UP.EMAIL_SHOULD_INCLUDE_ID;
  } else if (email.includes(' ')) {
    return SIGN_UP.EMAIL_CANNOT_INCLUDE_BLANK;
  } else if (/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(email)) {
    return SIGN_UP.EMAIL_CANNOT_INCLUDE_KOREAN;
  }
  return '';
}

function getEmailValidationMessageAfterBlurred(email) {
  if (!/^[a-z0-9_+.-]+@([a-z0-9-]+\.)+[a-z0-9]{2,4}$/.test(email)) {
    return SIGN_UP.EMAIL_SHOULD_BE_IN_VALID_FORMAT;
  }
  return '';
}

function getAgeValidationMessage(age) {
  if (age < SIGN_UP.MIN_AGE || age > SIGN_UP.MAX_AGE) {
    return SIGN_UP.AGE_SHOULD_BE_IN_RANGE;
  } else if (age.includes(' ')) {
    return SIGN_UP.AGE_CANNOT_INCLUDE_BLANK;
  } else if (!/^[0-9]*$/.test(age)) {
    return SIGN_UP.AGE_SHOULD_BE_IN_NUMBER;
  }
  return '';
}

function getPasswordValidationMessage(password) {
  if (password.length < SIGN_UP.PASSWORD_LENGTH_MIN || password.length > SIGN_UP.PASSWORD_LENGTH_MAX) {
    return SIGN_UP.PASSWORD_SHOULD_BE_IN_RANGE;
  } else if (password.includes(' ')) {
    return SIGN_UP.PASSWORD_CANNOT_INCLUDE_BLANK;
  } else if (!/[a-zA-Z]/.test(password)) {
    return SIGN_UP.PASSWORD_SHOULD_INCLUDE_ENGLISH;
  } else if (!/[0-9]/.test(password)) {
    return SIGN_UP.PASSWORD_SHOULD_INCLUDE_NUMBER;
  } else if (!/^[a-zA-Z0-9]*$/.test(password)) {
    return SIGN_UP.PASSWORD_SHOULD_BE_ONLY_ENGLISH_AND_NUMBER;
  }
  return '';
}
