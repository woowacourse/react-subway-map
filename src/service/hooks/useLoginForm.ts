import { useState } from 'react';
import { LoginForm } from '../../types';
import { SERVICE } from '../../constants/service';
import { REGEX } from '../../constants/validate';

const useLoginForm = () => {
  const [form, setForm] = useState<LoginForm>({
    email: '',
    password: '',
  });

  const isValidEmail = REGEX.EMAIL.test(form.email);
  const isValidPassword = form.password.length >= SERVICE.MIN_PASSWORD_LENGTH;
  const isValidForm = isValidEmail && isValidPassword;

  const setEmail = (email: string) => {
    setForm({ ...form, email });
  };

  const setPassword = (password: string) => {
    setForm({ ...form, password });
  };

  return {
    form,

    setEmail,
    setPassword,

    isValidEmail,
    isValidPassword,
    isValidForm,
  };
};
export default useLoginForm;
