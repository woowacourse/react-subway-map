import React from 'react';
import { Link } from 'react-router-dom';
import { Formik } from 'formik';
import { PageTemplate, Input, Button } from '../../components';
import { Form, Validator } from './style';
import { BUTTON_ID, COLOR, ERROR, INPUT_TEXT, ROUTE } from '../../constants';
import { useSignIn } from '../../hooks';

const initialValues = {
  email: '',
  password: '',
};

const validate = ({ email, password }) => {
  const errors = {};

  if (!email) {
    errors.email = ERROR.EMAIL.REQUIRED;
  }

  if (!password) {
    errors.password = ERROR.PASSWORD.REQUIRED;
  }

  return errors;
};

const SignIn = () => {
  const { signIn, authError } = useSignIn();

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
              placeholder={INPUT_TEXT.EMAIL.PLACE_HOLDER}
              {...getFieldProps('email')}
            />
            <Input
              type="password"
              placeholder={INPUT_TEXT.PASSWORD.PLACE_HOLDER}
              {...getFieldProps('password')}
            />
            <Validator>
              {errors.email || errors.password}
              {authError}
            </Validator>
            <Button
              type="submit"
              backgroundColor={COLOR.AMBER}
              aria-label={BUTTON_ID.SIGN_IN}
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
