import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSnackbar } from 'notistack';

import { useAuthorization } from '../../hooks';

import { request } from '../../services/httpRequest';
import {
  getAgeValidationMessage,
  getEmailValidationMessage,
  getEmailValidationMessageAfterBlurred,
  getPasswordValidationMessage,
} from '../../services/SingUpValidator';

import { ButtonSquare, IconLock, IconMail, IconPerson, Input, Section } from '../../components';
import { Form, Anchor } from './style';
import { COLOR, ROUTE, SIGN_UP } from '../../constants';

export const SignUpPage = () => {
  const history = useHistory();

  const { enqueueSnackbar } = useSnackbar();
  const { checkIsLogin } = useAuthorization();

  const [emailMessage, setEmailMessage] = useState('');
  const [ageMessage, setAgeMessage] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');

  useEffect(() => {
    if (checkIsLogin) {
      history.push(ROUTE.STATION);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSignUpFormSubmit = (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const age = e.target.age.value;
    const password = e.target.password.value;

    (async () => {
      try {
        const response = await request.postWithoutToken('/members', { email, age, password });

        if (response.status === 201) {
          enqueueSnackbar(SIGN_UP.SUCCEED);
          history.push(ROUTE.LOGIN);
        } else {
          throw new Error();
        }
      } catch (e) {
        console.error(e);
        enqueueSnackbar(SIGN_UP.FAIL);
      }
    })();
  };

  const handleEmailInputChange = ({ target: { value } }) => {
    setEmailMessage(getEmailValidationMessage(value));
  };

  const handleEmailInputBlur = ({ target: { value } }) => {
    setEmailMessage(getEmailValidationMessageAfterBlurred(value));
  };

  const handleAgeInputChange = ({ target: { value } }) => {
    setAgeMessage(getAgeValidationMessage(value));
  };

  const handlePasswordInputChange = ({ target: { value } }) => {
    setPasswordMessage(getPasswordValidationMessage(value));
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
