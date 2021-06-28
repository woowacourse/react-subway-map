import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSnackbar } from 'notistack';

import { useSignUp } from '../../hooks';
import { ButtonSquare, IconLock, IconMail, IconPerson, Input, Section } from '../../components';
import { Form, Anchor } from './style';
import { COLOR, ROUTE, SIGN_UP } from '../../constants';

export const SignUpPage = () => {
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  const [emailMessage, setEmailMessage] = useState('');
  const [ageMessage, setAgeMessage] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');

  const {
    requestSignUp,
    getEmailFormatPartialValidationMessage,
    getEmailFormatFullValidationMessage,
    getEmailDuplicationValidationMessage,
    getAgeValidationMessage,
    getPasswordValidationMessage,
  } = useSignUp();

  const handleSignUpFormSubmit = async (e) => {
    e.preventDefault();

    const { email, age, password } = e.target;

    try {
      const response = await requestSignUp({
        email: email.value,
        age: age.value,
        password: password.value,
      });

      if (response.status !== 201) {
        throw new Error();
      }
      history.push(ROUTE.LOGIN);
      enqueueSnackbar(SIGN_UP.SUCCEED);
    } catch (e) {
      console.error(e);
      enqueueSnackbar(SIGN_UP.FAIL);
    }
  };

  const handleEmailInputChange = async (e) => {
    const email = e.target.value;

    setEmailMessage(getEmailFormatPartialValidationMessage(email));
  };

  const handleEmailInputBlur = async (e) => {
    const email = e.target.value;
    const formatMessage = getEmailFormatFullValidationMessage(email);
    const duplicationMessage = await getEmailDuplicationValidationMessage(email);

    setEmailMessage(formatMessage || duplicationMessage);
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
