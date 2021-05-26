import React from 'react';
import { Field, Formik } from 'formik';
import { PageTemplate, Input, Button } from '../../components';
import {
  COLOR,
  ERROR,
  INPUT_TEXT,
  RANGE,
  REG_EXP,
  ROUTE,
  SIZE,
  TEST,
} from '../../constants';
import { Form, PasswordSuggestion, Validator } from './style';
import { useSignUp } from '../../hooks';

const initialValues = {
  email: '',
  age: '',
  password: '',
  passwordConfirm: '',
};

const validateEmail = ({ email, checkDuplicateEmail }) => {
  if (!email) {
    return ERROR.EMAIL.REQUIRED;
  }
  if (!REG_EXP.EMAIL.test(email)) {
    return ERROR.EMAIL.INVALID;
  }

  return checkDuplicateEmail({ email });
};

const validateAge = ({ age }) => {
  if (!age) {
    return ERROR.AGE.REQUIRED;
  }
  if (!REG_EXP.NUMBER.test(age)) {
    return ERROR.AGE.INVALID;
  }
  if (age <= RANGE.AGE.MIN || age >= RANGE.AGE.MAX) {
    return ERROR.AGE.INVALID;
  }
};

const validatePassword = ({ password }) => {
  if (!password) {
    return ERROR.PASSWORD.REQUIRED;
  }
  if (!REG_EXP.PASSWORD.test(password)) {
    return ERROR.PASSWORD.INVALID;
  }
};

const validatePasswordConfirm = ({ password, passwordConfirm }) => {
  if (!passwordConfirm) {
    return ERROR.PASSWORD_CONFIRM.REQUIRED;
  }
  if (password !== passwordConfirm) {
    return ERROR.PASSWORD_CONFIRM.INVALID;
  }
};

const SignUp = () => {
  const { checkDuplicateEmail, signUp } = useSignUp();

  return (
    <PageTemplate title={ROUTE.SIGN_UP.NAME}>
      <Formik
        initialValues={initialValues}
        onSubmit={signUp}
        validateOnChange={false}
      >
        {({ values, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <Field
              name="email"
              validate={(email) =>
                validateEmail({ email, checkDuplicateEmail })
              }
            >
              {({ field, meta }) => (
                <>
                  <Input
                    type="email"
                    placeholder={INPUT_TEXT.EMAIL.PLACE_HOLDER}
                    size={SIZE.MD}
                    {...field}
                  />
                  <Validator>{meta.touched && meta.error}</Validator>
                </>
              )}
            </Field>
            <Field name="age" validate={(age) => validateAge({ age })}>
              {({ field, meta }) => (
                <>
                  <Input
                    type="text"
                    placeholder={INPUT_TEXT.AGE.PLACE_HOLDER}
                    size={SIZE.MD}
                    {...field}
                  />
                  <Validator>{meta.touched && meta.error}</Validator>
                </>
              )}
            </Field>
            <PasswordSuggestion>
              비밀번호: 6자 이상 20자 이하의 영문, 숫자, 특수문자[!, @, #, $]의
              조합
            </PasswordSuggestion>
            <Field
              name="password"
              validate={(password) => validatePassword({ password })}
            >
              {({ field, meta }) => (
                <>
                  <Input
                    type="password"
                    placeholder={INPUT_TEXT.PASSWORD.PLACE_HOLDER}
                    size={SIZE.MD}
                    {...field}
                  />
                  <Validator>{meta.touched && meta.error}</Validator>
                </>
              )}
            </Field>
            <Field
              name="passwordConfirm"
              validate={() => validatePasswordConfirm(values)}
            >
              {({ field, meta }) => (
                <>
                  <Input
                    type="password"
                    placeholder={INPUT_TEXT.PASSWORD_CONFIRM.PLACE_HOLDER}
                    size={SIZE.MD}
                    {...field}
                  />
                  <Validator>{meta.touched && meta.error}</Validator>
                </>
              )}
            </Field>
            <Button
              type="submit"
              backgroundColor={COLOR.AMBER}
              data-testid={TEST.ID.SIGN_UP_BUTTON}
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
