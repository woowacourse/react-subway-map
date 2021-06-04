import { useState } from 'react';
import { LoginForm } from './../types';
import { SERVICE } from './../constants/service';
import { REGEX } from './../constants/validate';

const useLoginForm = () => {
  const [form, setForm] = useState<LoginForm>({
    email: '',
    password: '',
  });
  const { email, password } = form;

  const isValidEmail = REGEX.EMAIL.test(email);
  const isValidPassword = password.length >= SERVICE.MIN_PASSWORD_LENGTH;
  const isValidForm = isValidEmail && isValidPassword;

  const setEmail = (email: string) => {
    setForm({ ...form, email });
  };

  const setPassword = (password: string) => {
    setForm({ ...form, password });
  };

  return {
    form,

    email,
    password,

    setEmail,
    setPassword,

    isValidEmail,
    isValidPassword,
    isValidForm,
  };
};
export default useLoginForm;
