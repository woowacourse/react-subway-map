import React from 'react';
import { Field, Formik } from 'formik';
import { PageTemplate, Input, Button } from '../../components';
import { COLOR, RANGE, REG_EXP, ROUTE, SIZE } from '../../constants';
import { Form, PasswordSuggestion, Validator } from './style';
import { useSignUp } from '../../hooks';

const initialValues = {
  email: '',
  age: '',
  password: '',
  passwordConfirm: '',
};

const validateEmail = (email, checkDuplicateEmail) => {
  if (!email) {
    return '이메일을 입력해주세요.';
  }
  if (!REG_EXP.EMAIL.test(email)) {
    return '올바른 이메일 형식을 입력해주세요.';
  }

  return checkDuplicateEmail(email);
};

const validateAge = (age) => {
  if (!age) {
    return '나이를 입력해주세요.';
  }
  if (!REG_EXP.AGE.test(age)) {
    return '숫자만 입력해주세요.';
  }
  if (age <= RANGE.AGE.MIN || age >= RANGE.AGE.MAX) {
    return '올바른 나이를 입력해주세요.';
  }
};

const validatePassword = (password) => {
  if (!password) {
    return '비밀번호를 입력해주세요.';
  }
  if (!REG_EXP.PASSWORD.test(password)) {
    return '올바른 비밀번호를 입력해주세요.';
  }
};

const validatePasswordConfirm = ({ password, passwordConfirm }) => {
  if (!passwordConfirm) {
    return '비밀번호를 한번 더 입력해주세요.';
  }
  if (password !== passwordConfirm) {
    return '비밀번호가 일치하지 않습니다.';
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
              validate={(value) => validateEmail(value, checkDuplicateEmail)}
            >
              {({ field, meta }) => (
                <>
                  <Input
                    type="email"
                    placeholder="✉️ 이메일을 입력해주세요."
                    size={SIZE.MD}
                    {...field}
                  />
                  <Validator>{meta.touched && meta.error}</Validator>
                </>
              )}
            </Field>
            <Field name="age" validate={validateAge}>
              {({ field, meta }) => (
                <>
                  <Input
                    type="text"
                    placeholder="👤 나이를 입력해주세요."
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
            <Field name="password" validate={validatePassword}>
              {({ field, meta }) => (
                <>
                  <Input
                    type="password"
                    placeholder="🔒 비밀번호를 입력해주세요."
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
                    placeholder="🔒 비밀번호를 한번 더 입력해주세요."
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
              data-testid="signup-button"
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
