import React from 'react';
import { useFormik } from 'formik';
import { PageTemplate, Input, Button } from '../../components';
import { COLOR, REG_EXP, ROUTE, SIZE } from '../../constants';
import { Form, PasswordSuggestion, Validator } from './style';

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
  if (age < 0 || age > 100) {
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
  // TODO: 항상 모든 값에 대한 검증이 진행
  const errors = {};

  errors.email = validateEmail(email);
  errors.age = validateAge(age);
  errors.password = validatePassword(password);
  errors.passwordConfirm = validatePasswordConfirm(password, passwordConfirm);

  return errors;
};

const handleSubmit = () => {};

const SignUp = () => {
  const formik = useFormik({
    initialValues,
    validate,
    onSubmit: handleSubmit,
  });

  return (
    <PageTemplate title={ROUTE.SIGN_UP.NAME}>
      <Form onSubmit={formik.handleSubmit}>
        <Input
          type="email"
          name="email"
          placeholder="✉️ 이메일을 입력해주세요."
          size={SIZE.MD}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        <Validator>{formik.touched.email && formik.errors.email}</Validator>
        <Input
          type="text"
          name="age"
          placeholder="👤 나이를 입력해주세요."
          size={SIZE.MD}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.age}
        />
        <Validator>{formik.touched.age && formik.errors.age}</Validator>
        <PasswordSuggestion>
          비밀번호: 6자 이상 20자 이하의 영문, 숫자, 특수문자[!, @, #, $]의 조합
        </PasswordSuggestion>
        <Input
          type="password"
          name="password"
          placeholder="🔒 비밀번호를 입력해주세요."
          size={SIZE.MD}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
        <Validator>
          {formik.touched.password && formik.errors.password}
        </Validator>
        <Input
          type="password"
          name="passwordConfirm"
          placeholder="🔒 비밀번호를 한번 더 입력해주세요."
          size={SIZE.MD}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.passwordConfirm}
        />
        <Validator>
          {formik.touched.passwordConfirm && formik.errors.passwordConfirm}
        </Validator>
        <Button type="submit" backgroundColor={COLOR.AMBER}>
          회원가입
        </Button>
      </Form>
    </PageTemplate>
  );
};

export default SignUp;
