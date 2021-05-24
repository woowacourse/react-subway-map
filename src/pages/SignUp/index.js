import React from 'react';
import { Formik } from 'formik';
import { PageTemplate, Input, Button } from '../../components';
import { COLOR, RANGE, REG_EXP, ROUTE, SIZE } from '../../constants';
import { Form, PasswordSuggestion, Validator } from './style';
import { useSignUpAPI } from '../../hooks';

const initialValues = {
  email: '',
  age: '',
  password: '',
  passwordConfirm: '',
};

const validateEmail = (email) => {
  if (!email) {
    return '이메일을 입력해주세요.';
  }
  if (!REG_EXP.EMAIL.test(email)) {
    return '올바른 이메일 형식을 입력해주세요.';
  }
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

const validatePasswordConfirm = (password, passwordConfirm) => {
  if (!passwordConfirm) {
    return '비밀번호를 한번 더 입력해주세요.';
  }
  if (password !== passwordConfirm) {
    return '비밀번호가 일치하지 않습니다.';
  }
};

const validate = ({ email, age, password, passwordConfirm }) => {
  const errors = {};

  const emailError = validateEmail(email);
  const ageError = validateAge(age);
  const passwordError = validatePassword(password);
  const passwordConfirmError = validatePasswordConfirm(
    password,
    passwordConfirm
  );

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
  const { duplicateEmailError, signUp } = useSignUpAPI();

  return (
    <PageTemplate title={ROUTE.SIGN_UP.NAME}>
      <Formik
        initialValues={initialValues}
        validate={validate}
        onSubmit={signUp}
        validateOnChange={false}
      >
        {({ values, errors, touched, handleSubmit, getFieldProps }) => {
          const isValidForm =
            Object.values(values).every((value) => value) &&
            Object.values(errors).every((error) => !error);

          return (
            <Form onSubmit={handleSubmit}>
              <Input
                type="email"
                placeholder="✉️ 이메일을 입력해주세요."
                size={SIZE.MD}
                {...getFieldProps('email')}
              />
              <Validator>
                {touched.email && errors.email}
                {duplicateEmailError}
              </Validator>
              <Input
                type="text"
                placeholder="👤 나이를 입력해주세요."
                size={SIZE.MD}
                {...getFieldProps('age')}
              />
              <Validator>{touched.age && errors.age}</Validator>
              <PasswordSuggestion>
                비밀번호: 6자 이상 20자 이하의 영문, 숫자, 특수문자[!, @, #,
                $]의 조합
              </PasswordSuggestion>
              <Input
                type="password"
                placeholder="🔒 비밀번호를 입력해주세요."
                size={SIZE.MD}
                {...getFieldProps('password')}
              />
              <Validator>{touched.password && errors.password}</Validator>
              <Input
                type="password"
                placeholder="🔒 비밀번호를 한번 더 입력해주세요."
                size={SIZE.MD}
                {...getFieldProps('passwordConfirm')}
              />
              <Validator>
                {touched.passwordConfirm && errors.passwordConfirm}
              </Validator>
              <Button
                type="submit"
                backgroundColor={COLOR.AMBER}
                disabled={!isValidForm}
                data-testid="signup-button"
              >
                회원가입
              </Button>
            </Form>
          );
        }}
      </Formik>
    </PageTemplate>
  );
};

export default SignUp;
