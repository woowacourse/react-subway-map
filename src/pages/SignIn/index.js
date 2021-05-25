import React from 'react';
import { Link } from 'react-router-dom';
import { Formik } from 'formik';
import { PageTemplate, Input, Button } from '../../components';
import { Form, Validator } from './style';
import { COLOR, ROUTE, SIZE } from '../../constants';
import { useSignIn } from '../../hooks';

const initialValues = {
  email: '',
  password: '',
};

const validate = ({ email, password }) => {
  const errors = {};

  if (!email) {
    errors.email = '이메일을 입력해주세요.';
  }

  if (!password) {
    errors.password = '비밀번호를 입력해주세요.';
  }

  return errors;
};

const SignIn = () => {
  const { signIn, error } = useSignIn();

  return (
    <PageTemplate title={ROUTE.SIGN_IN.NAME}>
      <Formik
        initialValues={initialValues}
        validate={validate}
        onSubmit={signIn}
        validateOnBlur={false}
        validateOnChange={false}
      >
        {({ errors, handleSubmit, getFieldProps }) => (
          <Form onSubmit={handleSubmit}>
            <Input
              type="email"
              placeholder="✉️ 이메일을 입력해주세요."
              size={SIZE.MD}
              {...getFieldProps('email')}
            />
            <Input
              type="password"
              placeholder="🔒 비밀번호를 입력해주세요."
              size={SIZE.MD}
              {...getFieldProps('password')}
            />
            <Validator>
              {errors.email || errors.password}
              {error}
            </Validator>
            <Button
              type="submit"
              backgroundColor={COLOR.AMBER}
              data-testid="signin-button"
            >
              로그인
            </Button>
          </Form>
        )}
      </Formik>
      <Link to={ROUTE.SIGN_UP.PATH}>아직 회원이 아니신가요?</Link>
    </PageTemplate>
  );
};

export default SignIn;
