import React from 'react';
import { Formik } from 'formik';
import { PageTemplate, Input, Button } from '../../components';
import { BUTTON_ID, COLOR, INPUT_TEXT, ROUTE } from '../../constants';
import { Form, PasswordSuggestion, Validator } from './style';
import { useSignUp } from '../../hooks';
import {
  validateAge,
  validateEmail,
  validatePassword,
  validatePasswordConfirm,
} from '../../utils';

const initialValues = {
  email: '',
  age: '',
  password: '',
  passwordConfirm: '',
};

const validate = ({ email, age, password, passwordConfirm }) => {
  const errors = {};

  const emailError = validateEmail({ email });
  const ageError = validateAge({ age });
  const passwordError = validatePassword({ password });
  const passwordConfirmError = validatePasswordConfirm({
    password,
    passwordConfirm,
  });

  if (emailError) {
    errors.email = emailError;
  }
  if (ageError) {
    errors.age = ageError;
  }
  if (passwordError) {
    errors.password = passwordError;
  }
  if (passwordConfirmError) {
    errors.passwordConfirm = passwordConfirmError;
  }

  return errors;
};

const SignUp = () => {
  const { duplicateEmailError, checkDuplicateEmail, signUp } = useSignUp();

  const handleSubmitForm = async (values) => {
    const isDuplicateEmail = await checkDuplicateEmail({ email: values.email });

    if (isDuplicateEmail) return;

    signUp(values);
  };

  return (
    <PageTemplate title={ROUTE.SIGN_UP.NAME}>
      <Formik
        initialValues={initialValues}
        validate={validate}
        onSubmit={handleSubmitForm}
        validateOnChange={false}
      >
        {({ errors, touched, handleSubmit, getFieldProps }) => (
          <Form onSubmit={handleSubmit}>
            <Input
              type="email"
              placeholder={INPUT_TEXT.EMAIL.PLACE_HOLDER}
              {...getFieldProps('email')}
            />
            <Validator>
              {touched.email && errors.email}
              {duplicateEmailError}
            </Validator>
            <Input
              type="text"
              placeholder={INPUT_TEXT.AGE.PLACE_HOLDER}
              {...getFieldProps('age')}
            />
            <Validator>{touched.age && errors.age}</Validator>
            <PasswordSuggestion>
              비밀번호: 6자 이상 20자 이하의 영문, 숫자, 특수문자[!, @, #, $]의
              조합
            </PasswordSuggestion>
            <Input
              type="password"
              placeholder={INPUT_TEXT.PASSWORD.PLACE_HOLDER}
              {...getFieldProps('password')}
            />
            <Validator>{touched.password && errors.password}</Validator>
            <Input
              type="password"
              placeholder={INPUT_TEXT.PASSWORD_CONFIRM.PLACE_HOLDER}
              {...getFieldProps('passwordConfirm')}
            />
            <Validator>
              {touched.passwordConfirm && errors.passwordConfirm}
            </Validator>
            <Button
              type="submit"
              backgroundColor={COLOR.AMBER}
              aria-label={BUTTON_ID.SIGN_UP}
            >
              회원가입
            </Button>
          </Form>
        )}
      </Formik>
    </PageTemplate>
  );
};

export default SignUp;
